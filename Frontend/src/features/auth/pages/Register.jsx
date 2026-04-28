import React, { useState } from "react";
import "../auth.form.scss";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-brand">
          <span className="auth-pill">✦ AI POWERED</span>
          <h1>
            Create your <span>Interview AI</span> account
          </h1>
          <p>
            Upload your resume, add job descriptions, and get AI-powered interview strategy.
          </p>
        </div>

        <div className="auth-card">
          <h2>Register</h2>
          <p className="auth-subtitle">Start preparing smarter today</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;