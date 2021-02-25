import React, {FunctionComponent} from 'react';
import {Pressable, Text, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {WeatherMainStyle} from "../style";
import {useSelector} from "react-redux";
import {RootReducerType} from "../store";
import WeatherMainAskAlert from "./WeatherMainAskAlert";
import WeatherMainMemoCalendar from "./WeatherMainMemoCalendar";
import {selectedInfoType} from "../reducer/weatherReducer";

type tabOneType = StackNavigationProp<any, 'Home'>;
interface tabOneInterface {
    navigation: tabOneType
}
type tabOneProps = tabOneInterface;
type myLocationInfo = { myLocationInfo : selectedInfoType }
const WeatherMain: FunctionComponent<tabOneProps> = ({navigation}: tabOneInterface) => {
    const { myLocationInfo } : myLocationInfo = useSelector((state: RootReducerType) => state.weatherReducer);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={WeatherMainStyle.headerLayout}>
                    {(myLocationInfo && myLocationInfo.dong) ?
                        (
                            <Pressable onPress={() => navigation.navigate('SettingLocation')}>
                                <View style={WeatherMainStyle.headerPressable}>
                                    <Text style={WeatherMainStyle.headerPressableIconText}>{'📍 '}</Text>
                                    <Text style={WeatherMainStyle.headerPressableLocationText}>{myLocationInfo.dong}</Text>
                                </View>
                            </Pressable>
                        )
                        :
                        (
                            <TouchableOpacity
                                style={WeatherMainStyle.headerSettingButton}
                                onPress={() => navigation.navigate('SettingLocation')}>
                                <Text style={WeatherMainStyle.headerSettingButtonText}>{"⚙"}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            ),
        });
    }, [navigation, myLocationInfo]);

    if (myLocationInfo && myLocationInfo.sido )
    {
        return (<WeatherMainMemoCalendar />)
    } else {
        return (<WeatherMainAskAlert navigation={navigation} />)
    }
};

export default WeatherMain;
