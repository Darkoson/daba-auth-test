import React, { useContext, useEffect, createContext, useState } from "react";

const authService = require('../services/auth-serice')

const LOCAL_USER_KEY = 'local-user';

// create a context
const AuthContext = createContext();

// use the context
export const useAuth = () => useContext(AuthContext);



// AuthProvider Component
const AuthProvider = ({ children }) => {
  
  // setting state
  const [currentUser, setCurrentUser] = useState();
  //const [loading, setLoading] = useState(false);


  const getCurrentUser = ()=>{
    let user = currentUser;
    if(!user){
      const jsonUser = localStorage.getItem(LOCAL_USER_KEY)
      user = (jsonUser)? JSON.parse(jsonUser):null
    }
    return user
  }

  const updateCurrentUser  = (user) =>{
  
    // case the user is not null, we are updating the current User with the new details
    if(user){
       // we are saving the user on the local storage
       localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user))
    }
    // case the user is null, we are removing the current user details from local storage
    else{
      localStorage.removeItem(LOCAL_USER_KEY)
    }
  
    setCurrentUser(user)
  }

  // registration function
  const signup = (user) => {
    // calling of the service for signup
    return authService.signup(user)
  };

  // login function
  const signin = async (email, password) => {
    let result = {success:false, data:null}

    const authData = await authService.signin(email, password);
    // case the login is not successful
			if(authData.errors && authData.errors[0]){
        result.data = authData.errors[0]
			}
      // case the user exist
			else if(authData.data.login){
				const user = authData.data.login
        updateCurrentUser(user)
        result.success = true
        result.data = user
			}

      return result; 
  };

  //logout function
  const signout = () => {
    // we are removing the user details from the local storage and from the state
    updateCurrentUser(null)
    
  };

 

  // object of current user
  const value = {
    getCurrentUser,
    signup,
    signin,
    signout
  };

  //AuthProvider component return
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
