import React from 'react'
import { Link } from 'react-router-dom';
import classes from './Welcome.module.css'

const Welcome = (props) => {
  return (
    <section>
      <div className={classes.card} >
      <header>{props.header}</header>
      <p>{props.para} <Link to='/Welcome/profilePageUpdate' >Complete now</Link> </p>
    </div>
    </section>
  )
};

export default Welcome
