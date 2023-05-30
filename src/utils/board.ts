import { BoardState, Moves } from "./types";
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