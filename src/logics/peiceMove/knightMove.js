import { Index, Move } from "../../structs/struct";
import { hasPeice, isSamePeice, isValid } from "../util";
export default function knightMoves(index) {
  let validMoves = [];
  const dir = [
    { x: 2, y: -1 },
    { x: 2, y: 1 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: 1, y: -2 },
    { x: 1, y: 2 },
    { x: -1, y: -2 },
    { x: -1, y: 2 },
  ];
  for (let i = 0; i < dir.length; i++) {
    let cur = new Index(index.x + dir[i].x, index.y + dir[i].y);
    if (isValid(cur)) {
      if (hasPeice(cur)) {
        if (!isSamePeice(cur, index)) {
          validMoves.push(new Move(cur.x, cur.y, true));
        }
      } else {
        validMoves.push(new Move(cur.x, cur.y));
      }
    }
  }
  return validMoves;
}
