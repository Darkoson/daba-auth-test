import React, { useContext,  createContext, useState } from "react";

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
  
    setCurrentUser(user)
    // case the user is not null, we are updating the current User with the new details
    if(user){
       // we are saving the user on the local storage
       localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user))
    }
    // case the user is null, we are removing the current user details from local storage
    else{
      localStorage.removeItem(LOCAL_USER_KEY)
    }
  }

  // registration function
  const signup = async (email, password) => {
    let result = {success:false, data:null}
    // calling of the service for signup
    const response = await authService.signup(email, password)
    // case the registration is not successful
			if(response.errors){
        result.data = response.errors[0].message
			}
      // case the registration is successful
			else if(response.data.register){
        result.success = true
        result.data = response.data.register
			}

      return result; 
  };

  // login function
  const signin = async (email, password) => {
    let result = {success:false, data:null}

    const response = await authService.signin(email, password);
    // case the login is not successful
			if(response.errors){
        result.data = response.errors[0].message
			}
      // case the user exist
			else if(response.data.login){
				const user = response.data.login
        updateCurrentUser(user)
        result.success = true
        result.data = user
			}

      return result; 
  };

  // updateProfile function
  const updateProfile = async (formData) => {
    let result = {success:false, data:null}

    const response = await authService.updateProfile(formData);
    // case the login is not successful
			if(response.errors){
        result.data = response.errors[0].message
			}
      // case the user is update successfully
			else if(response.data.updateUser){
				const user = response.data.updateUser
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
    signout,
    updateProfile,
  };

  //AuthProvider component return
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
