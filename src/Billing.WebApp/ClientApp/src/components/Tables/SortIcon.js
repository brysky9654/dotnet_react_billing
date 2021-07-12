import React from 'react';

const SortIcon = ({ ascending }) => {    
    return (
        <svg className="sort-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        { ascending
            ? <path d="M12 3.202l3.839 4.798h-7.678l3.839-4.798zm0-3.202l-8 10h16l-8-10zm8 14h-16l8 10 8-10z"/>
            : <path d="M12 0l-8 10h16l-8-10zm3.839 16l-3.839 4.798-3.839-4.798h7.678zm4.161-2h-16l8 10 8-10z"/>
        }
        </svg>
        
    );
}

export default SortIcon;