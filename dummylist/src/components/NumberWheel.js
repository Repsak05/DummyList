import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import style from '../style.js';

export default function NumberWheel({ totalNumberOfValues, deviderValue, minNumber = 1, onValueChange }) {
    const options = [];
    const emptySpace = Math.ceil(totalNumberOfValues / deviderValue + minNumber);

    for (let i = 0; i < emptySpace; i++) {
        options.push("ㅤ");
    }

    for (let i = minNumber; i < minNumber + totalNumberOfValues; i++) {
        options.push(i);
    }

    for (let i = 0; i < emptySpace; i++) {
        options.push("ㅤ");
    }

    const [middleNumber, setMiddleNumber] = useState(null);
    const [prevMiddleNumber, setPrevMiddleNumber] = useState(null);
    const scrollViewRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(null);
    const [contentWidth, setContentWidth] = useState(null);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.measure((fx, fy, width, height, px, py) => {
                setContainerWidth(width);
            });
        }
    }, []);

    useEffect(() => {
        if (containerWidth && contentWidth) {
            const initialScrollX = (contentWidth - containerWidth) / 2;
            scrollViewRef.current.scrollTo({ x: initialScrollX, animated: false });
            const initialMiddleIndex = Math.round(initialScrollX / (containerWidth / options.length));
            const initialMiddleVal = options[initialMiddleIndex];
            setMiddleNumber(initialMiddleVal);
            setPrevMiddleNumber(initialMiddleVal);
            onValueChange(initialMiddleVal);
        }
    }, [containerWidth, contentWidth]);

    const onContentSizeChange = (width, height) => {
        setContentWidth(width);
    };

    const calculateMiddleNumber = (event) => {
        const screenWidth = Dimensions.get("window").width;
        const scrollOffsetX = event.nativeEvent.contentOffset.x;
        const scrollViewCenter = scrollOffsetX + screenWidth / 2;
        const middleIndex = Math.round(scrollViewCenter / (contentWidth / options.length));
        const middleVal = options[middleIndex];
        if (Number.isInteger(middleVal)) {
            setMiddleNumber(middleVal);
            setPrevMiddleNumber(middleVal);
            onValueChange(middleVal);
        } else {
            setMiddleNumber(prevMiddleNumber);
        }
    };

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            onScroll={calculateMiddleNumber}
            scrollEventThrottle={16}
            onContentSizeChange={onContentSizeChange}
        >
            <View style={{ flexDirection: "row" }}>
                {options.map((val, index) => (
                    <TouchableOpacity key={index} style={{ paddingHorizontal: 15 }}>
                        <Text style={[style.blackFontSize64, val === middleNumber ? styles.highlightedText : null]}>{val}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    highlightedText: {
        backgroundColor: 'green',
    },
});
