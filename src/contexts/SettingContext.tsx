import { ReactElement, ReactNode, createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";

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

type SettingsContextType = {
    settings: SettingsType | null
    loadSettings: () => void
    saveSettings: <T extends keyof SettingsType>(settings: T, value: SettingsType[T]) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

function useSettings(): SettingsContextType {
    const context = useContext(SettingsContext);
    if(!context) throw new Error("useSettings must be used within a SettingsProvider")
    return context;
}

function SettingsProvider(props: {children: ReactNode}): ReactElement {
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

    return (
        <SettingsContext.Provider
            {...props}        
            value={{
                settings,
                saveSettings, 
                loadSettings
            }}
        />
    )
}

export {useSettings, SettingsProvider, difficulties};