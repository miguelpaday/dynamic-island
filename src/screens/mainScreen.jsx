import { View, Text, SafeAreaView, StyleSheet, Dimensions, Button } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

export const MainScreen = () => {
  
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(100, { duration: 1000, easing: Easing.ease }, ()=>{
      // opacity.value = 
    });

    return () => {
      opacity.value = 0
    }
  }, [opacity]);
  
  

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // opacity: opacity.value,
      // transform: [
      //   {translateX: opacity.value}
      // ],
      width: opacity.value,
      height: opacity.value / 2
    };
  });


  return (
      <SafeAreaView style={style.container}>
          <Animated.View onTouchStart={()=>{
            alert('hey')
          }} style={[style.island, animatedStyle]}>
            <Text style={style.islandText}>mainScreen</Text>
            {/* <Button style={style.island} onPress={()=>{
              console.log("weee")
            }} title="nice" label="aw">
            </Button> */}
          </Animated.View>

          {/* <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'blue' }, animatedStyle]} /> */}

      </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'green',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: 'center'
  }, 
  island: {
    position: 'absolute',
    left: (DEVICE_WIDTH * 0.6)/2,
    top: (DEVICE_HEIGHT * 0.05),
    backgroundColor: 'black',
    color: 'white',
    // width: '100%',
    maxWidth: DEVICE_WIDTH * 0.4,
    // height: DEVICE_HEIGHT * 0.04,
    paddingHorizontal: 15,
    borderRadius: 100,
    justifyContent: 'center',
    zIndex: 99
  },
  islandText: {
    color: 'white'
  }
})
