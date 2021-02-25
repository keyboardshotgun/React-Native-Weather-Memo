import {Dimensions, StyleSheet} from 'react-native';

export const DEVICE_W = Dimensions.get('window').width;
export const DEVICE_H = Dimensions.get('window').height;

const mainContainerColor = '#FFFFF5';
//const buttonGroupContainerHeight = 0.40;
const buttonGroupMargin = 10;
const buttonHeight = 28;
const buttonWidth = '30%';
const buttonRadius = buttonHeight / 2;
const buttonFontSize = 13;
const titleBarHeight = 35;
const titleLeftBarRate = 25;
const modalContentsBottomLinerHeight = '10%';
const modalContentsBottomLinerColor  = '#069bab';

export const WStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: mainContainerColor
    },
    hr: {
        width: '100%', height: 20,
        justifyContent: 'center',
        alignItems :'flex-end',
        paddingRight: 15
    },
    titleBarContainer: {
        width: '100%',
        height: titleBarHeight,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    titleBarLeft: {
        width: titleLeftBarRate + '%',
        height: titleBarHeight,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    titleBarRight: {
          width: (100 - titleLeftBarRate) + '%'
        , height: titleBarHeight
        , backgroundColor: '#d6d6d6'
        , borderTopRightRadius: 5
        , borderBottomRightRadius: 5
        , justifyContent: 'center'
        , alignItems: 'center'
        , flexDirection : 'row'
    },
    titleBarRightInnerLeft: {
          justifyContent: 'center'
        , alignItems: 'center'
        , width : '85%'
    },
    titleBarRightInnerRight: {
        justifyContent: 'center'
        , alignItems: 'center'
        , width: '10%'
        , backgroundColor: '#FFFFFF'
        , borderRadius: 7
        , paddingBottom: 2
    },
    titleBarText: {
        color: '#F5F5F5'
    },
    titleBarSubText: {
      color: '#333333'
    },
    buttonGroupContainer: {
          width : DEVICE_W
        , flexDirection: 'row'
        , flexWrap: 'wrap'
        , justifyContent: 'flex-start', alignContent: 'flex-start'
    },
    buttonLayout: {
          paddingHorizontal: 10
        , width: buttonWidth
        , height: buttonHeight
        , justifyContent: 'center'
        , alignItems: 'center'
        , borderWidth: 0.5, borderColor: '#333333'
        , marginTop: buttonGroupMargin
        , marginLeft: buttonGroupMargin
        , borderRadius: buttonRadius
        , elevation: 2
        , backgroundColor: '#F5F5F5'
    },
    buttonText: {
        fontSize: buttonFontSize, color: '#333333'
    },
});

export const WeatherMainStyle = StyleSheet.create({
    backgroundLayout : {
        flex:1, backgroundColor: '#000000', opacity: 0.2
    },
    alertLayout : {
        position : 'absolute',
        borderRadius: 7,
        elevation : 5,
        left: DEVICE_W * 0.05,
        top:  DEVICE_W * 0.2,
        width: DEVICE_W * 0.9, height: DEVICE_H * 0.6, justifyContent:'center', alignItems: 'center'
        , backgroundColor: '#FFFFFF'
    },
    alertLayoutTop : {
        width: '80%', height: '25%', justifyContent:'center', alignItems: 'center'
        ,backgroundColor : '#00b7ff'
        ,borderRadius : 5
        ,elevation : 2,
    },
    alertLayoutTopText : {
        color: '#ffffff' , fontSize : 30
    },
    alertLayoutMiddleInfo : {
        width: DEVICE_W, height: '35%', justifyContent:'center', alignItems: 'center'
    },
    alertLayoutMiddleInfoText : {
        color: '#13cf3a', lineHeight: 30
    },
    alertLayoutMiddleButtonLayout : {
        width: DEVICE_W, height: '20%', justifyContent:'center', alignItems: 'center'
    },
    alertLayoutMiddleButton : {
        width: DEVICE_W * 0.6, height: 50, justifyContent:'center', alignItems: 'center', backgroundColor: '#000000'
        ,borderRadius: 5
        ,elevation : 3
    },
    alertLayoutMiddleButtonText: {
        color: '#FFFFFF'
    },
    alertLayoutBottom : {
        width: DEVICE_W, height: '5%', justifyContent:'center', alignItems: 'center'
    },
    alertLayoutBottomText : {
        color: '#999999', fontSize: 11
    },
    headerLayout : {
        flexDirection: 'row'
    },
    headerPressable : {
        width: 200,
        height: 30,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: 'transparent',
        paddingRight: 15,
    },
    headerPressableIconText : {
        color: '#000000', fontSize: 13
    },
    headerPressableLocationText : {
        fontSize: 13,
        color: '#333333',
        borderBottomWidth : StyleSheet.hairlineWidth,
    },
    headerSettingButton : {
        width: 40, height: 30
        , backgroundColor: "#3cbddd"
        , marginRight: 10
        , borderRadius: 10
        , justifyContent: "center"
        , alignItems: "center"
    },
    headerSettingButtonText : {
        color: "#FFFFFF", fontSize: 18, fontWeight: "bold"
    },
    buttonStyleRed : {
        padding: 7,
        alignSelf: 'center'
        , backgroundColor: "#d83cdd"
        , borderRadius: 7
        , elevation : 2
        , borderWidth : StyleSheet.hairlineWidth
        , borderColor : '#FFFFFF'
    },
    buttonStyleOrange : {
        padding: 7,
        alignSelf: 'center'
        , backgroundColor: "#dda23c"
        , borderRadius: 7
        , elevation : 2
        , borderWidth : StyleSheet.hairlineWidth
        , borderColor : '#FFFFFF'
    },
    buttonStyleGreen : {
        padding: 7,
        alignSelf: 'center'
        , backgroundColor: "#40a747"
        , borderRadius: 7
        , elevation : 2
        , borderWidth : StyleSheet.hairlineWidth
        , borderColor : '#FFFFFF'
    },
    buttonStyleBlack : {
        padding: 7,
        alignSelf: 'center'
        , backgroundColor: "#646464"
        , borderRadius: 7
        , elevation : 2
        , borderWidth : StyleSheet.hairlineWidth
        , borderColor : '#FFFFFF'
    },
    buttonStyle : {
        padding: 7,
        alignSelf: 'center'
        , backgroundColor: "#3cbddd"
        , borderRadius: 7
        , elevation : 2
        , borderWidth : StyleSheet.hairlineWidth
        , borderColor : '#FFFFFF'
    },
    buttonStyleSmall2 : {
        width: 30
        , height: '100%'
        , backgroundColor: "transparent"
        , justifyContent: 'center'
        , alignItems: 'center'
        , paddingBottom : 5
    },
    buttonStyleSmall : {
          width: 30
        , height: '100%'
        , backgroundColor: "#3cbddd"
        , borderRadius: 3
        , paddingBottom: 5
        , justifyContent: 'center'
        , alignItems: 'center'
    },
    buttonTextTiny : {
          color: "#ffffff"
        , fontSize: 8
        , fontStyle: 'italic'
        , textAlign : 'left'
    },
    buttonTextSmall : {
         color: "#ffffff"
        ,fontSize: 10
        ,fontStyle: 'italic'
        ,textAlign : 'left'
    },
    buttonText : {
        color: "#FFFFFF", fontSize: 12, fontWeight: "bold"
    },
    buttonTextNormal : {
        color: "#FFFFFF", fontSize: 14, fontWeight: "bold"
    },
    buttonTextBig : {
        color: "#FFFFFF", fontSize: 16, fontWeight: "bold"
    },
    buttonText18 : {
        color: "#FFFFFF", fontSize: 18, fontWeight: "bold"
    },
    buttonIconText : {
        color: "#FFFFFF", fontSize: 30, fontWeight: "bold"
    },
    weatherBoxLayout : {
          flexDirection:'row', width:'100%'
        , flexWrap:'wrap', alignItems :'center', justifyContent: 'flex-start'
        , padding: 10
        , height : 100
    },
    modalLayout : {
        width: DEVICE_W,
        height: DEVICE_H,
        position: 'absolute',
        top :0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        elevation : 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    modalContents : {
        width: DEVICE_W * 0.85,
        height: DEVICE_H * 0.5,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    modalContentsTopLiner : {
        width: '100%'
        , height: modalContentsBottomLinerHeight
        , backgroundColor: modalContentsBottomLinerColor
        , borderTopLeftRadius: 10
        , borderTopRightRadius : 10
        , alignItems: 'center'
        , justifyContent : 'center'
        , flexDirection : 'row',
    },
    modalContentsBottomLiner : {
          width: '100%'
        , height: modalContentsBottomLinerHeight
        , backgroundColor: modalContentsBottomLinerColor
        , borderBottomLeftRadius: 10
        , borderBottomRightRadius : 10
    }
});

const calendarHeaderCenterRate = 60; // 100
const hairLine = StyleSheet.hairlineWidth;
const monthBoxWidth  =  DEVICE_W / 7.5;
const monthBoxHeight =  60;
const monthBoxMarginBottom =  3;
const monthBoxBorderColor = '#999999'

export const CStyle = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
        ,borderWidth : hairLine
    },
    headerLayout : {
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      borderTopWidth: 1,
      borderColor : monthBoxBorderColor,
    },
    headerCenter : {
         width: calendarHeaderCenterRate + '%'
        ,height: 40
        ,justifyContent: 'center'
        ,alignItems : 'center'
        ,flexDirection: 'row'
    },
    headerLeftRight : {
         width: (100 - calendarHeaderCenterRate) / 2 + '%'
        ,height: 40
        ,justifyContent: 'center'
        ,alignItems : 'center',
    },
    weekDaysLayout : {
        width: DEVICE_W,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
    },
    weekBox : {
        width: monthBoxWidth,
        height: monthBoxHeight / 1.5,
        marginBottom: monthBoxMarginBottom,
        marginLeft : monthBoxMarginBottom,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        //borderTopWidth: StyleSheet.hairlineWidth,
        //borderRightWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor : monthBoxBorderColor,
        elevation: 2
    },
    daysBox : {
        width: monthBoxWidth,
        height: monthBoxHeight,
        marginBottom: monthBoxMarginBottom,
        marginLeft : monthBoxMarginBottom,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopWidth: StyleSheet.hairlineWidth,
        // borderLeftWidth: StyleSheet.hairlineWidth,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor : monthBoxBorderColor,
        backgroundColor: '#F5F5F5',
        elevation : 2
    },
    prevNextDaysBox : {
        width: monthBoxWidth,
        height: monthBoxHeight,
        marginBottom: monthBoxMarginBottom,
        marginLeft : monthBoxMarginBottom,
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopWidth: StyleSheet.hairlineWidth,
        // borderLeftWidth: StyleSheet.hairlineWidth,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor : monthBoxBorderColor,
        backgroundColor: '#666666',
        opacity: 0.3
    },
    todaysBox : {
        width: monthBoxWidth,
        height: monthBoxHeight,
        marginBottom: monthBoxMarginBottom,
        marginLeft : monthBoxMarginBottom,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        // borderTopWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor : monthBoxBorderColor,
        backgroundColor: '#FFFFFF',
    },
    weekDayText : {
        fontSize: 14
    },
    dayText : {
        fontSize: 14,
        color: '#333333'
    },
    prevNextdayText : {
        fontSize: 14,
        color: '#818181'
    },
    todayText : {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#333333'
    },
});
