import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout';
import LoginForm from './components/Account/LoginForm';
import Logout from './components/Account/Logout';
import RegistrationForm from './components/Account/RegistrationForm';

import './custom.css'

export default () => (
    <>
        <Layout>
                <Routes>
                    <Route exact path='/' element={<Navigate to="/login"/>}/>
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/register' element={<RegistrationForm />} />
                    <Route path='/view' element={<RegistrationForm />} />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
        </Layout>
    </>
);