import dayjs from "dayjs";
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {itemType} from "../reducer/weatherReducer";

//dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

// export const daysCalendar = () => {
//     const dayObj = dayjs();
//     //const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
//     //const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
//     // const weekDayOf1 = dayObjOf1.day()
//     // const weekDayOfLast = dayObjOfLast.day();
// }
//overloading Funtion for Typesciprt

export type dayInfoReturnType = { baseDate: string, baseTime: string };
export function dayInfo(type: 'REQ')  : dayInfoReturnType;
export function dayInfo(type: 'NOW' | 'DATE')  : string;
export function dayInfo(type: any ) : any {
    if(type === 'REQ')
    {
        const date = dayjs( new Date() ).format('YYYYMMDD-HH:mm').split('-');
        const yesterday = dayjs( new Date() ).add(-1, 'day').format('YYYYMMDD');

        console.log("dayInfo get date => ", date, yesterday);

        const nowTime   = date[1].split(':')[0].toString();
        const nowMinute = date[1].split(':')[1].toString();

        let timeStamp: string = '';
        let dateStamp: string = date[0];

        const keyArray = Object.keys(timeLine).reverse();

        if( nowTime === '01' || nowTime === '00' || nowTime === '24') {
            dateStamp = yesterday;
            timeStamp = timeLine['23'];
        }else if( nowTime === '02'){
            if (parseInt(nowMinute) <= 35){
                dateStamp = yesterday;
                timeStamp = timeLine['23'];
            }else{
                timeStamp = timeLine['2'];
            }
        }else{
            for (let i = 0; i < keyArray.length; i++)
            {
                if ( parseInt(keyArray[i]) < parseInt(nowTime) )
                {
                    timeStamp = timeLine[keyArray[i]];
                    break;
                }
            }
        }

        // console.log('[real] date : ', date, yesterday);
        // console.log('[request] date : ', dateStamp, timeStamp);
        return { baseDate : dateStamp , baseTime : timeStamp };
    }
    else if(type === 'NOW' || type === 'DATE')
    {
        const dateTExt = (type === 'NOW') ? 'YYYY/MM/DD, HH:mm:ss' : 'YYYY-MM-DD';
        return dayjs( new Date() ).format(dateTExt);
    }
}

type enumType<T extends string | number> = { [key: string] : T}

// 베이스 타임라인 : baseTime
export const timeLine : enumType<string> = {
    2 : '0200',
    5 : '0500',
    8 : '0800',
    11 : '1100',
    14 : '1400',
    17 : '1700',
    20 : '2000',
    23 : '2300',
};

export type returnWeatherCodeToTextType = { index : string , category : string , value: string | number };

export const WeatherCodeToText = ( items : itemType[] ) => {
    if(items && items.length > 0){
        const resultMap = new Map();
        items.map( (el,_) => {
            if( el.category !== 'UUU' &&  el.category !== 'VVV' &&  el.category !== 'WAV' &&  el.category !== 'VEC')
            {
                let temp : returnWeatherCodeToTextType | null = null;

                    if(el.category === 'PTY'){

                        if( parseInt(el.fcstValue) !== 0 ){
                            temp = { index: el.category+':'+el.fcstValue, category : CategoryCode[el.category] , value : rainCode['R'+el.fcstValue] };
                        }

                    }else if( el.category === 'SKY' ){

                        temp = { index: el.category+':'+el.fcstValue, category : CategoryCode[el.category] , value : skyCode['S'+el.fcstValue]  };

                    }else if( el.category === 'POP' || el.category === 'REH'){

                        if( parseFloat(el.fcstValue) > 0 )
                        {
                            temp = { index: el.category+':'+el.fcstValue, category : CategoryCode[el.category] , value : parseFloat(el.fcstValue) + ' %' };
                        }

                    }else if( el.category === 'R06' ){

                        if( parseFloat(el.fcstValue) >= 0.1 )
                        {
                            temp = { index: el.category+':'+el.fcstValue, category : CategoryCode[el.category] , value : rainPrecipitation(parseFloat(el.fcstValue)) };
                        }

                    }else if( el.category === 'S06' ){

                        if( parseFloat(el.fcstValue) >= 0.1 )
                        {
                            temp = { index: el.category+':'+el.fcstValue, category : CategoryCode[el.category] , value : snowFall(parseFloat(el.fcstValue))  };
                        }

                    }else if( el.category === 'T3H' ||  el.category === 'TMN' || el.category === 'TMX' ){

                        temp = { index: el.category+':'+el.fcstValue, category : CategoryCode[el.category] , value : el.fcstValue + ' ℃' };

                    }else if( el.category === 'WSD' ){

                        temp = { index: el.category+':'+el.fcstValue, category : CategoryCode[el.category] , value : el.fcstValue + ' m/s' };

                    }else{

                        temp = { index: el.category+':'+el.fcstValue, category : CategoryCode[el.category] , value :  el.fcstValue };
                    }

                if(temp){
                    resultMap.set( el.category , temp );
                }
             }
        })
        return resultMap;
    }
    return false;
};

