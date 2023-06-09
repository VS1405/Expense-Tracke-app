import React, { useRef, useState, Fragment, useContext, useEffect } from 'react';
import classes from './ProfileUpdatePage.module.css';
import axios from 'axios'

import Welcome from '../Welcome/Welcome';
import AuthContect from '../Login/store/auth-context';

const ProfileUpdatePage = () => {

  const AuthCtx = useContext(AuthContect);

  const [dataList, setDatalist] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // console.log(dataList)
  const nameRef = useRef();
  const profileUrlRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUrl = profileUrlRef.current.value;
    console.log(enteredName + ' ' + enteredUrl);

    const obj = {
      name: enteredName,
      photoUrl: enteredUrl,
    };

    try {
      if (selectedId) {
        await axios.put(`https://tracker-website-dbfd7-default-rtdb.firebaseio.com/users/${selectedId}.json`, obj);
        const updatedList = dataList.map((item) => {
          if (item.id === selectedId) {
            return { id: item.id, ...obj };
          }
          return item;
        });
        setDatalist(updatedList);
        setSelectedId(null);
      } else {
        const response = await axios.post('https://tracker-website-dbfd7-default-rtdb.firebaseio.com/users.json', obj);
        const data = response.data;
        const updatedList = [...dataList, { id: data.name, ...obj }];
        setDatalist(updatedList);
      }

      nameRef.current.value = '';
      profileUrlRef.current.value = '';
    } catch (error) {
      console.log(error);
      console.log('Something went wrong');
    }
  
  };

  const editHandler = (id) => {
    const selectedItem = dataList.find((item) => item.id === id);
    if (selectedItem) {
      nameRef.current.value = selectedItem.name;
      profileUrlRef.current.value = selectedItem.photoUrl;
      setSelectedId(id);
      deleteHandler(id)
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`https://tracker-website-dbfd7-default-rtdb.firebaseio.com/users/${id}.json`);
      const updatedList = dataList.filter((item) => item.id !== id);
      setDatalist(updatedList);
      setSelectedId(null);
    } catch (error) {
      console.log(error);
      console.log('Something went wrong');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tracker-website-dbfd7-default-rtdb.firebaseio.com/users.json');
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        const loadedData = [];
        for (const key in data) {
          loadedData.push({
            id: key,
            name: data[key].name,
            photoUrl: data[key].photoUrl,
          });
        }
        setDatalist(loadedData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  

  return (
    <Fragment>
      <Welcome header='Winners never quite, Quitters never win' para='Your profile is 64% completed' />
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.container}>
          <div className={classes.header}>
            <header>Contact Details</header>
            <button className={classes.btn}>Cancel</button>
          </div>
          <div className={classes.inputDetails}>
            <div className={classes.row}>
              <label>Full Name</label>
              <input type='text' ref={nameRef} />

            </div>
            <div className={classes.row}>
              <label>Profile photo Url</label>
              <input type='text' name='profileUrl' ref={profileUrlRef} />
            </div>
          </div>
        </div>
        <button type='submit' className={classes.button}>Update</button>
      </form>

      <div className={classes.lists}>
        <h2>List</h2>
        {dataList.map((item) => (
          <div key={item.id} className={classes.list}>
            <p>Name: {item.name}</p>
            <p>Photo Url: {item.photoUrl}</p>
            <button onClick={() => editHandler(item.id)} className={classes.BtnE}>Edit</button>
            <button onClick={() => deleteHandler(item.id)} className={classes.BtnD}>Delete</button>
          </div>
        ))}
      </div>
   
    </Fragment>
  )
}

export default ProfileUpdatePage
