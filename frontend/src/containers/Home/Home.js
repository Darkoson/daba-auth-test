import React, { useState } from "react";
import { Alert, Button, Card, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import CustomNav from "../../components/CustomNav/CustomNav";
import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";
import UserImage from "../../assets/logo-auth.PNG";
const Home = () => {
	// state
	const [error, setError] = useState("");

	// redirect
	const history = useHistory();

	// get current user
	const { currentUser, logout } = useAuth();
	// handling log out
	const logoutHandler = async () => {
		setError("");

		try {
			await logout();
			history.push("/login");
		} catch (error) {
			setError("Could Not Log You Out! Please Try Again.");
		}
	};

	return (
		<>
			<CustomNav />
			<Container className="app_wrap">
				<div className="home-title">
					<h2 className="text-center md-4">Personal info</h2>
					<p>Basic info, like your name and photo</p>
					{error && <Alert variant="danger">{error}</Alert>}
				</div>
				<div className="w-100 signup_wrap">
					<Card className="home-card">
						{/* <Card.Body> */}
						<div className="profile_header">
							<div className="profile_title">
								<h2>Profile</h2>
								<p>Some info may be visible to other people</p>
							</div>
							<Link to="update-profile" className="ui basic button">
								Edit
							</Link>
						</div>
						<div className="profile_content">
							<div className="profile_label">
								<p>PHOTO</p>
							</div>
							<div className="profile_info">
								<img src={UserImage} alt="User Image" />
							</div>
						</div>
						<div className="profile_content">
							<div className="profile_label">
								<p>name</p>
							</div>
							<div className="profile_info">
								<p>Xanthe Neal</p>
							</div>
						</div>
						<div className="profile_content">
							<div className="profile_label">
								<p>bio</p>
							</div>
							<div className="profile_info">
								<p>
									I am a software developer and a big fan of devchallenges...
								</p>
							</div>
						</div>
						<div className="profile_content">
							<div className="profile_label">
								<p>phone</p>
							</div>
							<div className="profile_info">
								<p>908249274292</p>
							</div>
						</div>
						<div className="profile_content">
							<div className="profile_label">
								<p>email</p>
							</div>
							<div className="profile_info">
								<p>xanthe.neal@gmail.com</p>
							</div>
						</div>
						<div className="profile_content last">
							<div className="profile_label">
								<p>password</p>
							</div>
							<div className="profile_info">
								<p>***********</p>
							</div>
						</div>
						{/* </Card.Body> */}
					</Card>
					<div className="w-100 text-center mt-2 createdby">
						<p>
							created by <Link to="/signup">username</Link>
						</p>
						<p>devChallenges.io</p>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Home;
