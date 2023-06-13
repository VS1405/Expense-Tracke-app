import React, { Fragment, useState } from 'react'
import Welcome from '../Welcome/Welcome'
import { useNavigate } from 'react-router-dom'

import classes from './UserDetails.module.css'
import { getAuth, signOut } from 'firebase/auth'
import app from '../../firebase'

const UserDetail = () => {
  const navigate = useNavigate()
  const auth = getAuth(app);
  const [money, setMoney] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);


    const handleSubmit = (e) => {
      e.preventDefault();
      const expense = {
        money,
        description,
        category,
      };
      setExpenses([...expenses, expense]);
      setMoney('');
      setDescription('');
      setCategory('');
    };


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
          <div className={classes.Expenses}>
            <p>Daily Expenses</p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className={classes.dailyform}>
              <label>
                Money:
              </label>
                <input type="text" value={money} onChange={e => setMoney(e.target.value)} />
              <label>
                Description:
              </label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
              <label>
                Category:</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Select category</option>
                  <option value="food">Food</option>
                  <option value="petrol">Petrol</option>
                  <option value="salary">Salary</option>
                </select>
              
              <button type="submit" className={classes.expBtn}>Submit</button>
            </form>
            <br />
            <div className={classes.listOfExpenses}>

            <h3>Expenses:</h3>
            <ul >
              {expenses.map((expense, index) => (
                <li key={index}>
                  Money: {expense.money}, Description: {expense.description}, Category: {expense.category}
                </li>
              ))}
            </ul>
            </div>
          </div>
        </section>

      </Fragment>
    )
  };


export default UserDetail;
