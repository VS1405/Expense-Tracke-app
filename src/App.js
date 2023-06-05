import './App.css';
import { Routes, Route } from 'react-router-dom';

import Welcome from './Comp/Welcome/Welcome';
import AuthForm from './Comp/Login/Auth/AuthForm';
import ProfileUpdatePage from './Comp/ProfileUpdate.js/ProfileUpdatePage';

function App() {


  return (
    <Routes>
      <Route path='/' element={<AuthForm />} exact></Route>
      <Route path='/Welcome'
        element={<Welcome header='Welcome To Expense Tracker!!!'
          para='Your profile is incomplete'
        />}
      />

      <Route path='/Welcome/profilePageUpdate' element={<ProfileUpdatePage />}></Route>
    </Routes>
  );
}

export default App;
