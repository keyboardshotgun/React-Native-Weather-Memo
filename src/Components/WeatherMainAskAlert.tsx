import React, { FunctionComponent } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {WeatherMainStyle, WStyle} from "../style";
import {StackNavigationProp} from "@react-navigation/stack";

type tabOneType = StackNavigationProp<any>;
interface tabOneInterface {
    navigation: tabOneType
};
type WeatherMainAskAlertProps = tabOneInterface;

const WeatherMainAskAlert: FunctionComponent<WeatherMainAskAlertProps> = ({ navigation}) => {
  return (
      <View style={WStyle.mainContainer}>
          <View style={WeatherMainStyle.backgroundLayout}/>
          <View style={WeatherMainStyle.alertLayout}>
              <View style={WeatherMainStyle.alertLayoutTop}>
                  <Text style={WeatherMainStyle.alertLayoutTopText}>{'Set Priorities'}</Text>
              </View>
              <View style={WeatherMainStyle.alertLayoutMiddleInfo}>
                  <Text
                      style={WeatherMainStyle.alertLayoutMiddleInfoText}>{'원할한 서비스 제공을 위해\n🌤날씨 정보에 필요한\n지역설정이 필요합니다.'}</Text>
              </View>
              <View style={WeatherMainStyle.alertLayoutMiddleButtonLayout}>
                  <TouchableOpacity
                      style={WeatherMainStyle.alertLayoutMiddleButton}
                      onPress={() => navigation.navigate('SettingLocation')}>
                      <Text style={WeatherMainStyle.alertLayoutMiddleButtonText}>{'지역설정 하러 가기'}</Text>
                  </TouchableOpacity>
              </View>
              <View style={WeatherMainStyle.alertLayoutBottom}>
                  <Text style={WeatherMainStyle.alertLayoutBottomText}>{'📌 이 설정은 휴대전화의 위치정보를 사용하지 않습니다'}</Text>
              </View>
          </View>
      </View>
  );
};

export default React.memo(WeatherMainAskAlert);
