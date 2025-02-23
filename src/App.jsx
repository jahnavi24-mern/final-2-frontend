import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard'
import Form from './pages/Form/Form'
import SharedForm from './pages/SharedForm/SharedForm';


function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/form" element={<Form />} />
                <Route path="/form/:folderId" element={<Form />} />
                <Route path="/shared-form/:formId" element={<SharedForm />} />
            </Routes>
        </Router>
    )
}

export default App;