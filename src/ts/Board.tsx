import React from 'react';
import Square, {ValueType, getNextValue} from './Square';

import '../css/Board.css';

interface BoardProps {

}

interface BoardState {
    squares: Array<ValueType>;
    currentValue: ValueType;
}

export default class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            currentValue: 'X'
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

        if (squares[i]) {
            return;
        }

        squares[i] = this.state.currentValue;
        
        this.setState({squares: squares, currentValue: getNextValue(this.state.currentValue)});
    }

    render() {
        const status = 'Next player: ' + this.state.currentValue;

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
}