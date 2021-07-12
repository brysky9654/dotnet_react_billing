import React from 'react';
import Spinner from '../Spinner/Spinner';

const Button = ({ loading, text }) => {
    return (
        <button className="btn btn-primary">
            { loading ? <Spinner /> : text }
        </button>
    );
}

export default Button;