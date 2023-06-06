
import { ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import styles from "./Setting.styles";
import { ReactElement } from "react";
import {useSettings, difficulties} from "contexts/SettingContext";

export default function Settings(): ReactElement | null {
    const {settings, saveSettings} = useSettings();

    if(!settings) return null;
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.field}>
                <Text style={styles.label}>Bot Difficulty</Text>
                <View style={styles.choices}>
                    {Object.keys(difficulties).map((level) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => {
                                    saveSettings("difficulty", level as keyof typeof difficulties)
                                }}
                                style={[styles.choice, {
                                    backgroundColor: settings.difficulty === level ? "#1B9C85" : "#bbb"
                                }]} 
                                key={level} 
                            >
                                    <Text style={styles.choiceText}>{difficulties[level as keyof typeof difficulties]}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={[styles.field, styles.switchField]}>
                <Text style={styles.label}>Sounds</Text>
                <Switch 
                    trackColor={{
                        true: "#1B9C85"
                    }}
                    thumbColor="#fff"
                    ios_backgroundColor="#1B9C85"
                    value={settings.sounds} 
                    onValueChange={() => saveSettings("sounds", !settings.sounds)} 
                />
            </View>
            <View style={[styles.field, styles.switchField]}>
                <Text style={styles.label}>Vibrations</Text>
                <Switch 
                    trackColor={{
                        true: "#1B9C85"
                    }}
                    thumbColor="#fff"
                    ios_backgroundColor="#1B9C85"
                    value={settings.haptics} 
                    onValueChange={() => saveSettings("haptics", !settings.haptics)} 
                />
            </View>
        </ScrollView>
    )
}