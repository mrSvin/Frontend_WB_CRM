import React from 'react';
import Header from './Header';
import NotificationForm from './NotificationForm';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Table from "./Table";
import '../css/App.css';
import Menu from "./Menu";


function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path={`/`} element={<Menu/>}/>
                    <Route path={`/notification`} element={<NotificationForm/>}/>
                    <Route path={`/sent_messages`} element={<Table/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;