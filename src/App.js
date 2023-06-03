import './App.css';
import { Routes, Route } from 'react-router-dom';

import Welcome from './Comp/Welcome/Welcome';
import AuthForm from './Comp/Login/Auth/AuthForm';

function App() {


  return (
    <Routes>
      <Route path='/' element={<AuthForm />} exact></Route>
      <Route path='/Welcome' element={<Welcome />}></Route>
    </Routes>
  );
}

export default App;
