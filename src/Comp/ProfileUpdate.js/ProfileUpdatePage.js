import React , {useRef,  useState, Fragment, useContext, useEffect} from 'react';
import classes from './ProfileUpdatePage.module.css';
import axios from 'axios'

import Welcome from '../Welcome/Welcome';
import AuthContect from '../Login/store/auth-context';

const ProfileUpdatePage = () => {

const AuthCtx = useContext(AuthContect);

const [dataList, setDatalist] = useState([])

   const nameRef = useRef();
   const profileUrfRef = useRef();

   const submitHandler = (e) =>{
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUrl = profileUrfRef.current.value;
    console.log(enteredName + " " + enteredUrl)

    axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyABurclSGsl2V7_fg6o1LjbqWTHge3w4yA',
      {
        idToken: AuthCtx.token,
        displayName: enteredName,
        photoUrl: enteredUrl,
        returnSecureToken: false
      }
    )
      .then(response => {
        console.log(response.data);
        fetchDataList();
      })
      .catch(error => {
        console.log(error);
        console.log('something went wrong')
      });
    
   }

   useEffect(()=>{
    fetchDataList()
   }, []);

   const fetchDataList = ()=>{
       // Fetch the list of data from the server
    axios.get('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyABurclSGsl2V7_fg6o1LjbqWTHge3w4yA')
    .then((resp)=>{
      console.log(resp.data);
      setDatalist(resp.data);   // Update the dataList state with the retrieved data
      console.log('fetch responce data');
    })
    .catch((error) => {
      console.log(error.message)
      console.log(error.name);
      console.log(error.code);
      console.log('error in fetching data');
    })
   }

  return (
    <Fragment>
      <Welcome  header='Winners never quite, Quitters never win' para='Your profile is 64% completed' /> 
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.container}>
        <div className={classes.header}>
            <header>Contact Details</header>
            <button className={classes.btn}>Cancel</button>
        </div>
        <div className={classes.inputDetails}>
          <div className={classes.row}>
            <label>Full Name</label>
            <input type='text' ref={nameRef}  />

          </div>
          <div className={classes.row}>
            <label>Profile photo Url</label>
            <input type='text' name='profileUrl' ref={profileUrfRef} />
          </div>
        </div>
      </div>
      <button type='submit' className={classes.button}>Update</button>
    </form>

<div className={classes.list}>
  <h2>List</h2>
    <ul>
      {dataList.map((item)=>{
        <li key={item.idToken}>{item.name}</li>
      })}
    </ul>
</div>
    </Fragment>
  )
}

export default ProfileUpdatePage
