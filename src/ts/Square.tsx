import React from 'react';

import '../css/Square.css';
import { ValueType } from './Game';

interface SquareProps {
    value: ValueType;
    onClick(): void;
    win: boolean;
}

const Square: React.FC<SquareProps> = (props) => {
    const className = "square" + (props.win ? ' win' : '');

    return (
        <button className={className}
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;