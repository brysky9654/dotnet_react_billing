import React from 'react';
import Spinner from '../Spinner/Spinner';

const Button = ({ loading, text, name, styles }) => {
    return (
        <button name={name} className={styles}>
            { loading ? <Spinner /> : text }
        </button>
    );
}


Button.defaultProps = {
    name: 'button',
    styles: 'btn btn-primary'
}

export default Button;