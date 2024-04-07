import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, Pressable } from 'react-native';
import style from '../style';

export default function LoadingPage({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [styleIndex, setStyleIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const prevStyleIndexRef = useRef(0);

  const animatedValues = {
    topLeftRadius: useRef(new Animated.Value(50)).current,
    topRightRadius: useRef(new Animated.Value(50)).current,
    bottomLeftRadius: useRef(new Animated.Value(50)).current,
    bottomRightRadius: useRef(new Animated.Value(50)).current
  };

  const colors = ["#0477BF", "#F2B705", "#A6290D", "#F2E2C4", "#A6290D", "#F2B705",];
  const stylesArray = [ //BorderRadius: TR, TL, BR, BL
    [50, 50, 50 ,50],
    [50, 50, 50 ,0],
    [50, 50, 0 ,0],
    [50, 0, 0 ,0],
    [0, 0, 0 ,0],
    [50, 0, 0 ,0],
    [50, 50, 0 ,0],
    [50, 50, 50 ,0],
  ];

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setStyleIndex(prevIndex => (prevIndex + 1) % stylesArray.length);
        setColorIndex(prevIndex => (prevIndex + 1) % colors.length);
      }, 400);

      return () => clearInterval(intervalId); 
    }
  }, [isLoading]);

  useEffect(() => {
    if (prevStyleIndexRef.current !== styleIndex) {
      animateStyle();
      prevStyleIndexRef.current = styleIndex;
    }
  }, [styleIndex]);

  const animateStyle = () => {
    Animated.parallel([
      animateBorderRadius(animatedValues.topLeftRadius, stylesArray[styleIndex][0]),
      animateBorderRadius(animatedValues.topRightRadius, stylesArray[styleIndex][1]),
      animateBorderRadius(animatedValues.bottomLeftRadius, stylesArray[styleIndex][2]),
      animateBorderRadius(animatedValues.bottomRightRadius, stylesArray[styleIndex][3])
    ]).start();
  };

  const animateBorderRadius = (animatedValue, toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#D0E4FF"}}>
        <Text style={[style.blackFontSize64, {marginBottom: 25}]}>Dummy List</Text>
        <Animated.View style={[style.blackFontSize25, {
            borderTopLeftRadius: animatedValues.topLeftRadius,
            borderTopRightRadius: animatedValues.topRightRadius,
            borderBottomLeftRadius: animatedValues.bottomLeftRadius,
            borderBottomRightRadius: animatedValues.bottomRightRadius,
            backgroundColor: colors[colorIndex],
            width: 84,
            height: 84
        }]} />

        <Pressable onPress={() => {navigation.navigate("WelcomePage")}} style={{marginTop: 40, borderRadius: 10, backgroundColor: "#999", paddingHorizontal: 10 }}>
            <Text>Start Using The App </Text>
        </Pressable>

       
    </View>
  );
}
