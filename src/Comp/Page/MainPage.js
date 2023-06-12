import React from 'react'
import { Link } from 'react-router-dom';
import classes from './MainPage.module.css'

const MainPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.link}>
        <Link to={'/LogIn'}>LogIn</Link>
      </div>
      <div className={classes.link}>
        <Link to={'/SignUp'}>SignUp</Link>
      </div>
    </div>
  )
}

export default MainPage
