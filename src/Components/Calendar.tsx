import React, {useCallback, useEffect} from 'react';
import {View} from "react-native";
import dayjs from "dayjs";
import {connDB, disConnDB, memosType, sendQuery} from "../util/utils";
import CalendarHeader from "./CalendarHeader";
import CalendarWeeks from "./CalendarWeeks";
import CalendarMonth from "./CalendarMonth";
import {connect} from "react-redux";
import {RootReducerType} from "../store";

type CalendarProps = {
    updateMonth?: boolean;
}

type CalendarState = {
    dayObj: any,
    today: string[],
    thisYear: number,
    thisMonthIndex: number,
    daysInMonth: number,
    dayObjOf1: any,
    dayObjOfLast: any,
    weekDayOf1: any,
    weekDayOfLast: any,
    dayList: string[],
    dayListEng: string[],
    monthList: string[],
    monthListEng: string[],
    leapYear: number[],
    notLeapYear: number[],
    lang: 'ko' | 'en',
    inputText: string
    memos : memosType[] | [],
    arrowDirection : 'PREV' | 'CENTER' | 'NEXT',
}

//앞프뒤스
class Calendar extends React.Component<CalendarProps, CalendarState> {

    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            dayObj: dayjs(),
            today: dayjs(new Date()).format('YYYY-MM-DD').split('-'),
            thisYear: dayjs().year(),
            thisMonthIndex: dayjs().month(),
            daysInMonth: dayjs().daysInMonth(),
            dayObjOf1: dayjs(`${dayjs().year()}-${dayjs().month() + 1}-1`),
            dayObjOfLast: dayjs(`${dayjs().year()}-${dayjs().month() + 1}-${dayjs().daysInMonth()}`),
            weekDayOf1: dayjs(`${dayjs().year()}-${dayjs().month() + 1}-1`).day(),
            weekDayOfLast: dayjs(`${dayjs().year()}-${dayjs().month() + 1}-${dayjs().daysInMonth()}`).day(),
            dayList: ['일', '월', '화', '수', '목', '금', '토'],
            dayListEng: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            monthList: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthListEng: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            leapYear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            notLeapYear: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            lang: 'ko',
            inputText : "",
            memos : [],
            arrowDirection: 'CENTER',
        }
    };

    componentDidMount() {
        connDB().then( async (_) => {
                 await this._getUpdateThisMonth();
         });
    };

    componentWillUnmount() {
        disConnDB().catch();
    };

    _deleteAllMemo = async () => {
        await sendQuery("DELETE_ALL").then((res) => console.log(res));
    }

    _getUpdateThisMonth =  async () => {
        const {thisMonthIndex, thisYear} = this.state;
        // console.log(thisYear, thisMonthIndex);
        const keyMonth = (String(thisMonthIndex+1).length === 1 ) ? '0'+(thisMonthIndex+1) : thisMonthIndex+1;
        const keyCode  = thisYear + "-" + keyMonth;
        const MonthMemo = await sendQuery("GET_MONTHLY", keyCode);
        console.log("response of MonthMemo => ", keyCode , typeof MonthMemo, MonthMemo && MonthMemo.length);
        if(MonthMemo && MonthMemo.length > 0){
            this.setState({
                memos : MonthMemo
            });
        }
    };

    shouldComponentUpdate(nextProps: Readonly<CalendarProps>, nextState : Readonly<CalendarState>) {
        return ( JSON.stringify(nextState.dayObj) !== JSON.stringify(this.state.dayObj)
                 || JSON.stringify(nextState.thisYear) !== JSON.stringify(this.state.thisYear)
                 || JSON.stringify(nextState.thisMonthIndex) !== JSON.stringify(this.state.thisMonthIndex)
                 || JSON.stringify(nextState.daysInMonth) !== JSON.stringify(this.state.daysInMonth)
                 || JSON.stringify(nextState.memos) !== JSON.stringify(this.state.memos)
                 || JSON.stringify(nextState.dayObjOf1) !== JSON.stringify(this.state.dayObjOf1)
                 || JSON.stringify(nextState.dayObjOfLast) !== JSON.stringify(this.state.dayObjOfLast)
                 || JSON.stringify(nextState.weekDayOf1) !== JSON.stringify(this.state.weekDayOf1)
                 || JSON.stringify(nextState.weekDayOfLast) !== JSON.stringify(this.state.weekDayOfLast)
                 || JSON.stringify(nextProps.updateMonth) !== JSON.stringify(this.props.updateMonth)
               )
    };

    componentDidUpdate(prevProps: Readonly<CalendarProps>, prevState: Readonly<CalendarState>, snapshot?: any) {

        if (prevState.dayObj !== this.state.dayObj) {
            console.log("componentDidUpdate/ dayObj");
            this.setState({
                thisYear: this.state.dayObj.year(),
                thisMonthIndex: this.state.dayObj.month(),
                daysInMonth: this.state.dayObj.daysInMonth(),
            },async ()=>{
                await this._getUpdateThisMonth();
            });
        }

        if (prevState.thisMonthIndex !== this.state.thisMonthIndex) {
            this.setState({
                dayObjOf1: dayjs(`${this.state.thisYear}-${this.state.thisMonthIndex + 1}-1`),
                dayObjOfLast: dayjs(`${this.state.thisYear}-${this.state.thisMonthIndex + 1}-${this.state.daysInMonth}`),
                weekDayOf1: dayjs(`${this.state.thisYear}-${this.state.thisMonthIndex + 1}-1`).day(),
                weekDayOfLast: dayjs(`${this.state.thisYear}-${this.state.thisMonthIndex + 1}-${this.state.daysInMonth}`).day(),
            });
        }

        if( prevProps.updateMonth !== this.props.updateMonth && this.props.updateMonth){
            console.log('updateMonth need to update', this.props.updateMonth);
            this._getUpdateThisMonth().catch(()=>null);
        }
    };

    _handleMonth = (type: 'PREV' | 'NEXT') => {
        const {dayObj} = this.state;
        this.setState({
            ...this.state,
            dayObj: (type === 'PREV') ? dayObj.subtract(1, "month") : dayObj.add(1, "month"),
            memos : [],
            arrowDirection: type,
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <CalendarHeader
                    onPress={this._handleMonth}
                    thisYear={this.state.thisYear}
                    monthList={this.state.monthList}
                    thisMonthIndex={this.state.thisMonthIndex}
                />
                <CalendarWeeks weekData={this.state.dayList} />
                <CalendarMonth
                    direction={this.state.arrowDirection}
                    thisYear={this.state.thisYear}
                    thisMonthIndex={this.state.thisMonthIndex}
                    weekDayOf1={this.state.weekDayOf1}
                    dayObjOf1={this.state.dayObjOf1}
                    daysInMonth={this.state.daysInMonth}
                    weekDayOfLast={this.state.weekDayOfLast}
                    dayObjOfLast={this.state.dayObjOfLast}
                    today={this.state.today}
                    thisMonthMemos={this.state.memos}
                />
            </View>
        );
    }
}

//  이거 확인 하고 연결 해서 처리 하면 될 듯...
const mapStateToProps = ({ weatherReducer } : RootReducerType) => ({
    updateMonth : weatherReducer['startUpdateMonth'],
});

export default connect(mapStateToProps,null)(Calendar);
