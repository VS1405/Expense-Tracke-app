import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import app from '../../firebase'

import { useDispatch, useSelector } from 'react-redux';
import { themeReducer } from '../../store/themeSlice';


import classes from './UserDetails.module.css'
import Welcome from '../Welcome/Welcome'
import DailyExp from './DailyExp';

const UserDetail = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth(app);

  // const [theme, setTheme] = useState('light-theme')
  const darkMode = useSelector(state => state.theme.darkMode)

  const logOutHandler = () => {

    signOut(auth).then(() => {
      // Log Out successsful 
      localStorage.removeItem('localId')
      navigate('/');
      // alert('Log Out successfully')
    })
      .catch((error) => {
    
        console.log('Log out Error', error)
      })
  };
  const lightTheme  = {
    backgroundColor: 'white',
    color: 'black'
  }
  const darkTheme = {
    backgroundColor: 'black',
    color: 'white'
  }

  const toggleThemeHandler = () => {
   dispatch(themeReducer.toggleTheme())
  };

  return (
    <Fragment>
      <div style={darkMode? darkTheme : lightTheme} className={classes.Con}>
        <section>
          <Welcome header='Welcome To Expense Tracker!!!' para='Your profile is incomplete'/>
          <div className={classes.logOut}>
            <button onClick={logOutHandler} >Log Out</button>

            <button onClick={toggleThemeHandler} className={classes.darkColor}>Dark Theme</button>
          </div>
        </section>
        <section className={classes.DailyExpenses}>
          <DailyExp />
        </section>

      </div>
    </Fragment>
  )
};


export default UserDetail;
