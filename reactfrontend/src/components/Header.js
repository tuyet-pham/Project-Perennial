import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import './PageTemplate.css';

function Header(props) {
    const header_text = headerify(props.location.pathname);
    return (
        <div className="Header" id="header">
            <a className="header-circle">
                <FaLeaf className="header-icon" aria-label="Project Perennial Icon"/>
            </a>
            {header_text}
        </div>
    );
}

/* Turn path into text for the header */
function headerify(path) {
    if(path === '/home') {
        return "Home"
    }
    if(path === '/monitor') {
        return "Monitor"
    }
    if(path === '/add-plant') {
        return "Add a Plant"
    }
    if(path === '/options') {
        return "Options"
    }

    return "Project Perennial"
}

export default Header;