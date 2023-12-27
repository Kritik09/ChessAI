import { currentChessBoard } from "../../components/ChessBoard/ChessBoard";
import bishopMoves from "../../logics/peiceMove/bishopMove";
import rookMoves from "../../logics/peiceMove/rookMove";
import pawnMoves, { pawnWatchingMoves } from "../../logics/peiceMove/pawnMove";
import knightMoves from "../../logics/peiceMove/knightMove";
import kingMoves from "../../logics/peiceMove/kingMove";
import { hasPeice, isUpperCase } from "../util";
import { Index } from "../../structs/struct";

export function getMoves(index) {
  let validMoves = [];
  if (currentChessBoard[index.x][index.y].peice.symbol.toUpperCase() === "B") {
    validMoves = bishopMoves(index);
  }
  if (currentChessBoard[index.x][index.y].peice.symbol.toUpperCase() === "R") {
    validMoves = rookMoves(index);
  }
  if (currentChessBoard[index.x][index.y].peice.symbol.toUpperCase() === "Q") {
    validMoves = rookMoves(index);
    validMoves = validMoves.concat(validMoves, bishopMoves(index));
  }
  if (currentChessBoard[index.x][index.y].peice.symbol.toUpperCase() === "P") {
    validMoves = pawnMoves(index);
  }
  if (currentChessBoard[index.x][index.y].peice.symbol.toUpperCase() === "N") {
    validMoves = knightMoves(index);
  }
  if (currentChessBoard[index.x][index.y].peice.symbol.toUpperCase() === "K") {
    validMoves = kingMoves(index);
  }
  //   Now have to check if after making the moves the king is not in check
  return validMoves;
}
export function getAllWatchedTile(col) {
  const watchedTiles = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (
        hasPeice(new Index(i, j)) &&
        isUpperCase(currentChessBoard[i][j].peice.symbol) !== col
      ) {
        let allMoves = [];
        if (currentChessBoard[i][j].peice.symbol.toUpperCase() === "P") {
          allMoves = pawnWatchingMoves(new Index(i, j));
        } else {
          allMoves = getMoves(new Index(i, j));
        }
        for (let move of allMoves) {
          watchedTiles.push(new Index(move.x, move.y));
        }
      }
    }
  }
  return watchedTiles;
}
