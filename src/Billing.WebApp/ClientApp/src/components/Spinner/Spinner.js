import React from 'react';

const Spinner = ({ text, showText }) => (
    <span className="spinner-wrapper">
        <svg className="spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45"/>
        </svg> { showText ? text : null }
    </span>
);

Spinner.defaultProps = {
    text: 'Loading',
    showText: true
}

export default Spinner;