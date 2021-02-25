import React, { useCallback, useEffect } from "react";
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { DEVICE_W } from "../style";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COUNT_DOWN, COUNT_RESET, COUNT_UP } from "../reducer/actionTypes";
import { withBouncing } from "react-native-redash";
import CarsElement from "./ImageData";

type DropDownBoxType = {
  onAndOff: boolean,
  index: number,
  onPress: (bool:boolean) => void
}

const DropDown = ({ onAndOff, index, onPress }: DropDownBoxType) => {

  const carData = useSelector((state) => state?.carReducer.carData.selected);
  const heightAnimated = useSharedValue(0);

  //const counter = useSelector((state) => state?.carReducer.counter);
  //const dispatch = useDispatch();
  // const onAddCount = useCallback(() => {
  //   openWindow()
  //   dispatch({type: COUNT_UP});
  // }, []);
  //
  // const onDeleteCount = useCallback(() => {
  //   dispatch({type: COUNT_DOWN});
  // }, []);
  //
  // const onResetCount = useCallback(() => {
  //   closeWindow();
  //   dispatch({type: COUNT_RESET});
  // }, []);

  useEffect(() => {
    onAndOff ? openWindow() : closeWindow();
  }, [onAndOff]);

  const openWindow = () => {
    heightAnimated.value = withTiming(65);
  };

  const closeWindow = () => {
    heightAnimated.value = withTiming(0);
    onPress(false);
  };

  const windowStyle = useAnimatedStyle(() => {

    const opacity = interpolate(heightAnimated.value,
      [25, 50],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      height: heightAnimated.value + "%",
      opacity: opacity
    };
  }, [heightAnimated]);

  return (
    <Animated.View
      style={[windowStyle, {
        position: "absolute",
        left: 0,
        top: 0,
        width: DEVICE_W,
        height: "0%",
        backgroundColor: "#000000",
        elevation: 1,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        opacity: 0
      }]}>

      {carData && (
        <View style={{
          width: DEVICE_W,
          height: 80,
          backgroundColor: "transparent",
          padding: 10,
          borderColor: "#FFFFFF",
          borderWidth: 1
        }}>
          <Text style={{ color: "#FFFFFF" }}>{carData.car_name}</Text>
          <Text style={{ color: "#FFFFFF" }}>{carData.size}</Text>
          <Text style={{ color: "#FFFFFF" }}>{carData.price}</Text>
        </View>
      )}

      <View style={{ width: DEVICE_W, height: 330, padding: 30, borderWidth: 1, borderColor: "#FFFFFF" }}>
        <CarsElement index={index} />
      </View>

      <TouchableOpacity
        style={{
            width: DEVICE_W, height: 16
          , borderBottomLeftRadius: 10 , borderBottomRightRadius : 10 , backgroundColor: "#ff9900", justifyContent: "center", alignItems: "center"
        }}
        onPress={closeWindow}>
        <View>
          <Text style={{ color: "#000000", fontSize: 10, fontWeight: "bold" }}>{"CLOSE"}</Text>
        </View>
      </TouchableOpacity>

    </Animated.View>
  );
};

export default DropDown;
