import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
            >
                Создание уведомления
            </NavLink>
            <NavLink
                to="/sent_messages"
                className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
            >
                Отправленные уведомления
            </NavLink>
        </nav>
    );
};

export default Navbar;
