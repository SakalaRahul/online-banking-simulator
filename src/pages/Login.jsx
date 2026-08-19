import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ users, setUser }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const foundUser = users.find(
      (u) => u.accountNumber === accountNumber && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("bankUser", JSON.stringify(foundUser));
      navigate("/summary");
    } else {
      setError("Invalid Account Number or Password. Use demo credentials below.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="banking-card p-4">
            <div className="text-center mb-4">
              <i className="bi bi-shield-lock text-sbi-navy display-4"></i>
              <h3 className="text-sbi-navy fw-bold mt-2">Secure Online Banking</h3>
              <p className="text-muted small">Enter your credentials to access your account</p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter 10-digit A/C number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-sbi w-100 py-2">
                Login Securely
              </button>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;