
import { ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import styles from "./Setting.styles";
import { ReactElement, useState } from "react";


export default function Settings(): ReactElement {
    const [state, setState] = useState<boolean>(true)
    const difficulties = {
        "1": "Beginner",
        "3": "Intermediate",
        "4": "Hard",
        "-1": "Impossible"
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.field}>
                <Text style={styles.label}>Bot Difficulty</Text>
                <View style={styles.choices}>
                    {Object.keys(difficulties).map((level) => {
                        return (
                            <TouchableOpacity style={styles.choice} key={level} >
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
                    value={state} 
                    onValueChange={() => setState(!state)} 
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
                    value={state} 
                    onValueChange={() => setState(!state)} 
                />
            </View>
        </ScrollView>
    )
}