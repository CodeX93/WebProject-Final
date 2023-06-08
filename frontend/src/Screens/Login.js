import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/ScreenStyles/LoginScreen.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response = await axios.post("http://localhost:3005/project/login", {
        Email: email,
        Password: password,
        ActiveStatus: true,
      });

      const { Success, user, token, Message } = response.data;

      if (Success) {
        // Save the user and token data in localStorage or state as needed
        console.log(response.data);
        // localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("name", user.Name);
        localStorage.setItem("email", user.Email);

        // Redirect to the home page or any other desired route
        console.log("login");
        navigator("/home");
      } else {
        console.log(Message);
        // Handle login failure
        alert("No User with this Credentials");
      }
    } catch (error) {
      console.log("Login error:", error);
      // Handle login error
      alert("No User with this Credentials");
    }
  };

  return (
    <>
      <div>
        <div className="login-screen">
          <div className="login-container">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>

              <div className="register-link">
                <Link to="/signup">Register As Scheme Agent</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
