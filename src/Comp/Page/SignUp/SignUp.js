import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './SignUp.module.css'

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../../../firebase';

const SignUp = () => {

  const auth = getAuth(app);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const signUpHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);

        
        // sending email varification link
        sendEmailVerification(user)
        .then(()=>{
          console.log('Email verification link sent.')
        })
        .catch((error)=>{
          console.log(error.code);
          console.log('Error sending email verification link:', error);
        })
        // after log in successfully the page will render the new page by using navigate
        navigate('/')
        alert('Successful SignUp with new account')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode)
        // ..
      });
  };

  return (
    <section>
      <form onSubmit={signUpHandler} className={classes.container}>
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
          <button type='submit' className={classes.button}>Sign Up</button>
        </div>
        <div >
           <span ><Link to={'/'} className={classes.existAccountLink}>Login with existing account</Link></span>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
