import React from 'react';
import '../css/Header.css';

import {LogoImg} from "./Icons";

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <LogoImg />
            </div>
        </header>
    );
};

export default Header;