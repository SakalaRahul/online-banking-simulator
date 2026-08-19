import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="banking-footer py-4 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row g-3">
          <div className="col-md-6">
            <h6 className="text-white mb-2">Online Banking Simulation Portal</h6>
            <p className="mb-0 small">
              This platform is a static demonstration designed for security evaluation, UI design, and transaction workflow simulations.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-inline mb-1">
              <li className="list-inline-item"><a href="#!">Privacy Policy</a></li>
              <li className="list-inline-item">|</li>
              <li className="list-inline-item"><a href="#!">Terms of Service</a></li>
              <li className="list-inline-item">|</li>
              <li className="list-inline-item"><a href="#!">Security Guidelines</a></li>
            </ul>
            <p className="mb-0 small">© {new Date().getFullYear()} BBI Simulation. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;