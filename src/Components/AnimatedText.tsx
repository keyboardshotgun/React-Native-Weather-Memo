import React from "react";
import Animated, { interpolate,Extrapolate, useAnimatedProps, useAnimatedStyle } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

interface AnimatedTextProps {
  text: { value : string & number },
}

const style = StyleSheet.create({
  default : {
    fontSize: 10,
  }
})

const AnimatedText = ({ text } : AnimatedTextProps)   => {

  const styleAnimation = useAnimatedStyle(() => {
      const interColor = text.value >= 97 ? '#FFFFFF' : '#000000';
      const interFonSize = interpolate( parseInt(text.value),
            [0, 100],
           [7, 13],
                   Extrapolate.CLAMP
        )
      return {
        color: interColor,
        fontSize: interFonSize,
      }
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    }
  })

  return (
    <AnimatedTextInput
      style={[styleAnimation, style.default]}
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      animatedProps={animatedProps}
    />
  )
}
export default AnimatedText
