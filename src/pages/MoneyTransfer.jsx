import React, { useState } from "react";

function MoneyTransfer({ user, setUser, users, setUsers, setTransactions }) {
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryAcc, setBeneficiaryAcc] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [amount, setAmount] = useState("");
  const [transferType, setTransferType] = useState("NEFT");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState(null);

const handleTransfer = (e) => {
  e.preventDefault();
  const transferAmount = parseFloat(amount);

  if (isNaN(transferAmount) || transferAmount <= 0) {
    setMessage({ type: "danger", text: "Please enter a valid transfer amount." });
    return;
  }

  if (transferAmount > user.balance) {
    setMessage({ type: "danger", text: "Insufficient funds for this transaction." });
    return;
  }

  if (beneficiaryAcc === user.accountNumber) {
    setMessage({ type: "danger", text: "You cannot transfer money to your own account." });
    return;
  }

  // NEW: reject the transfer if the beneficiary account isn't a known account
  const beneficiaryUser = users.find((u) => u.accountNumber === beneficiaryAcc);
  if (!beneficiaryUser) {
    setMessage({
      type: "danger",
      text: "This beneficiary account number does not exist in our records. Please check and try again."
    });
    return;
  }

  const senderNewBalance = user.balance - transferAmount;
  const refId = `TXN${Math.floor(100000 + Math.random() * 900000)}`;
  const today = new Date().toISOString().split("T")[0];

  const debitTxn = {
    id: refId,
    accountNumber: user.accountNumber,
    date: today,
    description: `Transfer to ${beneficiaryName} (${transferType}) - ${remarks || "Fund Transfer"}`,
    type: "Debit",
    amount: transferAmount,
    balanceAfter: senderNewBalance
  };

  const creditTxn = {
    id: refId,
    accountNumber: beneficiaryUser.accountNumber,
    date: today,
    description: `Received from ${user.fullName} (${transferType}) - ${remarks || "Fund Transfer"}`,
    type: "Credit",
    amount: transferAmount,
    balanceAfter: beneficiaryUser.balance + transferAmount
  };

  const updatedUsers = users.map((u) => {
    if (u.accountNumber === user.accountNumber) return { ...u, balance: senderNewBalance };
    if (u.accountNumber === beneficiaryAcc) return { ...u, balance: u.balance + transferAmount };
    return u;
  });

  const updatedUser = { ...user, balance: senderNewBalance };
  setUser(updatedUser);
  localStorage.setItem("bankUser", JSON.stringify(updatedUser));
  setUsers(updatedUsers);
  setTransactions((prev) => [debitTxn, creditTxn, ...prev]);

  setMessage({
    type: "success",
    text: `Successfully transferred ₹${transferAmount.toLocaleString("en-IN")} to ${beneficiaryName}. Reference ID: ${refId}`
  });

  setBeneficiaryName("");
  setBeneficiaryAcc("");
  setIfsc("");
  setAmount("");
  setRemarks("");
};

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="banking-card">
            <div className="card-header-styled">
              <h4 className="text-sbi-navy fw-bold mb-0">Fund Transfer (NEFT / RTGS / IMPS)</h4>
            </div>
            <div className="p-4">
              {message && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                  {message.text}
                  <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
                </div>
              )}

              <form onSubmit={handleTransfer}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Beneficiary Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Beneficiary Account Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter account number"
                      value={beneficiaryAcc}
                      onChange={(e) => setBeneficiaryAcc(e.target.value)}
                      required
                    />
                    
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">IFSC Code *</label>
                    <input
                      type="text"
                      className="form-control text-uppercase"
                      placeholder="e.g. SBIN0004321"
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Transfer Type</label>
                    <select
                      className="form-select"
                      value={transferType}
                      onChange={(e) => setTransferType(e.target.value)}
                    >
                      <option value="NEFT">NEFT (National Electronic Funds Transfer)</option>
                      <option value="IMPS">IMPS (Immediate Payment Service)</option>
                      <option value="RTGS">RTGS (Real Time Gross Settlement)</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Amount (INR) *</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 5000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                    <small className="text-muted">
                      Available: ₹{user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Remarks / Purpose</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Rent, Bill, Personal"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-sbi px-4 py-2">
                    Confirm & Transfer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoneyTransfer;