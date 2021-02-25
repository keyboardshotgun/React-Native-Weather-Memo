import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TouchableOpacity, Pressable} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import cityCode from '../../assets/citycode_key.json';
import {DEVICE_H, DEVICE_W, WStyle} from "../style";
import TitleBar from "./TitleBar";
import ButtonGroup from "./ButtonGroup";
import {selectedInfoType} from "../reducer/weatherReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../store";
import {SET_MY_LOCATION_DATA} from "../reducer/actionTypes";

type RouteType = {
    params : {
        myLocation : selectedInfoType
    }
}

interface tabOneInterface {
    navigation : StackNavigationProp<any, 'SettingLocation'>;
    route : RouteType;
}

type tabOneProps = tabOneInterface;

const SettingLocation: FunctionComponent<tabOneProps> = ({ navigation }: tabOneInterface) => {

    const [cityData, _] = useState(new Map(Object.entries(cityCode)));
    const [sidoData, setSidoData] = useState<string[]>([]);
    const [sidoState, setSidoState] = useState<string | null>(null);
    const [sigunguData, setSigunguData] = useState<string[]>([]);
    const [sigunguState, setSigunguState] = useState<string | null>(null);
    const [dongData, setDongData] = useState<string[]>([]);
    const [dongState, setDongState] = useState<string | null>(null);
    const [selectedInfo, setSelectedInfo] = useState<selectedInfoType | null>(null);
    const { myLocationInfo } = useSelector((state: RootReducerType ) => state.weatherReducer );
    const dispatch = useDispatch();

    useEffect(() => {
        setSidoData([...cityData.keys()].sort());
    }, [cityData]);

    useEffect(() => {
        if (sidoState && sidoState !== '') {
            const tempArray = [...cityData.get(sidoState)].map((item) => (item.sigungu)).filter((el) => el !== '');
            const tempList: string[] = [...new Set(tempArray).values()].sort();
            setSigunguData(tempList);
        };
    }, [sidoState]);

    useEffect(() => {
        if (sigunguState && sigunguState !== '') {
            const tempArray = [...cityData.get(sidoState)]
                .map((item) => (item.sigungu === sigunguState) ? item.dong : '')
                .filter((el) => el !== '');
            const tempList: string[] = [...new Set(tempArray).values()].sort();
            setDongData(tempList);
        };
    }, [sigunguState]);

    useEffect(() => {
        if (dongState) {
            const tempArray = [...cityData.get(sidoState)].filter((item) => (item.sigungu === sigunguState && item.dong === dongState));
            if (tempArray.length > 0) {
                setSelectedInfo(tempArray[0]);
            }
            ;
        } else {
            setSelectedInfo(null);
        }
        ;
    }, [dongState]);

    useEffect(() => {
     if(myLocationInfo && myLocationInfo.sido){
         setSidoState(myLocationInfo.sido);
         setSigunguState(myLocationInfo.sigungu);
         setDongState(myLocationInfo.dong);
         setSelectedInfo(myLocationInfo);
      }
    },[myLocationInfo]);

    useEffect(() => {
        console.log('selectedInfo FOR TEST =>', selectedInfo);
    }, [selectedInfo])

    const storeData = async () => {
        if (selectedInfo && selectedInfo.nx) {
            try {
                const tempObj = { ...selectedInfo, ...{'sido': sidoState} };
                const jsonValue = JSON.stringify(tempObj);
                await dispatch({
                    type : SET_MY_LOCATION_DATA,
                    data : tempObj
                });
                await AsyncStorage.setItem('@myLocation', jsonValue);
                await navigation.navigate('Home');
            } catch (e) {
                console.log('AsyncStorage/saving Error :', e);
            }
        }
    }

    const clearBeforeUpdate = (type: string) => {
        switch(type){
            case 'SIDO':
                setSidoState(null);
                setSigunguState(null);
                setDongState(null);
            break;
            case 'SIGUNGU':
                setSigunguState(null);
                setDongState(null);
            break;
            case 'DONG' :
                setDongState(null);
            break;
            default:
            break;
        }
    }

    const setSidoHandler = useCallback((el: string) => {
        clearBeforeUpdate('SIDO');
        setSidoState(el);
    }, []);

    const setSigunguHandler = useCallback((el: string) => {
        clearBeforeUpdate('SIGUNGU');
        setSigunguState(el)
    }, []);

    const setDongHandler = useCallback((el: string) => {
        clearBeforeUpdate('DONG');
        setDongState(el)
    }, []);

    const resetSidoHandler = useCallback(() => clearBeforeUpdate('SIDO'), []);
    const resetSigunguHandler = useCallback(() => clearBeforeUpdate('SIGUNGU'), []);
    const resetDongHandler = useCallback(() => clearBeforeUpdate('DONG'), []);

    return (
        <View style={WStyle.mainContainer}>

            <View style={WStyle.hr}/>

            <View style={[WStyle.hr]}>
                <Pressable onPress={ () => navigation.goBack() }>
                    <View style={{
                          width: 70, height: 20
                        , borderRadius: 5, backgroundColor: '#1f8fab', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>{'돌아가기'}</Text>
                    </View>
                </Pressable>
            </View>

            <View style={WStyle.hr}/>

            <TitleBar title={'시 • 도'} subTitle={sidoState} onReset={resetSidoHandler}/>

            {!sidoState && sidoData && sidoData.length > 0 &&
                <ButtonGroup onPress={setSidoHandler} data={sidoData} selected={sidoState}/>
            }

            <View style={WStyle.hr}/>
            <TitleBar title={'시 • 군 • 구'} subTitle={sigunguState} onReset={resetSigunguHandler}/>
            {!sigunguState && sidoState && sigunguData && sigunguData.length > 0 &&
                <ButtonGroup onPress={setSigunguHandler} data={sigunguData} selected={sigunguState}/>
            }

            <View style={WStyle.hr}/>
            <TitleBar title={'읍 • 면 • 동'} subTitle={dongState} onReset={resetDongHandler}/>
            {!dongState && sigunguState && dongData && dongData.length > 0 &&
                <ButtonGroup onPress={setDongHandler} data={dongData} selected={dongState}/>
            }

            {(sidoState && sigunguState && dongState && selectedInfo) && (
                <View style={{
                    position: 'absolute',
                    left: DEVICE_W * 0.2,
                    top: DEVICE_H * 0.4,
                    width: DEVICE_W * 0.6, height: DEVICE_H * 0.4, backgroundColor: '#FFFFFF', elevation: 5
                    , borderRadius: 5, justifyContent: 'center', alignItems: 'center'
                }}>

                    <View style={{
                        width: '100%', height: '70%', backgroundColor: '#caf3f6', justifyContent: 'center'
                        , alignItems: 'center'
                    }}>
                        <Text style={{
                            color: '#999999',
                            elevation: 2,
                            fontSize: 15,
                            marginBottom: 20
                        }}>{sidoState}{" "}{sigunguState}</Text>
                        <Text style={{color: '#000000', elevation: 2, fontSize: 30}}>{dongState}</Text>
                    </View>

                    <View style={{
                        width: '70%', height: '30%', backgroundColor: '#FFFFFF', justifyContent: 'center'
                        , alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={ storeData }
                            style={{
                                    width: '100%', height: '50%', backgroundColor: '#81c3fd', justifyContent: 'center'
                                    , alignItems: 'center', borderRadius: 5, elevation: 2
                            }}>
                            <Text style={{color: '#000000'}}>{'저장하기'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </View>
    )
};

export default React.memo(SettingLocation);
