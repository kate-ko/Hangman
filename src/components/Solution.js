import React, { Component } from 'react';
import SolLetter from './SolLetter';

class Solution extends Component {
  showWord() {
    let word = this.props.word.split("")
    return word.map(( l, index) => {
      return (<SolLetter
        key={index}
        class={this.props.letterStatus[l] ? "guessed" : "not-guessed"}
        letter={this.props.letterStatus[l] ? l : "_"}
      />)
    })
  }
  
  render() {
    return (
      <div>
        <div>Word: </div>
        <div>{this.showWord()}</div>
        <div>Hint: {this.props.hint}</div>
      </div>
    )
  }
}

export default Solution;