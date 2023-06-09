import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, {useState, Suspense } from 'react'

import Welcome from './Comp/Welcome/Welcome';
import AuthForm from './Comp/Login/Auth/AuthForm';
import ProfileUpdatePage from './Comp/ProfileUpdate.js/ProfileUpdatePage';

function App() {

  const Welcome = React.lazy(()=> import('./Comp/Welcome/Welcome'));
  const AuthForm = React.lazy(()=> import('./Comp/Login/Auth/AuthForm'));

  return (
    <Suspense fallback={<p className='suspencePara'>Please wait I'm Loading</p>}>
    <Routes>
      <Route path='/' element={<AuthForm />} exact></Route>
      <Route path='/Welcome'
        element={<Welcome header='Welcome To Expense Tracker!!!'
          para='Your profile is incomplete'
        />}
      />

      <Route path='/Welcome/profilePageUpdate' element={<ProfileUpdatePage />}></Route>
    </Routes>
    </Suspense>
  );
}

export default App;
