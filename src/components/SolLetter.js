import React, { Component } from 'react';

class SolLetter extends Component {
  selectLetter = () => {
    this.props.selectLetter(this.props.letter)
  }

  render() {
    return (
      <span>
        <span className={this.props.class}>
          {this.props.letter} 
        </span> <span>
        </span>
      </span>
    )
  }

}

export default SolLetter;