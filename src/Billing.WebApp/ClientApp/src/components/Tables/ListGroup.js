import React from 'react';

const ListGroup = ({ items, selectedItem, keyProp, textProp, onItemSelect }) => {
    const classes = "list-group-item list-group-item-action";
    return (
        <ul className="list-group">
            {items.map(item => (
                <li
                    onClick={() => onItemSelect(item)}
                    key={item[keyProp]}
                    className={selectedItem && item === selectedItem ? classes + " active" : classes}
                >
                    {item[textProp]
                }</li>
            ))}
        </ul> 
    );
}

ListGroup.defaultProps = {
    textProp: 'name',
    keyProp: 'id'
}

export default ListGroup;