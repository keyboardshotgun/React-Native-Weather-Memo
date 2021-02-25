import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react';
import {memosType, idMaker, rangeMaker, sendQuery} from "../util/utils";
import CalendarButton from "./CalendarButton";
import {View} from "react-native";
import {CStyle, DEVICE_H, DEVICE_W} from "../style";
import {useDispatch} from "react-redux";
import {SET_MEMOBOARD_DATA, SET_MEMOBOARD_SHOW_HIDE} from "../reducer/actionTypes";
import Animated, {
    Easing, interpolate,
    useAnimatedStyle, useDerivedValue,
    useSharedValue,
    withDecay, withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';

type CalendarMonthType = {
    thisYear: number,
    thisMonthIndex: number,
    weekDayOf1 : any,
    dayObjOf1 : any,
    daysInMonth : number,
    weekDayOfLast : any,
    dayObjOfLast : any,
    today: string[],
    thisMonthMemos : memosType[] | []
    direction : 'PREV' | 'CENTER' | 'NEXT'
};

const CalendarMonth: FunctionComponent<CalendarMonthType> = (props) => {

    const { thisYear, thisMonthIndex, daysInMonth, thisMonthMemos, dayObjOf1, weekDayOf1 , weekDayOfLast, dayObjOfLast, today, direction = 'CENTER' } = props;
    const dispatch = useDispatch();
    const animation = useSharedValue(0);

    useEffect(()=>{
        if(direction === 'CENTER'){
            animation.value = -DEVICE_H / 2;
        }else if(direction === 'PREV'){
            animation.value = -DEVICE_W;
        }else if(direction === 'NEXT') {
            animation.value = DEVICE_W * 2;
        }
        startAnimation();
    }, [thisMonthIndex])

    const startAnimation = () => {
        if(direction === 'CENTER'){
            animation.value = withSpring(0)
        }else if(direction === 'PREV' || direction === 'NEXT'){
            animation.value = withTiming(0,{
                duration: 600,
                easing: Easing.ease
            });
        }
    };

    const opacityAnimation =  useDerivedValue( ()=> {
        let startValue = 0;
        if(direction === 'CENTER'){
            startValue = -300;
        }else if(direction === 'PREV') {
            startValue = -DEVICE_W/2;
        }else if(direction === 'NEXT') {
            startValue =  DEVICE_W/2;
        }
        const tempValue = interpolate( animation.value
            ,[startValue, 0]
            ,[0.5, 1]
        );
        return tempValue;
    },[animation.value]);

    const animationStyle = useAnimatedStyle( () => {
        return (direction === 'CENTER') ? {
            opacity : opacityAnimation.value,
            translateY : animation.value,
        }
        :
        {
            translateX : animation.value,
            transform : [
                {
                    scale: opacityAnimation.value
                }
            ]
        }
    })

    const openMemoBoard = useCallback(async (targetDay : string) => {
        if(targetDay){
            const Memo = await sendQuery("GET", targetDay);
            await dispatch({ type: SET_MEMOBOARD_DATA , payload: { title: targetDay,  data : Memo }  });
            await dispatch({ type: SET_MEMOBOARD_SHOW_HIDE , data: true });
        };
    },[]);

    const isMemoCheck = (type: string, dayText: string) : boolean => {
        let isMemo = false;
        for(let i = 0; i < thisMonthMemos.length; i++){
            const dbDate: number = parseInt(thisMonthMemos[i].created.split('-')[2]);// 메모 데이터가 있다면 memos를 true로 처리 해야 한다.
            if(dbDate === parseInt(dayText)){
                isMemo = true;
                break;
            }
        }
        return isMemo;
    }

    const renderMonth = useCallback( ( type: 'PREV' | 'MONTH' | 'NEXT') => {
        const mapping = (type === 'PREV')
            ? rangeMaker(weekDayOf1) : (type === 'MONTH')
                ? rangeMaker(daysInMonth) : rangeMaker(6 - weekDayOfLast);

        return mapping.map((el: number, i: number) => {
            let dayText: string = (type === 'PREV')
                ? dayObjOf1.subtract(weekDayOf1 - el, "day").date() : (type === 'MONTH')
                    ? el + 1 : dayObjOfLast.add(el + 1, "day").date();

                let isMemo = false;
                if( type === 'MONTH' && thisMonthMemos && thisMonthMemos.length > 0 ){
                    isMemo = isMemoCheck(type, dayText);
                    // 해당하는 년-월의 데이터를 뽑아 왔기 때문에 최대 31개의 메모가 존재, 일단위만 비교하면 끝이다.
                }
                return (<CalendarButton
                            delay={i * 20}
                            onClick={openMemoBoard}
                            key={i + ":" + idMaker()}
                            type={type}
                            today={today}
                            dayText={dayText}
                            thisYear={thisYear}
                            thisMonthIndex={thisMonthIndex}
                            memos={isMemo}
                        />)
        });
    },[dayObjOf1, weekDayOf1 , weekDayOfLast, dayObjOfLast, thisMonthMemos]);

  return (
      <Animated.View style={[animationStyle,CStyle.weekDaysLayout]}>
          { renderMonth('PREV')  }
          { renderMonth('MONTH') }
          { renderMonth('NEXT')  }
      </Animated.View>
  );
};

export default CalendarMonth;
