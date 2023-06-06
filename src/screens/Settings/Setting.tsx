
import { Alert, ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import styles from "./Setting.styles";
import { ReactElement, useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const difficulties = {
    "1": "Beginner",
    "3": "Intermediate",
    "4": "Hard",
    "-1": "Impossible"
}

type SettingsType = {
    difficulty: keyof typeof difficulties;
    sounds: boolean;
    haptics: boolean;
}

const defaultSettings: SettingsType = {
    difficulty: "-1",
    sounds: true,
    haptics: true,
}

export default function Settings(): ReactElement | null {
    const [settings, setSettings] = useState<SettingsType | null>(null)

    const saveSettings = async<T extends keyof SettingsType> (setting: T, value: SettingsType[T])=> {
        try {
            const oldSettings = settings ? settings : defaultSettings;
            const newSettings = {...oldSettings, [setting]: value}
            const jsonSettings = JSON.stringify(newSettings)
            await AsyncStorage.setItem("settings", jsonSettings);
            setSettings(newSettings)
        } catch(err){
            Alert.alert("Error!", "An error has occurred!")
        }
    }

    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.getItem("settings")
            settings !== null ? setSettings(JSON.parse(settings)) : setSettings(defaultSettings)
        } catch(err){
            setSettings(defaultSettings)
        }
    }

    useEffect(() => {
        loadSettings();
    }, [])

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