import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useDerivedValue, useSharedValue, withDelay,
    withSequence,
    withSpring, withTiming
} from 'react-native-reanimated';
import {DEVICE_H, DEVICE_W} from "../../style";
import {debounce} from "../../util/utils";

interface OwnProps {
    readonly data : {
        index : string;
        category : string;
        value : string | number;
    },
    boxWidth: string,
    delay: number
}
type Props = OwnProps;

const WeatherBox: FunctionComponent<Props> = ({ data, boxWidth, delay }: OwnProps) => {

    const animation = useSharedValue(-100);

    useEffect(()=>{
        animation.value = -50;
        startAnimation();
    }, [])

    const startAnimation = () => {
        animation.value = withDelay(
            delay,
            withSpring(0)
        )
    }

    const opacityAnimation =  useDerivedValue( ()=> {
        const Timimg = interpolate( animation.value
            ,[-50,  -5, 0]
            ,[0 , 0.2, 1])
        return Timimg;
    },[animation]);

    const animationStyle = useAnimatedStyle( () => {
        return {
                opacity : opacityAnimation.value,
                translateY : animation.value,
            }
    })

    return (
      <Animated.View
          style={[animationStyle, { width: boxWidth ,height: 80, marginRight:'1%'}]}>
          <View style={{width:'100%',height:'25%', backgroundColor: '#bbfacd'
              // , borderTopWidth : StyleSheet.hairlineWidth
              , borderRightWidth : StyleSheet.hairlineWidth
              , borderTopLeftRadius : 2
              , borderTopRightRadius : 2
              , borderColor : '#999999'
              , alignItems :'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 10, color: '#999999', fontWeight: "bold"}}>{data.category}</Text>
          </View>
          <View style={{width:'100%',height:'75%', backgroundColor: '#ffffff'
              , borderBottomWidth : StyleSheet.hairlineWidth
              , borderRightWidth : StyleSheet.hairlineWidth
              , borderBottomLeftRadius : 5
              , borderBottomRightRadius : 5
              , borderColor: '#999999'
              , alignItems :'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, color: '#333333', fontWeight: "100"}}>{data.value}</Text>
          </View>
      </Animated.View>
  );
};

export default WeatherBox;
