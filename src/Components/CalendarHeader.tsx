import React, {FunctionComponent, useCallback} from 'react';
import {CStyle} from "../style";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";

interface ICalendarWeek {
    onPress : (type: 'PREV' | 'NEXT') => void,
    thisYear : number,
    monthList : string[],
    thisMonthIndex : number,
};

type CalendarWeekProps = ICalendarWeek;

const CalendarHeader: FunctionComponent<CalendarWeekProps> = (props) => {

    const { thisYear, monthList,  thisMonthIndex, onPress } = props;
    const pressHandler = useCallback( (type: 'PREV' | 'NEXT') => {
      onPress(type);
    },[]);

  return (
      <View style={ CStyle.headerLayout }>
          <TouchableOpacity
              onPress={()=>pressHandler('PREV')}
              style={CStyle.headerLeftRight}>
                  <Text style={{color: '#0067ff', fontSize: 18, fontWeight: 'bold'}}>{'◀'}</Text>
          </TouchableOpacity>
          <View style={CStyle.headerCenter}>
              <View style={{width:'30%',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize: 15}}>{thisYear}</Text>
              </View>
              <View style={{width:'70%',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize: 20}}>{ monthList[thisMonthIndex] }</Text>
              </View>
          </View>
          <TouchableOpacity
              onPress={()=>pressHandler('NEXT')}
              style={CStyle.headerLeftRight}>
              <Text style={{color: '#0067ff', fontSize: 18, fontWeight: 'bold'}}>{'▶'}</Text>
          </TouchableOpacity>
      </View>
  );
};

export default React.memo(CalendarHeader);
