import React from 'react';
import Square, {ValueType, getNextValue} from './Square';

import '../css/Board.css';

interface BoardProps {

}

interface BoardState {
    squares: Array<ValueType>;
    currentValue: ValueType;
    winner: ValueType;
}

export default class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            currentValue: 'X',
            winner: null
        };
    }

    renderSquare(i: number) {
        return (
            <Square value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}/>
        );
    }

    handleClick(i: number): void {
        const squares = this.state.squares.slice();

        if (squares[i] || this.state.winner) {
            return;
        }

        squares[i] = this.state.currentValue;

        const winner: ValueType = this.calculateWinner(squares);
        if (winner) {
            this.setState({winner: winner});
        }

        
        this.setState({squares: squares, currentValue: getNextValue(this.state.currentValue)});
    }

    render() {
        let status;

        if (this.state.winner) {
            status = 'Winner is: ' + this.state.winner;
        } else {
            status = 'Next player: ' + this.state.currentValue;
        }

        return (
            <div>
                <div className="status">
                    {status}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    private calculateWinner(squares: Array<ValueType>): ValueType {
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
            return squares[a];
          }
        }
        return null;
      }
}