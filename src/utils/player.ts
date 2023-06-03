import { BoardState  } from "./types"
import { isTerminal, availableMoves, printFormattedBoard } from "./board"
export const getBestMove = (state: BoardState, maximizing: boolean, depth = 0): any => {
    const terminalObject = isTerminal(state);
    // if(terminalObject){
    //     if(terminalObject.winner === "x"){
    //         return 100 - depth
    //     } else if(terminalObject.winner === "o"){
    //         return -100 + depth;
    //     }
    //     return 0;
    // }
    if(maximizing){
        let best = -100;
        availableMoves(state).forEach(index => {
            const child: BoardState = [...state];
            child[index] = "x";
            console.log(`child board (x trun) (depth: ${depth})`)
            printFormattedBoard(child);
            const childValue = getBestMove(child, false, depth + 1)
            console.log("ChildValue", childValue);
            best = Math.max(best, childValue);
        })
        console.log(best)
        return best
    }
    if(!maximizing){
        let best = 100;
        availableMoves(state).forEach(index => {
            const child: BoardState = [...state];
            child[index] = "o";
            console.log(`child board (o trun) (depth: ${depth})`)
            printFormattedBoard(child);
            const childValue = getBestMove(child, true, depth + 1)
            console.log("ChildValue", childValue);
            best = Math.min(best, childValue);
        })
        console.log(best)
        return best
    }
}