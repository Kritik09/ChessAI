import { Index, Move } from "../../structs/struct";
import { hasMoved, hasPeice, isSamePeice, isUpperCase, isValid } from "../util";
import { currentChessBoard } from "../../components/ChessBoard/ChessBoard";

export function pawnWatchingMoves(index) {
  let validMoves = [];
  let dir = [];
  if (isUpperCase(currentChessBoard[index.x][index.y].peice.symbol)) {
    // white move up
    dir = [
      { x: -1, y: -1 },
      { x: -1, y: 1 },
    ];
  } else {
    dir = [
      { x: 1, y: -1 },
      { x: 1, y: 1 },
    ];
  }
  for (let d of dir) {
    let cur = new Index(d.x + index.x, d.y + index.y);
    if (isValid(cur)) {
      validMoves.push(new Move(cur.x, cur.y));
    }
  }
  return validMoves;
}

export default function pawnMoves(index) {
  let validMoves = [];
  let dir = [];
  if (isUpperCase(currentChessBoard[index.x][index.y].peice.symbol)) {
    // white move up
    dir = [
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: -1, y: 1 },
    ];
  } else {
    dir = [
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
    ];
  }
  dir.forEach((ind, i) => {
    let cur = new Index(ind.x + index.x, ind.y + index.y);
    if (isValid(cur)) {
      if (i === 0) {
        if (!hasPeice(cur)) {
          validMoves.push(new Move(cur.x, cur.y));
          cur.x += ind.x;
          cur.y += ind.y;
          if (!hasPeice(cur) && !hasMoved(index)) {
            validMoves.push(new Move(cur.x, cur.y));
          }
        }
      } else if (hasPeice(cur) && !isSamePeice(cur, index)) {
        validMoves.push(new Move(cur.x, cur.y, true));
      }
    }
  });
  return validMoves;
}
