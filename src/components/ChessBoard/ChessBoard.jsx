import React, { useEffect, useState } from 'react'
import './ChessBoard.css'
import Tiles from '../Tiles/Tiles'
import { hasPeice, isDigit, isUpperCase } from '../../logics/util'
import {Tile,Peice,Index} from '../../structs/struct'
import { getAllWatchedTile, getMoves } from '../../logics/peiceMove/moves'

export let currentChessBoard=[]
let tilesUnderWatch=[]
let currentMove=true
let validMoves=[]
let activePeice=null
export default function ChessBoard() {
    const [chessBoard,setChessBoard]=useState([]);
    function makeBoardFromFen(position){
        currentChessBoard=[]
        let currentRow=[];
        position.split("").forEach((ch)=>{
            if(ch==="/"){
                currentChessBoard.push(currentRow);
                currentRow=[];
            }else if(isDigit(ch)){
                for(let i=0;i<parseInt(ch);i++){
                    currentRow.push(new Tile(null,false,false));
                }
            }else{
                if(isUpperCase(ch)){
                    currentRow.push(new Tile(new Peice(ch,false),false,false));
                }else{
                    currentRow.push(new Tile(new Peice(ch,false),false,false));
                }
            }
        })
        renderBoard()
    }
    function renderBoard(){
        setChessBoard(structuredClone(currentChessBoard))
    }
    function makeMove(from, to) {
        currentChessBoard[to.x][to.y] = structuredClone(
          currentChessBoard[from.x][from.y]
        );
        currentChessBoard[from.x][from.y].peice = null;
        currentChessBoard[to.x][to.y].peice.hasMoved = true;
        currentMove = !currentMove;
        tilesUnderWatch = getAllWatchedTile(currentMove);
        for (let watchedTile of tilesUnderWatch) {
          currentChessBoard[watchedTile.x][watchedTile.y].isWatched = true;
        }
  }
    function captureClick(event,index){
        for(let row of currentChessBoard){
            for(let tile of row){
                tile.isAttacked=false;
                tile.isValid=false;
                tile.isWatched=false;
            }
        }
        if(activePeice){
            let move=validMoves.find((ind)=>index.x===ind.x && index.y===ind.y)
            if(move){
                makeMove(activePeice,index)
            }
            activePeice=null
            validMoves=[]
        }else if(hasPeice(index) && isUpperCase(currentChessBoard[index.x][index.y].peice.symbol)===currentMove){
            validMoves=getMoves(index)
            if(validMoves.length){
                activePeice=index
                for(let validMove of validMoves){
                    if(validMove.isAttacked){
                        currentChessBoard[validMove.x][validMove.y].isAttacked=true
                    }else{
                        currentChessBoard[validMove.x][validMove.y].isValid=true
                    }
                }
            }
        }
        renderBoard()
    }
    useEffect(()=>makeBoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/"),[])
    return (
        <div className='chess_board'>
            {chessBoard.map((row,x)=>(
                row.map((tile,y)=>(
                    <Tiles key={[x,y]} index={new Index(x,y)} tile={tile} captureClick={captureClick}></Tiles>
                ))
            ))}
        </div>
    )
}
