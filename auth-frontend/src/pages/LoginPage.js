// src/pages/LoginPage.js
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
        email,
        password,
      });
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Login failed";
      setMessage(" " + errorMessage);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <GoogleLogin
  onSuccess={(credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google user:", decoded);

    // Send token to backend
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/google-login`, {
      token: credentialResponse.credential
    })
    .then(res => {
      setMessage(" Google Login successful!");
      navigate("/dashboard");
    })
    .catch(err => {
      const msg = err?.response?.data?.message || "Google Login failed";
      setMessage(" " + msg);
    });
  }}
  onError={() => {
    setMessage(" Google Sign-In Failed");
  }}
/>
      <p>{message}</p>
      <p>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "auto", textAlign: "center", padding: "40px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" },
};

export default LoginPage;
