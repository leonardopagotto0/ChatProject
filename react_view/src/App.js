import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import database from './lib/db';
import React from 'react';

import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateGrup from './pages/createGrup';

function App ()
{

    const db = database();
    db.open();

    return(
        <Router>
            <Routes>
                <Route path="/chat" element={<Chat db={db} />} />
                <Route path="/chat/create-grup" element={<CreateGrup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;