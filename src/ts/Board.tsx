import React from 'react';

import '../css/Board.css';
import { ValueType } from './Game';
import Square from './Square';

interface BoardProps {
    squares: Array<ValueType>;
    onClick(i: number): void,
    winnerLocation: number[] | undefined,
}

export default class Board extends React.Component<BoardProps> {
    renderSquare(i: number): JSX.Element {
        const win = this.props.winnerLocation ? this.props.winnerLocation.includes(i) : false;

        return (
            <Square key={i}
                    value={this.props.squares[i]}
                    win={win}
                    onClick={() => this.props.onClick(i)}/>
        );
    }

    renderARowOfSquares(startingFrom: number): JSX.Element[] {
        let row: JSX.Element[] = [];
        for (let i = 0; i < 3; i++) {
            row.push(this.renderSquare(startingFrom + i));
        }

        return row;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderARowOfSquares(0)}
                </div>
                <div className="board-row">
                    {this.renderARowOfSquares(3)}
                </div>
                <div className="board-row">
                    {this.renderARowOfSquares(6)}
                </div>
            </div>
        );
    }
}