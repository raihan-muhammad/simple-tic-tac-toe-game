import { StyleSheet } from "react-native";

const styles =  StyleSheet.create({
    baseLine: {
        position: "absolute",
        backgroundColor: "orange",
    },
    vLine: {
        width: 2,
        top: "5%"
    },
    hLine: {
        width: "90%",
        height: 2,
        left: "5%"
    },
    dLine: {
        width: 2,
        top: 0,
        left: "50%"
    }
})

export default styles;