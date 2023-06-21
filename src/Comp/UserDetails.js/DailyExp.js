import React, { Fragment, useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import app from '../../firebase';
import classes from './DailyExp.module.css';
import {expenseAction} from '../../store/expensesSlice';


const DailyExp = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const expense = useSelector((state) => state.expenses.expenses);
  const showPremiumButton = useSelector((state) => state.expenses.showPremiumButton);

  const navigate = useNavigate();
  const auth = getAuth(app);

  const [money, setMoney] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);
  const [selectedId, setSelectedId] = useState(null); 
  const [activePremium, setActivePremiun] = useState (false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      money: parseFloat(money),
      description: description,
      category: category,
    };

    dispatch(expenseAction.addExpense(expense));

    
    if (selectedId) {
      fetch(`https://tracker-website-dbfd7-default-rtdb.firebaseio.com/expenses/${selectedId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(expense)
        })
      const updatedExp = expenses.map(Exp => {
        if (Exp.id === selectedId) {
          return { id: Exp.id, ...expense }
        }
        return Exp;
      })
      setExpenses(updatedExp);
      setSelectedId(null);
    }
    else {

      fetch('https://tracker-website-dbfd7-default-rtdb.firebaseio.com/expenses.json', {
        method: 'POST',
        body: JSON.stringify(expense),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setExpenses([...expenses, { ...expense, id: data.name }]);
        })
        .catch((error) => console.log(error));
    }
    setMoney('');
    setDescription('');
    setCategory('');
  };

  const editHandler = (id) => {
    const updatedExp = expenses.find((exp) => exp.id === id);
    if (updatedExp) {
      setMoney(updatedExp.money);
      setDescription(updatedExp.description);
      setCategory(updatedExp.category);
      setSelectedId(id);
    }
  };

  const deleteHandler = (id) => {
    fetch(`https://tracker-website-dbfd7-default-rtdb.firebaseio.com/expenses/${id}.json`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setExpenses(expenses.filter((expense) => expense.id !== id));
          // dispatch(expenseAction.deleteExpense(id)); // Dispatch the deleteExpense action
        } else {
          throw new Error('Error in Deleting Expenses');
        }
      })
      .catch((error) => console.log('Error', error));
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          'https://tracker-website-dbfd7-default-rtdb.firebaseio.com/expenses.json'
        );
        if (!response.ok) {
          throw new Error('Something went wrong in API');
        }
        const data = await response.json();

        const fetchedExpenses = [];
        for (let key in data) {
          fetchedExpenses.push({ ...data[key], id: key });
        }
                setExpenses(fetchedExpenses);
        // dispatch(expenseAction.setExpenses(fetchedExpenses)); // Dispatch the setExpenses action
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
  }, []);
const activeHandler = ()=>{
 setActivePremiun(true) 
}

const handleExportExpenses = () => {
  // Get the expenses data from the state
  const Link = document.getElementById('link')

  // Convert expenses to CSV format
  const csvData = expense.map((expense) => {
    return Object.values(expense).join(',');
  });
console.log(csvData)
  // Generate a CSV file
  const csvContent = csvData.join('\n');

  // Create a Blob object from the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'expenses.csv');
  document.body.appendChild(link);
// console.log(link)
  // Simulate a click on the link to trigger the download
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


  return (
        <Fragment>
          <section className={classes.section}>
            <div className={classes.Expenses}>
              <h3>Daily Expenses</h3>
            </div>
            <div>
              <form onSubmit={handleSubmit} className={classes.dailyform}>
                <label>Money:</label>
                <input type="text" value={money} onChange={(e) => setMoney(e.target.value)} required />
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
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
                      <button className={classes.editBtn} onClick={() => editHandler(expense.id)}>Edit</button>
                      <button className={classes.deleteBtn} onClick={() => deleteHandler(expense.id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
              {showPremiumButton && <button onClick={activeHandler} className={classes.premiumBtn}>Activate Premium</button>}
            <button onClick={handleExportExpenses}>Download File</button>
            </div>
          </section>
        </Fragment>
      );

};

export default DailyExp;
