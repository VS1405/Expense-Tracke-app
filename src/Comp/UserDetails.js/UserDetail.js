import React, { Fragment} from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import app from '../../firebase'

import classes from './UserDetails.module.css'
import Welcome from '../Welcome/Welcome'
import DailyExp from './DailyExp'

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
        console.log('Log out Error', error)
      })
  };
 


  return (
    <Fragment>
      <section>
        <Welcome header='Welcome To Expense Tracker!!!' para='Your profile is incomplete' />
        <div className={classes.logOut}>
          <button onClick={logOutHandler}>Log Out</button>
        </div>
      </section>
      <section>
        <DailyExp />
      </section>


    </Fragment>
  )
};


export default UserDetail;
