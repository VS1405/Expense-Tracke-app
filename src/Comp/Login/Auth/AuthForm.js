import React, { useState, useContext, useRef } from 'react';
import classes from './AuthForm.module.css';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import AuthContect from '../store/auth-context';

const AuthForm = () => {

  const history = useNavigate()   // its used to render the new component page 

  const AuthCtx = useContext(AuthContect)

  const EmailInputRef = useRef()
  const PasswordInputRef = useRef()

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const clearCartItems = AuthCtx.clearCartItems;

  // const clearCartItems = () => {
  //   // Clear the cart items when a new user logs in
  //   AuthCtx.clearCartItems();
  // };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = EmailInputRef.current.value;
    const enteredPassword = PasswordInputRef.current.value;

    //  add validation
    setIsLoading(true)

    let url;
    try {
      if (isLogin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABurclSGsl2V7_fg6o1LjbqWTHge3w4yA'
      } else {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABurclSGsl2V7_fg6o1LjbqWTHge3w4yA'
      };
    } catch (error) {
      console.log(error)
    }
    // fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: enteredEmail,
    //     password: enteredPassword,
    //     returnSecureToken: true,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(response => {
    //     setIsLoding(false);
    //     if (response.ok) {
    //       console.log(response);
    //       return response.json()

    //     } else {
    //       return response.json().then((data) => {
    //         let errorMessage = 'Authentication failed!';
    //         // if(data && data.error && data.error.message){
    //         //   errorMassage= data.error.message
    //         // }
    //         throw new Error(errorMessage);
    //         // alert(errorMessage)
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     AuthCtx.login(data.idToken)
    //     clearCartItems(); // Call the clearCartItems function here
    //     history('/Welcome')    // after useNavigate we can change the page by using path of component
    //   })
    //   .catch((error) => {
    //     alert(error.message)
    //   });
    axios.post(url, {
      email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
    })
    .then((response) => {
      setIsLoading(false);
      if (response.status === 200) {
        console.log(response.data);
        console.log(response);
        console.log( "response data");
        return response.data;
      } else {
        throw new Error('Authentication failed!');
      }
    })
    .then((data) => {
      AuthCtx.login(data.idToken);
      clearCartItems();
      history('/Welcome');
    })
    .catch((error) => {
      alert(error.message);
    });
    
  };



  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={EmailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={PasswordInputRef}

          />
        </div>

        <div className={classes.actions}>
          {!isLoading &&
            <button className={classes.button}>  {isLogin ? 'Login' : 'Create Account'}</button>
          }

          {isLoading && <p>Loading...</p>}
          {/* <div> */}

            <div className={classes.signUp} >
              {isLogin && <p>Don't have an account ? </p>}
              <button
                type='button'
                className={classes.toggle}
                onClick={switchAuthModeHandler}>
                {isLogin ? 'Sign Up' : 'Login with existing account'}
              </button>
            {/* </div> */}
          </div>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
