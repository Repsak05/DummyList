import React from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from "../style";

export default function ProfileChallengesOverview()
{
    const allChallenges = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "img9", "img10", "img11", "img12", "img13", "img14","img15", "img16", "img17", "img18", "img19", "img20", "img21"]
    return(
        <View style={[style.roundedCorners, {backgroundColor: "#F8F9FF", flex: 1, width: "90%", alignSelf: "center"}]}>
            <View style={{flexDirection: "column", paddingVertical: 19, paddingHorizontal: 35}}>
                <Text style={style.blackFontSize25}>Challenges</Text>
                <View style={{marginTop: 1, flexWrap: "wrap",}}>
                    {/* Missing images */}
                    <View style={[style.roundedCorners, {flexDirection: "row", flexWrap: "wrap"}]}>
                        {allChallenges.map(imgSource => (
                            <View key={imgSource} style={{backgroundColor: "#173578", width: 40, height: 40, marginBottom: 5, marginRight: 5}}>
                                <Text>{imgSource}</Text>
                            </View>
                        ))}
                    </View>
                </View>

            </View>
        </View>
    )
}