import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import './PageTemplate.css';

function Header() {
    return (
        <div className="Header" id="header">
            <FaLeaf aria-label="Project Perennial Icon"/>
            Header
        </div>
    );
}

export default Header;