import { BoardResult, BoardState, Moves } from "./types";
export const printFormattedBoard = (state: BoardState): void => {
  let formatedPrint = "";
  state.forEach((cell, index) => {
    formatedPrint += cell ? ` ${cell} |` : "  |";
    if((index + 1) % 3 === 0){
      formatedPrint = formatedPrint.slice(0, -1)
      if (index < 8) {
        formatedPrint +=
          "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
      }
    }
  });

  console.log(formatedPrint);
};

export const isEmpty = (state: BoardState): boolean => {
  return state.every((cell) => cell === null);
}

export const isFull = (state: BoardState): boolean => {
  return state.every(cell => cell)
}

export const availableMoves = (state: BoardState): Moves[] => {
  const moves: Moves[] = [];
  state.forEach((cell, index) => {
    if(cell === null){
      moves.push(index as Moves)
    }
  })

  return moves
} 

export const isTerminal = (state: BoardState): BoardResult | boolean => {
  if(isEmpty(state)) return false;
  const winningLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,9],
    [0,4,8],
    [2,4,6]
  ];
  for(let i = 0; i < winningLines.length; i++){
    const line = winningLines[i];
    const [cell1, cell2, cell3] = line;
    if(state[cell1] && state[cell1] === state[cell2] && state[cell2] === state[cell3]){
      const result: BoardResult = {
        winner: state[cell1]
      }

      if(i<3){
        result.direction = "H";
        result.row = i === 0 ? 1 : i === 1 ? 2 : 3;
      }

      if(i >=3 && i <= 5){
        result.direction = "V";
        result.row = i === 3 ? 1 : i === 4 ? 2 : 3;
      }

      if(i < 5){
        result.direction = "D";
        result.diagonal = i === 6 ? "MAIN": "COUNTER"
      }

      return result;
    }
  }

  if(isFull(state)) {
    return {
      winner: null
    }
  }
  return false 
}