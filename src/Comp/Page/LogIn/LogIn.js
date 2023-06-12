import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import classes from './LogIn.module.css'
import app from '../../../firebase';

const LogIn = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  
  const auth = getAuth(app);  // dont forget to call app inside the getAuth otherwise it show error;


  const logInHandler = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if(user.emailVerified){
          setMessage('Login Successful')
        }
        else{
          setMessage('Please verify your email to log in.')
        }
        navigate('/Welcome')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode)
      });


  };

  return (
    <section>
    <form onSubmit={logInHandler} className={classes.container}>
      <div className={classes.control}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={classes.control}>
        <label htmlFor='password'>Your Password</label>
        <input
          type='password'
          id='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={classes.actions}>
        <button className={classes.button}>Login</button>
      </div>
      <div className={classes.createAcc}>
        <p>Don't have an account</p>
        <p>
          <Link to={'/SignUp'} className={classes.link}>Sign Up</Link>
        </p>
      </div>
    </form>
      <p>{message}</p>
      </section>
  );
};

export default LogIn;
