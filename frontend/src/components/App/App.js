import AuthProvider from "../../contexts/AuthContext";
import Signup from "../Auth/Signup/Signup";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "../../containers/Home/Home";
import Login from "../Auth/Login/Login";
import PrivateRoute from "../Auth/PrivateRoute";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import UpdateProfile from "../Auth/UpdateProfile/UpdateProfile";

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
