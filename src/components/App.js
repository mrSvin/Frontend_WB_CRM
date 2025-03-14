import React from 'react';
import Header from './Header';
import NotificationForm from './NotificationForm';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./Navbar";
import Table from "./Table";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Navbar/>
                <Routes>
                    <Route path={`/`} element={<NotificationForm/>}/>
                    <Route path={`/sent_messages`} element={<Table/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;