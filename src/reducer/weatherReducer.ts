import {Draft} from 'immer';
import * as actionTypes from './actionTypes';
import immerProduce from '../util/immerProduce';
import { CategoryCode, dayInfo } from "../util/weatherCode";
import {memosType} from "../util/utils";

export type itemType = {
    baseDate: string,    //'20210217'
    baseTime: string,    // '2300'
    category: keyof typeof CategoryCode | string,    // 'POP'
    fcstDate: string,    // '20210218'
    fcstTime: string,    // '0300'
    fcstValue: string,   // '10'
    nx: number,
    ny: number,
};

export type selectedInfoType = {
    "sido": string,
    "sigungu": string,
    "dong": string,
    "nx": number,
    "ny": number,
    "lat": number,
    "lng": number
};

export type todayWeatherType = {  category : string ,  index : string , value : string } | null;

export interface initProps {
    reqData : {
         totalCount: number
        ,dataType  : 'JSON'
        ,baseDate : string
        ,baseTime : string
        ,lastReqTimeStamp : string | any
    },
    myLocationInfo: selectedInfoType,
    items: itemType[],
    today_weather : todayWeatherType,
    dataLoad : boolean,
    dataLoadError : boolean | null,
    dataLoadComplete : boolean,
    modalShowHide : boolean,
    memoBoardData: { title: string, memo :  memosType | "" },
    startUpdateMonth : boolean,
}

const initState: initProps = {
    reqData : {
         totalCount: 0
        ,dataType  : 'JSON'
        ,baseDate : ''
        ,baseTime : ''
        ,lastReqTimeStamp : ''
    },
    myLocationInfo: {
        sido: '',
        sigungu: '',
        dong: '',
        lat: 0,
        lng: 0,
        nx: 59,
        ny: 125,
    },
    items: [],
    today_weather: null,
    dataLoad : false,
    dataLoadError : false,
    dataLoadComplete : false,
    modalShowHide: false,
    memoBoardData : { title : '' , memo : '' },
    startUpdateMonth : false,
};

type setWeatherDataType = {
    type : string,
    data : itemType[]
}

const setWeatherData = (action: setWeatherDataType) => ({
    type: actionTypes.SET_WEATHER_DATA,
    data: action.data,
});

const reqWeather = () => ({
    type : actionTypes.REQ_WEATHER_DATA
});

const reqWeatherError = () => ({
    type : actionTypes.REQ_ERROR_WEATHER_DATA
});

const reqWeatherComplete = () => ({
    type : actionTypes.REQ_COMPLETE_WEATHER_DATA
});

type setMyLocationDataType = {
    type: string;
    data: selectedInfoType
}

const setMyLocationDataToProps = (action: setMyLocationDataType) => ({
    type: actionTypes.SET_MY_LOCATION_DATA,
    data: action.data
})

const resetMyLocationDataToProps = () => ({
    type : actionTypes.RESET_MY_LOCATION_DATA
});

type pageInfoType = {
    totalCount: number,
    baseDate : string
    baseTime : string
}

type setPageInfoType = {
    type: string,
    data: pageInfoType,
}

const setPageInfoToProps = (action: setPageInfoType) => ({
    type: actionTypes.SET_WEATHER_PAGE_INFO,
    data: action.data,
})

type setTodayWeatherType = {
    type: string;
    data: todayWeatherType;
}

const setTodayWeatherToProps = (action: setTodayWeatherType) => ({
    type : actionTypes.SET_TODAY_WEATHER,
    data : action.data
})

type setModalShowHideType = {
    data: boolean;
}

const setModalShowHide = (action: setModalShowHideType) => ({
    type : actionTypes.SET_MEMOBOARD_SHOW_HIDE,
    data : action.data
});

type setMemoBoardDataType = {
    title    : string;
    payload  : memosType | "";
}

const setMemoBoardData = (action: setMemoBoardDataType) => {
    return {
        type : actionTypes.SET_MEMOBOARD_DATA,
        data : { title: action.payload.title , memo : action.payload.data },
    }
};

type startUpdateMonthType = {
    data : boolean;
}

const startUpdateMonth = (action: startUpdateMonthType) => ({
    type : actionTypes.START_UPDATE_MONTH,
    data : action.data
});

type weatherAction =
    | ReturnType<typeof reqWeather>
    | ReturnType<typeof reqWeatherError>
    | ReturnType<typeof reqWeatherComplete>
    | ReturnType<typeof setWeatherData>
    | ReturnType<typeof setMyLocationDataToProps>
    | ReturnType<typeof resetMyLocationDataToProps>
    | ReturnType<typeof setPageInfoToProps>
    | ReturnType<typeof setTodayWeatherToProps>
    | ReturnType<typeof setModalShowHide>
    | ReturnType<typeof setMemoBoardData>
    | ReturnType<typeof startUpdateMonth>

const weatherReducer = (state: initProps = initState, action: weatherAction)  =>
    immerProduce(state, (draft: Draft<initProps>) => {
        switch (action.type) {
            case actionTypes.REQ_WEATHER_DATA:
                    draft.dataLoad = true;
                    draft.dataLoadError = null;
                    draft.dataLoadComplete = false;
                break;
            case actionTypes.REQ_ERROR_WEATHER_DATA:
                    draft.dataLoad = true;
                    draft.dataLoadError = true;
                    draft.dataLoadComplete = false;
                break;
            case actionTypes.REQ_COMPLETE_WEATHER_DATA:
                    draft.dataLoad = false;
                    draft.dataLoadError = false;
                    draft.dataLoadComplete = true;
                    draft.reqData.lastReqTimeStamp = dayInfo('NOW');
                break;
            case actionTypes.SET_WEATHER_DATA:
                    draft.items = [...action.data];
                break;
            case actionTypes.SET_WEATHER_PAGE_INFO:
                    draft.reqData.totalCount = action.data.totalCount;
                    draft.reqData.baseDate   = action.data.baseDate;
                    draft.reqData.baseTime   = action.data.baseTime;
                break;
            case actionTypes.SET_MY_LOCATION_DATA:
                    draft.myLocationInfo = {...action.data};
                break;
            case actionTypes.RESET_MY_LOCATION_DATA:
                    draft.myLocationInfo = {...initState.myLocationInfo};
                break;
            case actionTypes.SET_TODAY_WEATHER:
                    draft.today_weather = action.data;
                break;
            case  actionTypes.SET_MEMOBOARD_SHOW_HIDE:
                    draft.modalShowHide = action.data;
                break;
            case  actionTypes.SET_MEMOBOARD_DATA:
                    draft.memoBoardData.title = action.payload.title;
                    draft.memoBoardData.memo  = action.payload.data; // obejct or string
                break
            case  actionTypes.START_UPDATE_MONTH:
                    draft.startUpdateMonth = action.data;
                break;
            default:
            break;
        }
    });

export default weatherReducer;
