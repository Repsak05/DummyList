import { View, Text } from 'react-native';
import style from "../style";

export default function Notification({amounts})
{
    return(
        <View style={{backgroundColor: "#f27c91", borderRadius: "50%", padding: 5, height: 30, }}>
            <Text style={[style.darkRedFontSize16Regular, {textAlign: "center",transform: [{ translateY: -5 }] }]}>{amounts}</Text>
        </View>
    )
} 