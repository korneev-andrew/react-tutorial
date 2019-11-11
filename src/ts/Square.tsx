import React from 'react';

import '../css/Square.css';

export type ValueType = 'X' | 'O' | null;

interface SquareProps {
    value: ValueType;
    onClick(): void;
}

export function getNextValue(valueType: ValueType): ValueType {
    return valueType === 'X' ? 'O' : 'X'
} 

const Square: React.FC<SquareProps> = (props) => {
    return (
        <button className="square"
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;