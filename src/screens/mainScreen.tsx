import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Button,
  GestureResponderEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  Easing,
  Extrapolate,
  Extrapolation,
  interpolate,
  interpolateNode,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const MIN_WIDTH = DEVICE_WIDTH * 0.4;
const MAX_WIDTH = DEVICE_WIDTH * 0.85;
const MIN_HEIGHT = 50;
const MAX_HEIGHT = DEVICE_HEIGHT * 0.8;

export const MainScreen = () => {
  const size = useSharedValue(MIN_WIDTH);
  const opacity = useSharedValue(0);
  const test1 = useSharedValue(0);
  const [state, setState] = useState({
    touched: false,
    expand: false,
  });

  const test = interpolate(
    size.value,
    [MIN_WIDTH, MAX_WIDTH],
    [10, 50],
    Extrapolation.CLAMP
  );

  useEffect(() => {
    return () => {
      setState({
        touched: false,
        expand: false,
      });
      size.value = MIN_WIDTH;
      opacity.value = 0;
    };
  }, []);

  useEffect(() => {
    console.log("state: ", state);
    if (!state.touched) {
      if (state.expand) {
        console.log("open");

        size.value = withSpring(Math.floor(MAX_WIDTH), {
          mass: 0.4,
          velocity: 1,
          damping: 25,
          stiffness: 300,
        });
        setTimeout(() => {
          opacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
        }, 100);
      } else {
        console.log("close");
        size.value = withSpring(Math.floor(MIN_WIDTH), {
          mass: 1,
          velocity: 1,
          damping: 25,
          stiffness: 400,
        });
        setTimeout(() => {
          opacity.value = withTiming(0, { duration: 50, easing: Easing.ease });
        }, 0);
      }
    }

    if (state.touched) {
      console.log("touched");
      size.value = withSpring(
        Math.floor(state.expand ? size.value + 30 : size.value - 30),
        {}
      );
    }

    return () => {};
  }, [state.touched, state.expand]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: size.value,
      height: MIN_HEIGHT * (size.value / MIN_WIDTH) ** 2,
      borderRadius: (MIN_WIDTH / size.value) * 30,
      backgroundColor: `rgba(0,0,0,${(MIN_WIDTH * 1.5) / size.value})`,
    };
  });

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          backgroundColor: "white",
          // height: DEVICE_HEIGHT * 0.3,
          flex: 1,
          alignItems: "center",
        }}
        onTouchEnd={() => {
          if (state.expand && !state.touched) {
            setState({ ...state, expand: false });
          }
        }}
        pointerEvents="auto"
      >
        <Animated.View
          style={[
            {
              backgroundColor: "black",
              borderRadius: 100,
              width: MIN_WIDTH,
              minHeight: 50,
              padding: 20,
            },
            animatedStyle,
          ]}
          onTouchStart={() => {
            setState({ ...state, touched: true });
          }}
          onTouchEnd={(x: GestureResponderEvent) => {
            if (state.expand) {
              setState({ ...state, expand: false, touched: false });
            } else {
              setState({ ...state, expand: true, touched: false });
            }
          }}
          pointerEvents="auto"
        >
          <Animated.View style={[style.islandContent, animatedOpacity]}>
            <Text style={{ color: "yellow" }}>Test Hello</Text>
            <View style={style.media}>
              <View style={style.seeker}>
                <View style={style.seekerLine}></View>
                <View style={style.seekerDot}></View>
              </View>
              <View style={style.mediaControls}>
                <AntDesign
                  allowFontScaling={false}
                  size={25}
                  name="stepbackward"
                  color={"white"}
                />
                <AntDesign
                  allowFontScaling={false}
                  size={25}
                  name="caretright"
                  // style={{ backgroundColor: "yellow" }}
                  color={"white"}
                  onPress={() => {
                    alert("HEY");
                  }}
                />
                <AntDesign
                  allowFontScaling={false}
                  size={25}
                  name="stepforward"
                  color={"white"}
                />
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: "center",
  },
  island: {
    position: "absolute",
    left: (DEVICE_WIDTH * 0.6) / 2,
    top: DEVICE_HEIGHT * 0.05,
    backgroundColor: "black",
    color: "white",
    width: "100%",
    maxWidth: DEVICE_WIDTH * 0.4,
    paddingHorizontal: 15,
    borderRadius: 100,
    justifyContent: "center",
    zIndex: 99,
  },
  islandText: {
    color: "white",
  },
  islandContent: {
    flex: 1,
    // backgroundColor: "green",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mediaControls: {
    flexDirection: "row",
    // backgroundColor: "green",
    gap: 30,
  },
  seeker: {
    flexDirection: "row",
    flex: 1,
    maxHeight: 20,
    // backgroundColor: "green",
    alignItems: "center",
  },
  seekerLine: {
    flex: 1,
    borderColor: "#999",
    height: 0,
    borderBottomWidth: 2,
  },
  seekerDot: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: "white",
  },
  media: {
    // backgroundColor: "red",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
});
