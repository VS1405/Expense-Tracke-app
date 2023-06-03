import React, { useState } from 'react'

const AuthContect = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
    clearCartItems: () => {},
})

export const AuthContextProvider = (props) => {

    const initiliazeToken = localStorage.getItem('token')
    const [token, setToken] = useState(initiliazeToken)

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logoutHandler = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    const clearCartItems = () => {
        // Implement your logic to clear cart items here
        //you can update the cart items in the local storage
        localStorage.removeItem('token');
      };
    

    const ContextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        clearCartItems: clearCartItems,
    }

    return <AuthContect.Provider value={ContextValue}>
        {props.children}
    </AuthContect.Provider>
}

export default AuthContect;