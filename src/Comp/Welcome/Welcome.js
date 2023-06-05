import React from 'react'
import { Link } from 'react-router-dom';
import classes from './Welcome.module.css'

const Welcome = (props) => {
  return (
    <div className={classes.card} >
      <header>{props.header}</header>
      <p>{props.para} <Link to='/Welcome/profilePageUpdate' >Complete now</Link> </p>
    </div>
  )
};

export default Welcome
