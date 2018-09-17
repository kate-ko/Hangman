import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Letters from './components/Letters';
import Score from './components/Score';
import Solution from './components/Solution';
import { generateLetterStatus, countLetterInWord , MAXSCORE, 
  PAIRS, MAXLIFE, NUMLETTOOPEN, Restart } from './utilities';

class App extends Component {
  constructor() {
    super()
    this.state = this.init(0)
  }

  init(life) {
    return {
      life: life,
      letterStatus: generateLetterStatus(),
      score: MAXSCORE,
      word: PAIRS[life].word,
      hint: PAIRS[life].hint,
      leftToGuess: PAIRS[life].word.length,
      numLetToOpen: NUMLETTOOPEN,
      gameOver: false
    }
  }
  
  // Enables selecting letter and changing letterStatus
  selectLetter = (selectedLetter) => {
    if (!this.state.gameOver) { // Letters are only active until game is over
      let letterStatus = { ...this.state.letterStatus }

      if (!letterStatus[selectedLetter]) {
        letterStatus[selectedLetter] = true
        this.setState({ letterStatus: letterStatus })
        this.updateScore(selectedLetter)
      }
    }
  }

  updateScore(selectedLetter) {
    let score = this.state.score
    let leftToGuess = this.state.leftToGuess
    let numLetToOpen = this.state.numLetToOpen
    let gameOver = false 
    let num = countLetterInWord(selectedLetter, this.state.word)
    score += (num !== 0)? 5 * num : -20
    leftToGuess -= num
    if (leftToGuess === 0 || score <= 0) { 
      gameOver = true 
      numLetToOpen = 0 // won't show the button "open letter"
    }
    this.setState({ score: score, leftToGuess: leftToGuess, 
      gameOver: gameOver , numLetToOpen: numLetToOpen })
  }

  // Starts new game (new life)
  restartGame = () => {
    let life = this.state.life + 1
    this.setState({ ...this.init(life) })
  }

  // Opens random unguessed letter in word
  openLetter = () => {
    let letterStatus = { ...this.state.letterStatus }
    let numLetToOpen = this.state.numLetToOpen
    let randomLetter = this.getRandomLetter()
    letterStatus[randomLetter] = true
    this.updateLeftToGuess(randomLetter)
    this.setState({ letterStatus: letterStatus, numLetToOpen: numLetToOpen - 1 })
  }

  // helper for openLetter func
  getRandomLetter = () => {
    let hiddenLetters = []
    for (let l of this.state.word) { // creating array of letters which are still not open
      if (!this.state.letterStatus[l]) {
        hiddenLetters.push(l)
      }
    }
    hiddenLetters = Array.from(new Set(hiddenLetters))
    return hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)]
  }

  // helper for openLetter func
  updateLeftToGuess(letter) {
    let leftToGuess = this.state.leftToGuess
    let gameOver = false
    leftToGuess -= countLetterInWord(letter, this.state.word)
    if (leftToGuess === 0) { gameOver = true }
    this.setState({ leftToGuess: leftToGuess, gameOver: gameOver })
  }

  render() {
    return (
      <div className="container">
        <div>{this.state.leftToGuess === 0 ? "You won!" :
          this.state.score < 1 ? "You lost" : null}</div>
        {(this.state.life < MAXLIFE && this.state.gameOver) ? Restart(this.restartGame) : null }
        <Score score={this.state.score} openLetter={this.openLetter} numLetToOpen={this.state.numLetToOpen} />
        <Solution letterStatus={this.state.letterStatus} word={this.state.word} hint={this.state.hint} />
        <Letters letterStatus={this.state.letterStatus} selectLetter={this.selectLetter} />
      </div>
    )
  }
}

export default App;

