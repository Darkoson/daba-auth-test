import AuthProvider from "../../contexts/AuthContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "../Auth/PrivateRoute";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";

import Signup from "../../pages/Signup/Signup";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import UpdateProfile from "../../pages/UpdateProfile/UpdateProfile";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider >
				<Switch>
					<PrivateRoute exact path="/" component={Home} />
					<PrivateRoute path="/update-profile" component={UpdateProfile} />
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Login} />
					<Route path="/forgot-password" component={ForgotPassword} />
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
