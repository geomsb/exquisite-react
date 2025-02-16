import React, { Component } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lines: [],
      final: false,
    }
  }

  onClick = () => {
    this.setState({
      final: true
    })
  }

  player = () => {
    const lines = this.state.lines
    const games = lines.length;

    return games + 1
  }

  addGame = (newLine) => {
    console.log("add game ", newLine.adj1)
    const lines = this.state.lines
    lines.push(newLine)

    this.setState({
      lines
    })
  }

  finalGame = () => {
    let poem = []
    const lines = this.state.lines
    lines.forEach(line => {
      poem.push('The ' + line.adj1 + ' ' + line.noun1 + ' ' + line.adv + ' ' + line.verb + ' the ' + line.adj2 + ' ' + line.noun2 + '.')
    });
    return poem
  }


  render() {

    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    return (
      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">
          { exampleFormat }
        </p>
        
        {this.state.final ? null :
        <div>
        {this.state.lines.length < 1 ? null: 
        <RecentSubmission lastSubmisionCallback={this.finalGame}/>
        }
        <PlayerSubmissionForm addGameCallback={this.addGame} player={this.player} />
        </div>
        }

        <FinalPoem finalPoemCallback={this.finalGame} onClickCallback={this.onClick} final={this.state.final}/>

      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

export default Game;
