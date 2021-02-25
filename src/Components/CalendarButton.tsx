import React, {FunctionComponent, useCallback, useEffect, useMemo} from 'react';
import {Pressable, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import Animated, {
    Easing, interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue, withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import {CStyle} from "../style";
import {memosType} from "./Calendar";
import {withBouncing} from "react-native-redash";
import {debounce} from "../util/utils";

interface CalendarButtonType {
    dayText: string;
    type: string;
    today: string[];
    thisYear: number;
    thisMonthIndex: number;
    memos : boolean;
    onClick : (dayText: string) => void;
    delay : number;
}

type CalendarButtonProps = CalendarButtonType;
const CalendarButton: FunctionComponent<CalendarButtonProps> = ({
                                                                      dayText
                                                                    , type
                                                                    , today
                                                                    , thisYear
                                                                    , thisMonthIndex
                                                                    , memos
                                                                    , onClick
                                                                    , delay = 0
                                                                }) => {

    let boxStyle: StyleProp<ViewStyle>;
    let textStyle: StyleProp<TextStyle>;
    if (type === 'MONTH' && thisYear === parseInt(today[0])
        && (thisMonthIndex + 1) === parseInt(today[1])
        && (parseInt(dayText) === parseInt(today[2])) )
    {
        boxStyle = CStyle.todaysBox;
        textStyle = CStyle.todayText;
    }else{
        boxStyle = (type === 'MONTH') ? CStyle.daysBox : CStyle.prevNextDaysBox;
        textStyle = (type === 'MONTH') ? CStyle.dayText : CStyle.prevNextdayText;
    };

    const makeDays = useMemo( () => {
        let nowMonth = null;
        let nowYear  = null;
        if(type === 'PREV'){
            nowMonth = (thisMonthIndex  === 0) ? 12 : thisMonthIndex - 2;
            nowYear  = (thisMonthIndex  === 0) ? thisYear - 1 : thisYear;
        }else if(type === 'MONTH'){
            nowMonth = thisMonthIndex + 1;
            nowYear  = thisYear
        }else if(type === 'NEXT'){
            nowMonth = (thisMonthIndex  === 11) ? 1 : thisMonthIndex + 2;
            nowYear  = (thisMonthIndex  === 11) ? thisYear + 1 : thisYear;
        }
        const modText = ( String(dayText).length === 1) ? "0"+dayText : dayText;
        const modMonth = ( String(nowMonth).length === 1 ) ? "0"+(nowMonth) : (nowMonth);
        return nowYear+"-"+modMonth+"-"+modText;
    },[])

    const onCLickHandler = useCallback( () => {
        if(onClick){
            onClick(makeDays);
        }
    },[])

    return (type === 'MONTH') ?
    (
        <TouchableOpacity
            onPress={onCLickHandler}>
            <Animated.View style={[boxStyle]}>
                <View style={{height:'60%'
                    , alignItems:'center'
                    ,justifyContent : 'flex-end'
                    , width:'100%'}}>
                    <Text style={textStyle}>{dayText}</Text>
                </View>
                <View style={{height:'40%'
                    , alignItems:'center'
                    , width:'100%'}}>
                    { memos && <View><Text style={{fontSize: 18,color: '#db8dff'}}>{'✏'}</Text></View> }
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
    :
    (
        <Animated.View style={[boxStyle]}>
            <Text style={textStyle}>{dayText}</Text>
        </Animated.View>
    )
};

export default React.memo(CalendarButton);
