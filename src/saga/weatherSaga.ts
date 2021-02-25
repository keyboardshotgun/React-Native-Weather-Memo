import {
    all,
    call,
    //delay,
    fork,
    put,
    takeLatest,
    //throttle,
} from 'redux-saga/effects';
import Axios from 'axios';
import * as actionTypes from '../reducer/actionTypes';
import {REACT_APP_WEATHER_API_KEY} from "@env";
import {dayInfo, dayInfoReturnType, requsetErrorCode} from "../util/weatherCode";
import {selectedInfoType} from "../reducer/weatherReducer";

Axios.defaults.baseURL = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst?serviceKey=" + REACT_APP_WEATHER_API_KEY + '&';
Axios.defaults.responseType = "json";

async function getAxiosWeatherInfoAPI(data: selectedInfoType) {

    // console.log("getAxiosWeatherInfoAPI parameter :", JSON.stringify(data));

    const timeStamp: dayInfoReturnType = await dayInfo('REQ');

    //console.log("requset/baseTime", timeStamp);

    if(timeStamp){
        return await Axios.request<object, object[]>(
            {
                method: "get",
                params: {
                    numOfRows: 15,
                    pageNo: 1,
                    dataType: "JSON",
                    base_date: timeStamp.baseDate,
                    base_time: timeStamp.baseTime,
                    nx: data.nx,
                    ny: data.ny,
                }
            }
        ).then( ( response : any ) => response )
            .catch((err: string) => {
                throw new Error().message = err;
            });
    }else{
        return false;
    }
}

function* getWeatherData(action: any) {

    try {

        yield put({type: actionTypes.REQ_WEATHER_DATA});
        const result = yield call(getAxiosWeatherInfoAPI, action.data);

        //console.log("[Result from weather API] : " , JSON.stringify(result));

        if(result){
            const resultCode = result.data.response.header.resultCode;
            const resultText = requsetErrorCode(resultCode);

            if(resultCode === '00')
            {
                const itemArray  = result.data.response.body.items.item;
                //console.log('[Response] items ==> ', itemArray);

                yield put({type: actionTypes.SET_WEATHER_DATA, data: itemArray});
                yield put({
                     type : actionTypes.SET_WEATHER_PAGE_INFO
                    ,data : {
                        totalCount : result.data.response.body.totalCount,
                        baseDate : itemArray[0].baseDate,
                        baseTime : itemArray[0].baseTime,
                    }
                });
                yield put({type: actionTypes.REQ_COMPLETE_WEATHER_DATA});

            }else{
                // 결과가 없거나 오류
                console.log('resultText :' , resultText);
            }
        }else{
            throw new Error('Cannot get timeStamp');
        }

    } catch (err) {
        console.log('error/Try to request WeatherInfo' , err);
        yield put({
            type: actionTypes.REQ_ERROR_WEATHER_DATA,
            data: err.message,
        });
    }
}

function* watchGetWeatherData() {
    yield takeLatest(actionTypes.GET_WEATHER_DATA, getWeatherData);
}

export default function* weatherSaga() {
    yield all([
        fork(watchGetWeatherData),
    ]);
};
