import {todayWeatherType} from "../reducer/weatherReducer";
import {dayInfo} from "./weatherCode";
import jsonWords from '../../assets/wisewords.json';

const WiseWords = new Map(jsonWords.map((el, index) => [index, el]));
import SQLite, {SQLiteDatabase} from "react-native-sqlite-storage";
import {Alert} from "react-native";

SQLite.enablePromise(true);
/*TODO : "delete this when go prod"*/
SQLite.DEBUG(false);
let dbObj: SQLite.SQLiteDatabase;

export const getWiseWord = (): { say: string, words: string } => {
    if (WiseWords) {
        const randomCode = Math.floor(Math.random() * WiseWords.size);
        const result = WiseWords.get(randomCode);
        if (result) {
            return result;
        }
    }
    if (Math.random() < 0.5) {
        return {say: '엄마', words: '정신차리고, 일어나서 밥먹어라'};
    } else {
        return {say: '아빠', words: '마음을 너무 급하게 먹지 말고 천천히 기다려 보아라.'};
    }
};

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise(resolve => {
            if (timeout) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(() => resolve(func(...args)), waitFor)
        });
};

export const idMaker = (len: number | undefined = 8): string => {
    let str: string = "";
    for (let i = 0; i < len; i++) {
        let rand = Math.floor(Math.random() * 62);
        let charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48;
        str += String.fromCharCode(charCode);
    }
    return str;
};

export const rangeMaker = (size: number, startNumber: number = 0): readonly number[] => {
    return [...Array(size).keys()].map(i => i + startNumber);
};

export const connDB = async () => {
    try {
        await SQLite.openDatabase({
            name: 'daysmemo',
            location: 'default',
            createFromLocation: "~www/weatherMemo.db"
        })
            .then((DB: SQLiteDatabase) => {
                console.log('[connDB] success opening DB');
                dbObj = DB;
            })
            .catch((err) => {
                console.log('[connDB] error opening DB =>', err);
            });
    } catch (err) {
        console.log('connDB err =>', err);
    }
};

export const disConnDB = async () => {
    if (dbObj) await dbObj?.close().then(() => console.log('db close success')).catch((err) => console.log('db close err', err));
}

export type memosType = {
    idx: string;
    keycode: string;
    memo: string;
    weatherinfo: string;
    created: string;
}

type sendQueryType = 'POST' | 'PUT' | 'GET' | 'GET_MONTHLY' | 'DELETE' | 'DELETE_ALL';

export async function sendQuery(type: sendQueryType
    , targetDay?: string
    , inputText?: string
    , today_weather?: todayWeatherType): Promise<string | memosType[] | void> {

    let prefix = "";
    let failMsg = "";
    let successMsg = "";
    let alertTitle = "알림";
    let today = targetDay || dayInfo('DATE');
    let keycode = today.split('-', 2).join('-');
    let weather = today_weather?.index.split(':')[1] || 1;
    let params: any[] = [];

    switch (type) {
        case 'POST':
        case 'PUT' :
            alertTitle = "저장 / 수정";
            let msg = inputText;
            if (msg && msg.length > 0) {
                if (type === 'POST') {
                    //prefix = "SELECT * from daysmemo";
                    prefix = "INSERT INTO daysmemo (keycode, memo , weatherinfo , created) VALUES (?, ?, ?, ? )"
                    params = [keycode.toString(), msg.toString(), weather.toString(), today];
                } else {
                    prefix = "UPDATE daysmemo SET memo= ? WHERE created = ? ";
                    params = [msg.toString(), today];
                }
                successMsg = today + "일 메모를 기록 했습니다.";
                failMsg = today + " 일 메모 기록 실패.";
            } else {
                return alert('메모에 문제가 있습니다\n' + JSON.stringify(msg));
            }
            break;
        case 'GET':
            prefix = "SELECT * FROM daysmemo WHERE created = ? ";
            successMsg = today + " 메모 로드성공";
            failMsg = today + " 메모 로드실패";
            params = [today];
            break;
        case 'GET_MONTHLY':
            prefix = "SELECT * FROM daysmemo WHERE keycode = ? ";
            successMsg = keycode + "월 로드성공";
            failMsg = keycode + "월 로드실패";
            params = [keycode];
            break;
        case 'DELETE_ALL':
            alertTitle = "삭제";
            prefix = "DELETE FROM daysmemo";
            successMsg = "메모 전체가 삭제 되었습니다.";
            failMsg = "메모 전체 삭제 실패";
            params = [];
            break;
        case 'DELETE':
            alertTitle = "삭제";
            prefix = "DELETE FROM daysmemo WHERE created = ? ";
            successMsg = today + " 메모가 삭제 되었습니다";
            failMsg = today + " 메모 삭제 실패 ";
            params = [today];
            break;
        default:
            alert('sendQuery/No Types');
            return;
    }
    try {
        const retResults: any[] = [];
        const res = await getDataFromDB(prefix, params);
        const item = res?.rows?.item;
        const rowslength = res?.rows?.length;
        const rowsAffected = res?.rowsAffected;

        if (rowslength > 0) {
            for (let x = 0; x < rowslength; x++) {
                retResults.push(item(x));
            }
        };

        switch (type) {
            case 'GET' :
                return retResults[0];
                break;
            case 'GET_MONTHLY' :
                return retResults;
                break;
            case 'POST' :
            case 'PUT' :
            case 'DELETE' :
            case 'DELETE_ALL' :
                (rowsAffected > 0) ? alertMaker(alertTitle, successMsg) : alertMaker(alertTitle, failMsg);
                return 'DONE';
                break;
            default:
                console.log("sendQuery / type Error");
                break;
        };

    } catch (err) {
        console.log("Try Database Error : ", err);
    }
};

const getDataFromDB = async (prefix: string, params: any[]) => {
    return new Promise((resolve, reject) => {
        dbObj.transaction((tx) => {
            dbObj.executeSql(prefix, params, async (res: any) => await resolve(res));
        }).catch((err) => reject(err));
    })
};

const alertMaker = (alertTitle: string, text: string) => {
    Alert.alert(
        alertTitle,
        text,
        [
             { text: '확인', onPress : () => false , style: 'cancel'}
        ]
        ,{cancelable: false}
    );
};
