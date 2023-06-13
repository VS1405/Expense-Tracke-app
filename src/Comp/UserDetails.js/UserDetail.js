import React, { Fragment, useEffect } from 'react'
import Welcome from '../Welcome/Welcome'
import { useNavigate } from 'react-router-dom'

import classes from './UserDetails.module.css'
import { getAuth, signOut } from 'firebase/auth'
import app from '../../firebase'

const UserDetail = () => {
  const navigate = useNavigate()
  const auth = getAuth(app);


  const logOutHandler = () => {

    signOut(auth).then(() => {
      // Log Out successsful 
      localStorage.removeItem('localId')
      navigate('/LogIn');
      // alert('Log Out successfully')
    })
      .catch((error) => {
        const errorCode = error.errorCode
        console.log('Log out Error' , error)
      })
  }

  return (
    <Fragment>
      <section className={classes.logOut}>
        <button onClick={logOutHandler}>Log Out</button>
      </section>
      <section>
        <Welcome header='Welcome To Expense Tracker!!!' para='Your profile is incomplete' />
      </section>

    </Fragment>
  )
}

export default UserDetail
