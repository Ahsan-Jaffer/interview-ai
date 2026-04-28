import React, { useState } from "react";
import "../auth.form.scss";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-brand">
          <span className="auth-pill">✦ AI INTERVIEW</span>
          <h1>
            Welcome back to your <span>Interview Coach</span>
          </h1>
          <p>
            Login to generate personalized interview plans, analyze resumes, and prepare smarter.
          </p>
        </div>

        <div className="auth-card">
          <h2>Login</h2>
          <p className="auth-subtitle">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;