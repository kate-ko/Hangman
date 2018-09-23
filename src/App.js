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
      numLetToOpen: NUMLETTOOPEN, // hint to open letters when score is below 70
      gameOver: false
    }
  }
  
  // Enables selecting letter and changing letterStatus
  selectLetter = (selectedLetter) => {
    if (!this.state.gameOver) {  // When game is over, function returns nothing 
      let letterStatus = { ...this.state.letterStatus }
      if (!letterStatus[selectedLetter]) {
        letterStatus[selectedLetter] = true
        this.updateScore(selectedLetter, letterStatus)
      }
    }
  }

  updateScore(selectedLetter, letterStatus) {
    console.log(this.state.letterStatus)
    let { score, numLetToOpen, gameOver } = this.state
    let num = countLetterInWord(selectedLetter, this.state.word)
    score += (num !== 0)? 5 * num : -20

    if (!this.leftToGuess(letterStatus) || score <= 0) { 
      gameOver = true 
      numLetToOpen = 0 // won't show the button "open letter"
    }

    this.setState({ score, gameOver , numLetToOpen, letterStatus })
  }

  // returns true if there are still letters to guess
  leftToGuess(letterStatus) {
    for (let l of this.state.word) { 
      if (!letterStatus[l]) {
        return true 
      }
    }
    return false
  }

  // Starts new game (new life)
  restartGame = () => {
    let life = this.state.life + 1
    this.setState({ ...this.init(life) })
  }

  // Opens random unguessed letter in word
  openLetter = () => {
    let letterStatus = { ...this.state.letterStatus }
    let numLetToOpen = this.state.numLetToOpen - 1
    let randomLetter = this.getRandomLetter()
    letterStatus[randomLetter] = true
    let gameOver = this.leftToGuess(letterStatus) ? false : true 
    this.setState({ letterStatus, numLetToOpen, gameOver })
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

  render() {
    return (
      <div className="container">
        <div> {this.state.gameOver? (this.state.score > 0 ? "You won" : "You lost") : null }
        </div>
        {(this.state.life < MAXLIFE && this.state.gameOver) ? Restart(this.restartGame) : null }
        <Score score={this.state.score} openLetter={this.openLetter} numLetToOpen={this.state.numLetToOpen} />
        <Solution letterStatus={this.state.letterStatus} word={this.state.word} hint={this.state.hint} />
        <Letters letterStatus={this.state.letterStatus} selectLetter={this.selectLetter} />
      </div>
    )
  }
}

export default App;

