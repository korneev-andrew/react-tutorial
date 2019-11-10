import React from 'react';

import '../css/Square.css';

interface SquareProps {
    value?: string | number;
}

const Square: React.FC<SquareProps> = (props: SquareProps) => {
    return (
        <button className="square">
            {props.value}
        </button>
    );
}

export default Square;