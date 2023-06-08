import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../Styles/ScreenStyles/SignupScreen.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3005/project/signup",
        {
          Name,
          Email,
          Password,
          AccountNumber,
        }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log("Signup error:", error);
      setSuccessMessage("");
      setErrorMessage("An error occurred during signup.");
    }
  };

  return (
    <>
      <div className="Signup"></div>

      <div className="signup-screen">
        <div className="signup-container">
          <h2>Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account number"
                value={AccountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Signup
            </Button>

            {successMessage && (
              <div className="success-message">
                {successMessage}
                <Link to={"/"}> Login Now</Link>
              </div>
            )}

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}
