import React, {FunctionComponent, useCallback, useMemo} from 'react';
import {Text, View} from "react-native";
import {CStyle} from "../style";

type CalendarWeeksType = {
    weekData : string[];
}
const CalendarWeeks: FunctionComponent<CalendarWeeksType> = ({ weekData }) : JSX.Element => {
    const renderingWeek = useMemo( () => {
        return weekData.map( (el: string, index: number) =>
            (<View key={index} style={CStyle.weekBox}><Text style={CStyle.weekDayText}>{el}</Text></View>)
        );
    },[weekData]);
    return ( <View style={CStyle.weekDaysLayout}>{ renderingWeek }</View>);
};
export default CalendarWeeks;
