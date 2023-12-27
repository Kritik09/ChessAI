import React from 'react'
import './Tiles.css'
import whiteRook from '../../assets/whiteRook.png'
import whiteBishop from '../../assets/whiteBishop.png'
import whiteKnight from '../../assets/whiteKnight.png'
import whiteKing from '../../assets/whiteKing.png'
import whiteQueen from '../../assets/whiteQueen.png'
import whitePawn from '../../assets/whitePawn.png'
import blackRook from '../../assets/blackRook.png'
import blackBishop from '../../assets/blackBishop.png'
import blackKnight from '../../assets/blackKnight.png'
import blackKing from '../../assets/blackKing.png'
import blackQueen from '../../assets/blackQueen.png'
import blackPawn from '../../assets/blackPawn.png'
export default function Tiles(props) {
    const images={
        q:blackQueen,
        Q:whiteQueen,
        k:blackKing,
        K:whiteKing,
        n:blackKnight,
        N:whiteKnight,
        p:blackPawn,
        P:whitePawn,
        b:blackBishop,
        B:whiteBishop,
        r:blackRook,
        R:whiteRook
    }
  return (
    <>
      <div 
      className={`tiles 
      ${(props.index.x+props.index.y)%2===0?"white ":"black "}
      ${(props.tile.isValid?"valid_cell ":"")}
      ${(props.tile.isAttacked?"attacked_cell ":"")}
      ${(props.tile.isWatched?"watched_cell ":"")}
      `}
      onClick={(event)=>props.captureClick(event,props.index)}
      >
        {props.tile.peice?<div className='peice' style={{backgroundImage:`url(${images[props.tile.peice.symbol]})`}}/>:<></>}
      </div>
    </>
  )
}
