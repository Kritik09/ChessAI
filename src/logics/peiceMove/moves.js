import { currentChessBoard } from "../../components/ChessBoard/ChessBoard";
import bishopMoves from "../../logics/peiceMove/bishopMove";
import rookMoves from "../../logics/peiceMove/rookMove";
import pawnMoves from "../../logics/peiceMove/pawnMove";
import knightMoves from "../../logics/peiceMove/knightMove";
import kingMoves from "../../logics/peiceMove/kingMove";
import { hasPeice, isUpperCase } from "../util";
import { Index } from "../../structs/struct";

export let currentMove = true;
let possibleMoves = [];
export function getMoves(index, flag = 0) {
  // 1 flag is used to not check king
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
  if (!flag) validMoves = checkKing(validMoves, index);
  return validMoves;
}

function checkKing(validMoves, index) {
  let trueValidMoves = [];
  // make the move in validMoves and after that no peice should be attacking the king
  for (let move of validMoves) {
    // make move
    let flag = true;
    let board = structuredClone(currentChessBoard);
    makeMove(index, move);
    let kingIndex = getKingIndex(!currentMove, currentChessBoard);
    console.log("KingIndex ", kingIndex);
    let watchedTile = getAllWatchedTile(!currentMove);
    for (let tile of watchedTile) {
      if (tile.x === kingIndex.x && tile.y === kingIndex.y) {
        flag = false;
      }
    }
    currentMove = !currentMove;
    setBoard(board);
    if (flag) {
      trueValidMoves.push(move);
    }
  }
  return trueValidMoves;
}
function setBoard(board) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      currentChessBoard[i][j] = board[i][j];
    }
  }
}
function getKingIndex(current, board) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let tile = board[i][j];
      if (
        tile.peice &&
        tile.peice.symbol.toUpperCase() === "K" &&
        isUpperCase(tile.peice.symbol) === current
      ) {
        return new Index(i, j);
      }
    }
  }
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
        allMoves = getMoves(new Index(i, j), 1);
        for (let move of allMoves) {
          watchedTiles.push(new Index(move.x, move.y));
        }
      }
    }
  }
  return watchedTiles;
}

export function makeMove(from, to) {
  currentChessBoard[to.x][to.y] = structuredClone(
    currentChessBoard[from.x][from.y]
  );
  currentChessBoard[from.x][from.y].peice = null;
  currentChessBoard[to.x][to.y].peice.hasMoved = true;
  currentMove = !currentMove;
}
export function generateAllMoves(currentMove) {
  let allMoves = [...Array(8)].map((e) => Array(8).fill(null));
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (
        currentChessBoard[i][j].peice &&
        isUpperCase(currentChessBoard[i][j].peice.symbol) === currentMove
      ) {
        let x = getMoves(new Index(i, j));
        console.log(x);
        allMoves[i][j] = x;
      }
    }
  }
  console.log("allmove", allMoves);
  return allMoves;
}
