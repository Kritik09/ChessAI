import { Index, Move } from "../../structs/struct";
import { hasPeice, isSamePeice, isValid } from "../util";
export default function bishopMoves(index) {
  let validMoves = [];
  const dir = [
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
  ];
  for (let i = 0; i < dir.length; i++) {
    let cur = new Index(index.x + dir[i].x, index.y + dir[i].y);
    while (isValid(cur)) {
      if (hasPeice(cur)) {
        if (!isSamePeice(cur, index)) {
          validMoves.push(new Move(cur.x, cur.y, true));
        }
        break;
      }
      validMoves.push(new Move(cur.x, cur.y));
      cur.x += dir[i].x;
      cur.y += dir[i].y;
    }
  }
  return validMoves;
}
