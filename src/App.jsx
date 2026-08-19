import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import AccountSummary from "./pages/AccountSummary";
import MoneyTransfer from "./pages/MoneyTransfer";
import TransactionHistory from "./pages/TransactionHistory";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("bankUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("/bankingData.json")
      .then((res) => {
        setUsers(res.data.users || []);
        setTransactions(res.data.transactions || []);
      })
      .catch((err) => console.error("Error loading static banking JSON:", err));
  }, []);


  useEffect(() => {
    if (!user) return;
    const updated = users.find((u) => u.accountNumber === user.accountNumber);
    if (updated && updated.balance !== user.balance) {
      setUser(updated);
      localStorage.setItem("bankUser", JSON.stringify(updated));
    }
  }, [users]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to={user ? "/summary" : "/login"} replace />} />
          <Route path="/login" element={<Login users={users} setUser={setUser} />} />
          <Route
            path="/summary"
            element={
              <ProtectedRoute user={user}>
                <AccountSummary user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transfer"
            element={
              <ProtectedRoute user={user}>
                <MoneyTransfer
                  user={user}
                  setUser={setUser}
                  users={users}
                  setUsers={setUsers}
                  setTransactions={setTransactions}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute user={user}>
                <TransactionHistory
                  transactions={transactions.filter(
                    (t) => t.accountNumber === user?.accountNumber
                  )}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;