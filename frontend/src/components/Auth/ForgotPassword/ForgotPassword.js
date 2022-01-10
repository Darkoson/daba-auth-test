import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const ForgotPassword = () => {
  // getting inputs
  const emailRef = useRef();

  // making use of authentication values : signup func
  const { resetPassword } = useAuth();

  // state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Please Check you inbox for further instructions!");
    } catch (error) {
      setError("Password reset Failed! Please Try Again.");
    }
  };

  // Component return
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center md-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Reset Password
            </Button>
            <div className="w-100 text-center mt-3">
              <p>
                <Link to="/login">Back to Log In Page</Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
