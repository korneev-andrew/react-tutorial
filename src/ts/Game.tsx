import React from 'react';
import Board from './Board';

import '../css/Game.css';

export type ValueType = 'X' | 'O' | null;

interface GameProps {}

interface GameState {
  history: Array<Array<ValueType>>,
  currentPlayer: ValueType,
  winner: WinnerAndLocation,
  move: number,
}

interface WinnerAndLocation {
  winner?: ValueType,
  location?: number[],
}

export default class Game extends React.Component<GameProps, GameState> {

  constructor(props: GameProps) {
    super(props);

    this.state = {
        history: new Array(Array<ValueType>(9).fill(null)),
        currentPlayer: 'X',
        winner: {},
        move: 0,
    };
  }

  handleClick(i: number): void {
    const history = this.state.history.slice(0, this.state.move + 1);
    const currentSquares = history[history.length - 1];
    const squares = currentSquares.slice();

    if (squares[i] || this.state.winner.winner) {
        return;
    }

    squares[i] = this.state.currentPlayer;

    const winnerAndLocation: WinnerAndLocation = this.calculateWinner(squares);
    if (winnerAndLocation.winner) {
        this.setState({winner: winnerAndLocation});
    }

    this.setState({
      history: history.concat([squares]),
      currentPlayer: this.getNextPlayer(this.state.currentPlayer),
      move: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const currentSquares = history[this.state.move];

    let status;
    if (this.state.winner.winner) {
        status = 'Winner is: ' + this.state.winner.winner;
    } else if (this.state.move === currentSquares.length) {
        status = 'It\'s a draw';
    } else {
        status = 'Next player: ' + this.state.currentPlayer;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares}
                 winnerLocation={this.state.winner.location}
                 onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{this.renderMoves(history)}</ol>
        </div>
      </div>
    );
  }

  private calculateWinner(squares: Array<ValueType>): WinnerAndLocation {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          location: lines[i]
        };
      }
    }
    return {};
  }

  private renderMoves(history: Array<Array<ValueType>>): JSX.Element[] {
    const moves = history.map((squares, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      return (
        <li key="{move}">
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return moves;
  }

  private jumpTo(move: number): void {
    this.setState({
                    move: move, 
                    currentPlayer: move % 2 === 0 ? 'X' : 'O',
                    winner: {},
                  });
  }

  private getNextPlayer(valueType: ValueType): ValueType {
    return valueType === 'X' ? 'O' : 'X'
  }
}
