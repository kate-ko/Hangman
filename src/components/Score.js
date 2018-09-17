import React, { Component } from 'react';


class Score extends Component {
  render() {
    let scoreClass = (this.props.score > 79) ? "high-score": (this.props.score > 49) ? "medium-score" : "low-score"
    let button = (this.props.score < 71 && this.props.numLetToOpen > 0) ? <button
    onClick={this.props.openLetter}>Open one letter</button> : null
    return (
      <div className={scoreClass}>{this.props.score}{button}
      
      </div>
    )
  }
}

export default Score;