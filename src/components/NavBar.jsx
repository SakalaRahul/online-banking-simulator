import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("bankUser");
    navigate("/login");
  };

  return (
    <header className="banking-header text-white sticky-top">
      <div className="container py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <Link to="/summary" className="text-white text-decoration-none portal-brand">
              <i className="bi bi-bank2 me-2"></i>BHAAI BANK OF INDIA
            </Link>
            <span className="security-badge d-none d-md-inline-block">
              <i className="bi bi-shield-lock-fill me-1"></i> 256-bit SSL Encrypted
            </span>
          </div>

          {user && (
            <div className="d-flex align-items-center gap-3">
              <span className="small d-none d-sm-inline">
                Welcome, <strong>{user.fullName}</strong>
              </span>
              <button onClick={handleLogout} className="btn btn-sm btn-outline-light">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {user && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-25 border-top border-secondary border-opacity-25">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#bankingNav"
              aria-controls="bankingNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="bankingNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/summary" ? "active fw-bold" : ""}`}
                    to="/summary"
                  >
                    Account Summary
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/transfer" ? "active fw-bold" : ""}`}
                    to="/transfer"
                  >
                    Fund Transfer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/history" ? "active fw-bold" : ""}`}
                    to="/history"
                  >
                    Transaction History
                  </Link>
                </li>
              </ul>
              <span className="text-light small">
                A/C: ****{user.accountNumber?.slice(-4)}
              </span>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;