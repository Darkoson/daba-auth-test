import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import './signup.css'

const Signup = (props) => {
  // getting inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  // const passwordConfirmRef = useRef();

  // redirect with useHistory
  const history = useHistory();

  // making use of authentication values : signup func
  const { signup } = useAuth();

  // state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(passwordRef.current.value);
    console.log(emailRef.current.value);
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match");
    // }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setLoading(false);
    }
  };

  // Component return
  return (
		<>
			<Container className="app_wrap">
				<div className="w-100 signup_wrap">
					<Card style={{ padding: "4rem" }}>
						<Card.Body>
							<h2 className="text-left md-4">devchallenges</h2>
							<h1 className="text-left md-4">
								Join thousands of learners from around the world
							</h1>
							<p className="text-left md-4">
								Master web development by making real-life projects. There are
								multiple paths for you to choose
							</p>
							{error && <Alert variant="danger">{error}</Alert>}
							<Form onSubmit={handleSubmit}>
								<div class="ui left icon input">
									<input
										type="text"
										placeholder="Email"
										ref={emailRef}
										required
									/>
									<i class="envelope icon"></i>
								</div>
								<div class="ui left icon input">
									<input
										type="text"
										placeholder="Password"
										ref={passwordRef}
										required
									/>
									<i class="lock icon"></i>
								</div>

								<Button
									disabled={loading}
									className="w-100 mt-3 py-3"
									type="submit">
									Start coding now
								</Button>
								<div className="w-100 text-center text-muted mt-4">
									<p>or continue with these social profile</p>
									{/* <p>
								<Link to="/forgot-password">Forgot password?</Link>
							</p> */}
								</div>
								<div className="w-100 text-center text-muted mt-2 social">
									<i class="google icon"></i>
									<i class="facebook icon"></i>
									<i class="twitter icon"></i>
									<i class="github icon"></i>
								</div>
								<div className="w-100 text-center text-muted mt-2">
									<p>
										Already a member? <Link to="/login">Login</Link>
									</p>
								</div>
							</Form>
						</Card.Body>
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

export default Signup;
