import React, { Component } from 'react';
import Letter from './Letter';

class Letters extends Component {
  generateLetterTags() {
    const letterStatus = this.props.letterStatus
    return Object.keys(letterStatus).map(l => {
      return (<Letter
        key={l}
        class={letterStatus[l] ? "selected" : null}
        letter={l}
        selectLetter={this.props.selectLetter} />)
    })
  }

  render() {
    return (
      <div>
        <div>Available letters:</div>
        {this.generateLetterTags()}
      </div>
    )
  }
}

export default Letters;