import React, {Fragment, useEffect} from 'react'
import Welcome from '../Welcome/Welcome'
import { useNavigate } from 'react-router-dom'

import classes from './UserDetails.module.css'

const UserDetail = () => {
  const navigate = useNavigate()

  const logOutHandler =()=>{
    navigate('/LogIn')
  }

  return (
    <Fragment>
      <section className={classes.logOut}>
        <button onClick={logOutHandler}>LogOut</button>

      </section>
      <section>
      <Welcome header='Welcome To Expense Tracker!!!' para='Your profile is incomplete' />

      </section>
      
    </Fragment>
  )
}

export default UserDetail
