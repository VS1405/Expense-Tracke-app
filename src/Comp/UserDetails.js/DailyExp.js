import React, { Fragment, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import classes from './DailyExp.module.css'
import { getAuth, signOut } from 'firebase/auth'
import app from '../../firebase'

const DailyExp = () => {

  const navigate = useNavigate();
  const auth = getAuth(app);

  const [money, setMoney] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);


  const handleSubmit = (e) => {

    e.preventDefault();

    const expense = {
      money: money,
      description: description,
      category: category,
    };

    fetch('https://tracker-website-dbfd7-default-rtdb.firebaseio.com/expenses.json', {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setExpenses([...expenses, {...data, id: data.name}]);
       console.log(data);
      })
      //  alert('successful response')
      .catch(error => console.log(error));

    // setExpenses([expense]);

    setMoney('');
    setDescription('');
    setCategory('');
  };

  const editHandler = (id) => {
  };


  const deleteHandler = (id) => {
    fetch(`https://tracker-website-dbfd7-default-rtdb.firebaseio.com/expenses/${id}.json`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setExpenses(expenses.filter((expense => expense.id !== id)))
      } else {
        throw new Error('Error in Deleting Expenses')
      }
    })
      .catch(error => console.log('Error', error))
  };
// Get all data from backend api
  useEffect(() => {
  const fetchExpenses = async () => {
    const response = await fetch('https://tracker-website-dbfd7-default-rtdb.firebaseio.com/expenses.json')

    if (!response.ok) {
      throw new Error('Something went wrong in api')
    }
    const data = await response.json();

    const fetchedExpenses = [];
    
    for (let key in data) {
      fetchedExpenses.push({ ...data[key], id: key });
    }
    setExpenses(fetchedExpenses);
  } 

    fetchExpenses();

  }, []);


  return (
    <Fragment>
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
            <ul>
              {expenses.map((expense) => (
                <li key={expense.id}>
                  Money: {expense.money}, Description: {expense.description}, Category: {expense.category}
                  <button onClick={() => editHandler(expense.id)}>Edit</button>
                  <button onClick={() => deleteHandler(expense.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Fragment>
  )
};


export default DailyExp;
