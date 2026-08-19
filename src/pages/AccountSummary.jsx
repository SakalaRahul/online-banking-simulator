import React from "react";
import { Link } from "react-router-dom";

function AccountSummary({ user }) {
  if (!user) return null;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-sbi-navy fw-bold mb-0">Account Overview</h2>
          <p className="text-muted mb-0">Welcome back, {user.fullName}</p>
        </div>
        <Link to="/transfer" className="btn btn-sbi">
          <i className="bi bi-send me-1"></i> Quick Transfer
        </Link>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-4">
          <div className="banking-card p-3 border-start border-4 border-primary">
            <span className="text-muted small text-uppercase">Available Balance</span>
            <h2 className="text-sbi-navy fw-bold mt-2 mb-0">
              ₹{user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </h2>
            <span className="badge bg-success mt-2">Active Status</span>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="banking-card p-3 border-start border-4 border-info">
            <span className="text-muted small text-uppercase">Account Type</span>
            <h4 className="text-dark fw-bold mt-2 mb-0">{user.accountType}</h4>
            <small className="text-muted">A/C: {user.accountNumber}</small>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="banking-card p-3 border-start border-4 border-warning">
            <span className="text-muted small text-uppercase">Branch Details</span>
            <h5 className="text-dark fw-bold mt-2 mb-0">{user.branch}</h5>
            <small className="text-muted">IFSC: {user.ifsc}</small>
          </div>
        </div>
      </div>

      <div className="banking-card">
        <div className="card-header-styled d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-sbi-navy fw-bold">Primary Account Summary</h5>
          <Link to="/history" className="btn btn-sm btn-outline-primary">
            View Statement
          </Link>
        </div>
        <div className="table-responsive p-3">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Account Holder</th>
                <th>Account Number</th>
                <th>Branch</th>
                <th>IFSC Code</th>
                <th className="text-end">Balance (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-semibold">{user.fullName}</td>
                <td>{user.accountNumber}</td>
                <td>{user.branch}</td>
                <td>{user.ifsc}</td>
                <td className="text-end fw-bold text-sbi-navy">
                  ₹{user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;