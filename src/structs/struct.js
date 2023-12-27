export class Peice {
  constructor(symbol, hasMoved) {
    this.symbol = symbol;
    this.hasMoved = hasMoved;
  }
}
export class Tile {
  constructor(peice, isAttacked, isValid, isWatched) {
    this.peice = peice;
    this.isAttacked = isAttacked;
    this.isValid = isValid;
    this.isWatched = isWatched;
  }
}
export class Index {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
export class Move {
  constructor(x, y, isAttacked = false, isCastle = false, castleIndex = null) {
    this.x = x;
    this.y = y;
    this.isAttacked = isAttacked;
    this.isCastle = isCastle;
    this.castleIndex = castleIndex;
  }
}
