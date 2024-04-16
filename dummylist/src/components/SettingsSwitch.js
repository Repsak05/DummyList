import React, { useState } from "react";
import { View, Text, Switch } from 'react-native';
import style from "../style";

export default function SettingsSwitch({ name, onPress }) {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    return (
        <View style={{ flexDirection: "column", alignContent: "center", width: "100%", marginBottom: 18 }}>
             <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <Text style={[style.greyFontSize20Reg, { marginLeft: 24 }]}>{name || "Completed Friends"}</Text>
                <Switch value={isSwitchOn} onValueChange={() => { setIsSwitchOn(!isSwitchOn); onPress(); }} style={{ width: 58, height: 30, marginRight: 10 }} />
            </View>

            <View style={{ marginTop: 5, borderBottomColor: "#000000", borderBottomWidth: 3, width: "100%" }} />
        </View>
    )
}
