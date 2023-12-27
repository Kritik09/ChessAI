import { currentChessBoard } from "../components/ChessBoard/ChessBoard";

export function isUpperCase(ch) {
  return ch >= "A" && ch <= "Z";
}
export function isDigit(ch) {
  return ch >= "0" && ch <= "9";
}
export function isValid(index) {
  return index.x >= 0 && index.y >= 0 && index.x < 8 && index.y < 8;
}
export function hasPeice(index) {
  return currentChessBoard[index.x][index.y].peice;
}
export function isSamePeice(a, b) {
  return (
    isUpperCase(currentChessBoard[a.x][a.y].peice.symbol) ===
    isUpperCase(currentChessBoard[b.x][b.y].peice.symbol)
  );
}
export function hasMoved(index) {
  return currentChessBoard[index.x][index.y].peice.hasMoved;
}
