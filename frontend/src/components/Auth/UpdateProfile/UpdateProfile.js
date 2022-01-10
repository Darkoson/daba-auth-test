import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import CustomNav from "../../CustomNav/CustomNav";
import "./UpdateProfile.css";
import UserImage from "../../../assets/logo-auth.PNG";

const UpdateProfile = (props) => {
	// getting inputs
	const emailRef = useRef();
	const passwordRef = useRef();
	const imageRef = useRef();
	const nameRef = useRef();
	const bioRef = useRef();
	const phoneRef = useRef();

	// redirect with useHistory
	const history = useHistory();

	// making use of authentication values : signup func
	const { currentUser, UpdateEmail, updatePassword } = useAuth();

	// state
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// handling submit
	const handleSubmit = (e) => {
		e.preventDefault();
		// if (passwordRef.current.value !== passwordConfirmRef.current.value) {
		// 	return setError("Passwords do not match");
		// }

		// promises to handle changes
		const promises = [];
		setLoading(true);
		setError("");
		if (emailRef.current.value !== currentUser.email) {
			promises.push(UpdateEmail(emailRef.current.value));
		}

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		//   run if all promises were successful
		Promise.all(promises)
			.then(() => history.push("/"))
			.catch(() => setError("Update Failed! Try Again"))
			.finally(() => setLoading(false));
	};

	// Component return
	return (
		<>
			<CustomNav />
			<Container className="app_wrap">
				<div className="home-title">
					{error && <Alert variant="danger">{error}</Alert>}
				</div>
				<div className="w-100 signup_wrap">
					<div className="back">
						<i className="chevron left icon"></i>
						Back
					</div>
					<Card className="home-card">
						{/* <Card.Body> */}
						<div className="profile_header">
							<div className="profile_title">
								<h2>Change Info</h2>
								<p>Changes will be reflected to every services</p>
								<div className="profile_info">
									{/* <img src={UserImage} alt="User Image" /> */}
								</div>
								<Form onSubmit={handleSubmit}>
									<Form.Group id="email">
										<Form.Group id="imageConfirm" className="w-100 mt-3">
											<Form.Control
												type="file"
												ref={imageRef}
												className="imageConfirm"
											/>
										</Form.Group>
										<Form.Group id="nameConfirm" className="w-100 mt-3">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="text"
												ref={nameRef}
												placeholder="Enter your name..."
											/>
										</Form.Group>
										<Form.Group id="bioConfirm" className="w-100 mt-3">
											<Form.Label>Bio</Form.Label>
											<Form.Control
												type="text"
												as="textarea"
												aria-label="With textarea"
												ref={bioRef}
												placeholder="Enter your bio..."
											/>
										</Form.Group>
										<Form.Group id="phoneConfirm" className="w-100 mt-3">
											<Form.Label>Phone</Form.Label>
											<Form.Control
												type="text"
												ref={phoneRef}
												placeholder="Enter your phone..."
											/>
										</Form.Group>
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											ref={emailRef}
											defaultValue={currentUser.email}
										/>
									</Form.Group>
									<Form.Group id="password" className="w-100 mt-3">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											ref={passwordRef}
											placeholder="Keep current password? Leave blank!"
										/>
									</Form.Group>
									<Button
										disabled={loading}
										className="update_btn mt-5"
										type="submit">
										Save
									</Button>
								</Form>
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

export default UpdateProfile;
