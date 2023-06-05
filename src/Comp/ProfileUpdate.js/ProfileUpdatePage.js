import React , {useRef,  useState, Fragment, useContext} from 'react';
import classes from './ProfileUpdatePage.module.css';
import axios from 'axios'

import Welcome from '../Welcome/Welcome';
import AuthContect from '../Login/store/auth-context';

const ProfileUpdatePage = () => {

const AuthCtx = useContext(AuthContect)
 const [name, setName] =   useState('')
 const [profileUrl, setProfileUrl] =   useState('')

   const nameRef = useRef('');
   const profileUrfRef = useRef('');

   const submitHandler = (e) =>{
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUrl = profileUrfRef.current.value;
    console.log(enteredName + " " + enteredUrl)

    axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyABurclSGsl2V7_fg6o1LjbqWTHge3w4yA',
      {
        idToken: AuthCtx.token,
        displayName: enteredName,
        photoUrl: enteredUrl,
        returnSecureToken: false
      }
    )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error + ' something went wrong');
      });
    
   }

  return (
    <Fragment>
      <Welcome  header='Winners never quite, Quitters never win' para='Your profile is 64% completed' /> 
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.container}>
        <div className={classes.header}>
            <header>Contact Details</header>
            <button >Cancel</button>
        </div>
        <div className={classes.inputDetails}>
          <div className={classes.row}>
            <label>Full Name</label>
            <input type='text' ref={nameRef}  onChange={e => setName(e.target.value)}/>

          </div>
          <div className={classes.row}>
            <label>Profile photo Url</label>
            <input type='text' name='profileUrl' ref={profileUrfRef} onChange={e => setProfileUrl( e.target.value)}/>
          </div>
        </div>
      </div>
      <button type='submit' className={classes.button}>Update</button>
    </form>
    </Fragment>
  )
}

export default ProfileUpdatePage
