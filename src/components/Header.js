import React from 'react';
import '../css/Header.css';

import {LogoImg} from "./Icons";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">
                    <LogoImg />
                </Link>
            </div>
        </header>
    );
};

export default Header;