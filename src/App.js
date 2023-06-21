import './App.css';
import React, { useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import {darkMode} from './store/themeSlice'

import ProfileUpdatePage from './Comp/ProfileUpdate.js/ProfileUpdatePage';
import SignUp from './Comp/Page/SignUp/SignUp';
import ForgotPassword from './Comp/Page/ForgetPassword/ForgetPassword';

function App() {

 const darkMode= useSelector(state => state.darkMode)

  const MainPage = React.lazy(() => import('./Comp/Page/MainPage'));
  const LogIn = React.lazy(() => import('./Comp/Page/LogIn/LogIn'));
  const UserDetail = React.lazy(() => import('./Comp/UserDetails.js/UserDetail'));


  return (
    <Suspense fallback={<p className='suspencePara'>Please wait I'm Loading</p>}>
      <div className= 'light-theme'>
        <Router>
          <Routes>
            {/* <Route path='/' element={<MainPage />} exact></Route> */}
            <Route path='/' element={<LogIn />} exact />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/LogIn/ForgetPassword' element={<ForgotPassword />} />
            <Route path='/Welcome' element={<UserDetail />} />
            <Route path='/Welcome/profilePageUpdate' element={<ProfileUpdatePage />}></Route>
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;



