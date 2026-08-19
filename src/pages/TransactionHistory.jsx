import React, { useState } from "react";

function TransactionHistory({ transactions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const filtered = transactions.filter((txn) => {
    const matchesSearch =
      txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "ALL" ? true : txn.type.toUpperCase() === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="container py-4">
      <div className="banking-card">
        <div className="card-header-styled d-flex flex-wrap justify-content-between align-items-center gap-2">
          <h4 className="text-sbi-navy fw-bold mb-0">Transaction History & Statement</h4>
          <span className="badge bg-sbi-navy">{filtered.length} Record(s)</span>
        </div>

        <div className="p-3 border-bottom bg-light">
          <div className="row g-2">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search transaction ID or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="ALL">All Transactions</option>
                <option value="DEBIT">Debit Only</option>
                <option value="CREDIT">Credit Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive p-3">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Txn ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th className="text-end">Amount (INR)</th>
                <th className="text-end">Balance After</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((txn) => (
                  <tr key={txn.id}>
                    <td><code>{txn.id}</code></td>
                    <td>{txn.date}</td>
                    <td>{txn.description}</td>
                    <td>
                      <span className={`badge ${txn.type === "Debit" ? "badge-debit" : "badge-credit"}`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className={`text-end fw-semibold ${txn.type === "Debit" ? "text-danger" : "text-success"}`}>
                      {txn.type === "Debit" ? "-" : "+"}₹{txn.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-end text-muted">
                      ₹{txn.balanceAfter.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No transaction records match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;