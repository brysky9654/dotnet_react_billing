import React from 'react';

const SearchBox = ({ value, placeholder, onChange }) => {
    return (
        <input
            type="text"
            name="query"
            className="form-control my-3"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
        /> 
    );
}

SearchBox.defaultProps = {
    placeholder: 'Search...'
}


export default SearchBox;