import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    board: {
        flexWrap: "wrap",
        flexDirection: "row",
    },
    cell: {
        width: "33.333%",
        height: "33.333%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    cell0: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    cell1: {
        borderTopWidth: 0,
    },
    cell2: {
        borderTopWidth: 0,
        borderRightWidth: 0
    },
    cell3: {
        borderLeftWidth: 0,
    },
    cell5: {
        borderRightWidth: 0,
    },
    cell6: {
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    cell7: {
        borderBottomWidth: 0,
    },
    cell8: {
        borderRightWidth: 0,
        borderBottomWidth: 0
    }
})

export default styles;