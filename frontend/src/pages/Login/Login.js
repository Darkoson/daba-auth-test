import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";
import LOGO from "../../assets/logo-auth-lg.PNG";

const Login = () => {
  // getting inputs
  const emailRef = useRef("");
  const passwordRef = useRef("");

  // making use of authentication values : signup func
  const { signin } = useAuth();

  // redirect with useHistory
  const history = useHistory();

  // state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handling submit
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const result = await signin(
      emailRef.current.value,
      passwordRef.current.value
    );

    if (result.success) {
      history.push("/");
    } else {
      setError(result.data);
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
            <img src={LOGO} alt="Logo" width="200px" />
              <h1 className="text-left md-4 mt-20">Login</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <div className="ui left icon input">
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="example@email.com"
                    ref={emailRef}
                    required
                  />
                  <i className="envelope icon"></i>
                </div>
                <div className="ui left icon input">
                  <input
                    type="password"
                    defaultValue=""
                    placeholder="your password"
                    ref={passwordRef}
                    required
                  />
                  <i className="lock icon"></i>
                </div>

                <Button
                  disabled={loading}
                  className="w-100 mt-3 py-3"
                  type="submit"
                >
                  Login
                </Button>

                <div className="w-100 text-center text-muted mt-4">
                  <p>or continue with these social profile</p>
                </div>
                <div className="w-100 text-center text-muted mt-2 social">
                  <i className="google icon"></i>
                  <i className="facebook icon"></i>
                  <i className="twitter icon"></i>
                  <i className="github icon"></i>
                </div>
                <div className="w-100 text-center text-muted mt-2">
                  <p>
                    Don't have an account yet?{" "}
                    <Link to="/signup">Register</Link>
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

export default Login;
