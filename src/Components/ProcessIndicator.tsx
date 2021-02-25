import {DEVICE_W} from '../style';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle, useDerivedValue
} from "react-native-reanimated";
import React from 'react';
import AnimatedText from "./AnimatedText";

type proIndyType = {
  tranX: Animated.SharedValue<number>;
};

const ProcessIndicator = ({tranX}: proIndyType) => {

  const processStyle = useAnimatedStyle(() => {

    const percent = interpolate(
      -tranX.value,
      [0, 1814],
      [0, 100],
      Extrapolate.CLAMP,
    );

    const radius = interpolate(
      -tranX.value,
      [0, 181, 1700, 1814],
      [3, 10, 10, 1],
      Extrapolate.CLAMP,
    );

    return {
      width: percent + '%',
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
    };
  }, [tranX]);

  const stepText = useDerivedValue(() => {
      const percent = interpolate(
        -tranX.value,
        [0, 1814],
        [0, 100],
        Extrapolate.CLAMP,
      );
    return `${percent <= 0 ? '' : percent.toFixed(0)}`;
  },[tranX])

  return (
    <Animated.View
      style={{
        width: DEVICE_W,
        height: 15,
        backgroundColor: '#0ea3db',
        paddingVertical: 0,
        justifyContent: 'center',
      }}>
      <Animated.View
        style={[
          processStyle,
          {
            width: '0%',
            height: 15,
            backgroundColor: '#FF0000',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}>
      </Animated.View>
      <Animated.View style={{position:'absolute',left:0,top:-13,width:DEVICE_W,height:40
        ,backgroundColor:'transparent',justifyContent:'center',alignItems:'flex-end'
      }}>
        <AnimatedText text={stepText} />
      </Animated.View>
    </Animated.View>
  );
};

export default ProcessIndicator;
