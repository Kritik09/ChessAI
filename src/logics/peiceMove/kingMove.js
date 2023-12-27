import { Index, Move } from "../../structs/struct";
import { hasMoved, hasPeice, isSamePeice, isUpperCase, isValid } from "../util";
import { currentChessBoard } from "../../components/ChessBoard/ChessBoard";

const dir = [
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
];
function isTileHasOpKing(index, par) {
  for (let ind of dir) {
    let cur = new Index(ind.x + index.x, ind.y + index.y);
    if (
      isValid(cur) &&
      hasPeice(cur) &&
      (cur.x != par.x || cur.y != par.y) &&
      currentChessBoard[cur.x][cur.y].peice.symbol.toUpperCase() == "K"
    ) {
      return true;
    }
  }
  return false;
}

// function canCastle(index){
//   let col=currentChessBoard[index.x][index.y].peice.symbol
//   if(isUpperCase(col)){
//     if()
//   }
// }

export default function kingMoves(index) {
  let validMoves = [];
  dir.forEach((ind, i) => {
    let cur = new Index(ind.x + index.x, ind.y + index.y);
    if (isValid(cur) && !isTileHasOpKing(cur, index)) {
      if (hasPeice(cur)) {
        if (!isSamePeice(cur, index)) {
          validMoves.push(new Move(cur.x, cur.y, true));
        }
      } else {
        validMoves.push(new Move(cur.x, cur.y));
      }
    }
  });
  return validMoves;
}
