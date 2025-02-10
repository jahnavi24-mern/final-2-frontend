import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard'
import Form from './pages/Form/Form'


function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/form/:folderId" element={<Form />} />
            </Routes>
        </Router>
    )
}

export default App;