import React, { useState, useEffect } from 'react'

let logoutTimer;


const AuthContect = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
})


const calculateRemainingTime = (exparationTime) => {
    const currentTime = new Date().getTime() // getTiime will give time in milisecond, its a current/present time
    const adjustExparationTime = new Date(exparationTime).getTime()  // this time will be in future 
    const remainingDuration = adjustExparationTime - currentTime;
    return remainingDuration;
}

// if token is valid or not check by  using new helper variable

const retriveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationTime);
    // 1min = 3600millisecond 
    if (remainingTime <= 3600) {

        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null;
    }
    // if the token is valid
    return {
        token: storedToken,
        duration: remainingTime
    }
}

export const AuthContextProvider = (props) => {

    const tokenData = retriveStoredToken();

    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;

    }

    const [token, setToken] = useState(initialToken)

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        setToken(null)

        // if logout time is over after that we clear the timer
        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }

    }

    // Adding time on login handler and created constant variable calculatingRemainingTime outside of the function
    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime)

        const remainingtime = calculateRemainingTime(expirationTime);

        // setTimer which is used after time is over user get logOut automatically
        logoutTimer = setTimeout(logoutHandler, remainingtime)
    }

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration)
            logoutTimer = setTimeout(logoutHandler, tokenData.duration)
        }
    }, [tokenData]);


    const ContextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContect.Provider value={ContextValue}>
        {props.children}
    </AuthContect.Provider>
}

export default AuthContect;