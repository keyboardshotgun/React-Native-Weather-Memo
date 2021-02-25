import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import {DEVICE_H, DEVICE_W, WeatherMainStyle, WStyle} from "../style";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {GET_WEATHER_DATA, SET_TODAY_WEATHER} from "../reducer/actionTypes";
import {RootReducerType} from "../store";
import {debounce, idMaker} from '../util/utils';
import {WeatherCodeToText} from "../util/weatherCode";
import Calendar from "./Calendar";
import SubTitleBar from "./Weather/SubTitleBar";
import WeatherBox from "./Weather/WeatherBox";
import {itemType, selectedInfoType, todayWeatherType} from "../reducer/weatherReducer";
import MemoBoard from "./Memo/MemoBoard";

const WeatherMainMemoCalendar: FunctionComponent = () => {

    const myLocationInfo: selectedInfoType  = useSelector((state : RootReducerType) => state.weatherReducer['myLocationInfo']);
    const today_weather: todayWeatherType  = useSelector((state : RootReducerType) => state.weatherReducer['today_weather']);
    const reqTime: string  = useSelector((state : RootReducerType) => state.weatherReducer['reqData']['lastReqTimeStamp']);
    const items: itemType[]  = useSelector((state : RootReducerType) => state.weatherReducer['items']);
    const [weatherData, setWeatherData] = useState(new Map());
    const dispatch = useDispatch();

    //const modalShowHide: boolean  = useSelector((state : RootReducerType) => state.weatherReducer['modalShowHide']);
    // useEffect(()=>{
    //     console.log('modalShowHide', modalShowHide);
    // },[modalShowHide])
    // <MemoBoard showHide={modalShowHide} />

    // 먼저 유저 데이터가 있는지 확인해.
    useEffect(()=>{
        getWeatherInfo().catch((err)=>console.log(err));
    },[myLocationInfo])

    // 데이터가 업데이트 되면 화면을 새로 그려
    useEffect(()=>{
        const result = WeatherCodeToText(items);
        if (result) {
            setWeatherData(result);
        }
    },[items]);

    useEffect(()=>{
        if(today_weather === null && weatherData.has('SKY')){
            console.log("UPDATE SKY INFO", weatherData.get('SKY'));
            const tempObj = {...weatherData.get('SKY')};
            dispatch({ type : SET_TODAY_WEATHER, data :tempObj })
        };
    },[weatherData]);

    const getWeatherInfo = debounce( () => {
       dispatch({ type: GET_WEATHER_DATA, data: myLocationInfo });
    }, 500);

    const weatherBoxMaker = useCallback(() => {
        if(weatherData && weatherData.size  > 0){
            if( weatherData.size > 5){
                if (weatherData.has('TMX')) weatherData.delete('TMX');
                if (weatherData.has('TMN')) weatherData.delete('TMN');
            }
            return  [...weatherData.values()].map( ( el, i) => {
                return (
                    <WeatherBox
                        delay={i * 250}
                        boxWidth={'19%'}
                        key={el.index+idMaker()}
                        data={el}
                    />)
            });
        }
    },[weatherData]);

    return (
          <View style={WStyle.mainContainer}>
            <SubTitleBar title={'🛰️ '+ '\tWeather'}
                         subTitle={reqTime}
                         button={true}
                         onPress={getWeatherInfo} />

            <View style={ WeatherMainStyle.weatherBoxLayout }>
              { weatherBoxMaker() }
            </View>

            <SubTitleBar title={'📅 '+'\tCalendar'} />
            <Calendar />
            <MemoBoard />
        </View>
    );
}

export default React.memo(WeatherMainMemoCalendar);