// 응답 카테고리

export const CategoryCode : enumType<string> = {
    POP : "🌂 강수확율", //강수확율
    PTY	: "강수형태", //(코드값)
    R06	: "예상 강수량",
    REH	: "💧 습도", //습도(%)
    S06	: "예상 적설량",
    SKY	: "🔭 현재", // 하늘상태 (코드값)
    T3H	: "🌡️ 현재",   //현재기온
    TMN	: "🌡️ 최저",
    TMX	: "🌡️ 최고",
    UUU	: "동서풍속 (m/s)",
    VVV	: "남북풍속 (m/s)",
    WSD	: "🎐 풍속" , //풍속
    WAV	: "파고(M)",
    VEC	: "풍향(deg)",
};

// 강수량 : R06
export const rainPrecipitation  = ( f : number) : string => {
    if(f < 0.1 ) return "없음";
    else if(f >= 0.1 && f < 1.0) return "1mm미만";
    else if(f >= 1.0 && f < 5.0) return "1~4mm";
    else if(f >= 5.0 && f < 10.0) return "5~9mm";
    else if(f >= 10.0 && f < 20.0) return "10~19mm";
    else if(f >= 20.0 && f < 40.0) return "20~39mm";
    else if(f >= 40.0 && f < 70.0) return "40~69mm";
    else return "70mm이상";
};

// 적설량 : S06
export const snowFall = (f: number) : string => {
    if(f < 0.1 ) return "없음";
    else if(f >= 0.1 && f < 1.0) return "1cm미만";
    else if(f >= 1.0 && f < 5.0) return "1~4cm";
    else if(f >= 5.0 && f < 10.0) return "5~9cm";
    else if(f >= 10.0 && f < 20.0) return "10~19cm";
    else return "20cm 이상";
}

// 카테고리 SKY 코드

export const skyCode : enumType<string> = {
    S1 : "🌞", //맑음
    S3 : "⛅", //구름많음
    S4 : "☁" //흐림
};

// 카테고리 PTY 코드
export const rainCode: enumType<string> = {
    R0 : '-',
    R1 : '☂️', //비
    R2 : '🌨️',   //진눈깨비
    R3 : '❄️', //눈
    R4 : '🌦️',   //소나기
    R5 : '🌧️',   //빗방울
    R6 : '💦',   //빗방울/눈날림
    R7 : '☃️',//눈날림
}

// 에러 코드
export const requsetErrorCode = (code: string) : string => {
    const Code : string = 'CODE_' + code;
    let result : string;
    switch(Code){
        case 'CODE_00':
            result = '정상완료';
        break;
        case 'CODE_01':
            result = '어플리케이션 에러';
            break;
        case 'CODE_02':
            result = '데이터베이스 에러';
            break;
        case 'CODE_03':
            result = '데이터없음 에러';
            break;
        case 'CODE_04':
            result = 'HTTP 에러';
            break;
        case 'CODE_05':
            result = '서비스 연결실패 에러';
            break;
        case 'CODE_10':
            result = '잘못된 요청 파라메터 에러';
            break;
        case 'CODE_11':
            result = '필수요청 파라메터가 없음';
            break;
        case 'CODE_12':
            result = '해당 오픈API서비스가 없거나 폐기됨';
            break;
        case 'CODE_20':
            result = '서비스 접근거부';
            break;
        case 'CODE_21':
            result = '일시적으로 사용할 수 없는 서비스 키';
            break;
        case 'CODE_22':
            result = '서비스 요청제한횟수 초과에러';
            break;
        case 'CODE_30':
            result = '등록되지 않은 서비스키';
            break;
        case 'CODE_31':
            result = '기한만료된 서비스키';
            break;
        case 'CODE_32':
            result = '등록되지 않은 IP';
            break;
        case 'CODE_33':
            result = '서명되지 않은 호출';
            break;
        case 'CODE_99':
        default:
            result = '기타에러/알수없음';
        break;
    }

    return result;
};
