import { ReactElement, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { BoardResult } from "utils";
import styles from "./BoardLine.styles";

type BoardLineProps = {
    size:number;
    gameResult?: BoardResult | false; 
}

export default function BoardLine({size, gameResult}: BoardLineProps): ReactElement{
    const animationRef = useRef<Animated.Value>(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(animationRef.current, {
            toValue: 1,
            duration: 900,
            useNativeDriver: false
        }).start()
    }, []);
    return (
        <>
            {gameResult && gameResult.column && gameResult.direction === "V" && <Animated.View style={[styles.baseLine, styles.vLine, {
                left: `${33.333 * gameResult.column - 16.666}%`,
                height: animationRef.current.interpolate({
                    inputRange: [0,1],
                    outputRange: ["0%", "90%"]
                })
            }]}></Animated.View>}
            {gameResult && gameResult.row && gameResult.direction === "H" && <Animated.View style={[styles.baseLine, styles.hLine, { 
                top: `${33.333 * gameResult.row - 16.666}%`,
                width: animationRef.current.interpolate({
                    inputRange: [0,1],
                    outputRange: ["0%", "90%"]
                })
            }]}></Animated.View>}
            {gameResult && gameResult.diagonal && gameResult.direction  === "D" && <Animated.View style={[styles.baseLine, styles.dLine, {
                height: "100%",
                transform: [
                    {
                        rotateZ: gameResult.diagonal === "MAIN" ? "-45deg": "45deg"
                    },
                ]
            }]}></Animated.View>}
        </>
    )
}
