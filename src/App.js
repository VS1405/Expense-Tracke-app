import './App.css';
import React, {useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProfileUpdatePage from './Comp/ProfileUpdate.js/ProfileUpdatePage';
import UserDetail from './Comp/UserDetails.js/UserDetail';
import SignUp from './Comp/Page/SignUp/SignUp';
import LogIn from './Comp/Page/LogIn/LogIn';

function App() {

  const MainPage = React.lazy(()=> import('./Comp/Page/MainPage'));

  return (
    <Suspense fallback={<p className='suspencePara'>Please wait I'm Loading</p>}>
      <Router>

      <Routes>
      <Route path='/' element={<MainPage />} exact></Route>
      <Route path='/LogIn' element={<LogIn />}/>
      <Route path='/SignUp' element={<SignUp />}/>
      <Route path='/Welcome' element={<UserDetail />} />
      <Route path='/Welcome/profilePageUpdate' element={<ProfileUpdatePage />}></Route>
    </Routes>
      </Router>
    
    </Suspense>
  );
}

export default App;



