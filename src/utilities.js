import React, { Component } from 'react';

const MAXSCORE = 100
const INITIAL_STATE = {
  score: MAXSCORE,
  numLetToOpen: 1,
  gameOver: false
}
const PAIRS = [
  { word: "SSSNOW", hint: "WINTER" },
  { word: "BLOSSOM", hint: "SPRING" },
]
const MAXLIFE = 1 // Maximum life number from 0
const NUMLETTOOPEN = 1

const Restart = (restartGame) => (<div>
  <button
    onClick={restartGame}>Restart game</button>
</div>)

const generateLetterStatus = () => {
    let letterStatus = {}
    for (let i = 65; i < 91; i++) {
      letterStatus[String.fromCharCode(i)] = false
    }
    return letterStatus
}

const countLetterInWord = (letter, word) => {
    let num = 0
    for (let i of word) {
      if (i === letter) {
        num++
      }
    }
    return num
}

export { generateLetterStatus, countLetterInWord , MAXSCORE, 
        PAIRS, MAXLIFE, NUMLETTOOPEN, Restart };


