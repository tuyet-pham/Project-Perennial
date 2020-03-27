import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import './PageTemplate.css';

function Header(props) {

    return (
        <div className="Header" id="header">
            <a className="header-circle">
                <FaLeaf className="header-icon" aria-label="Project Perennial Icon"/>
            </a>
            { props.pageName }
        </div>
    );
}

export default Header;