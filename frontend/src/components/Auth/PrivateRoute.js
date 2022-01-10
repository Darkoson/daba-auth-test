import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // get current user
  const { getCurrentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return getCurrentUser() ? 
        (<Component {...props} />) : (<Redirect to="/login" />);
      }}
    ></Route>
  );
};

export default PrivateRoute;
