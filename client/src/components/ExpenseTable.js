import React from 'react';
import './ExpenseTable.css';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(id);
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-table-container">
        <h3>Your Expenses</h3>
        <div className="no-expenses">
          <p>No expenses yet. Add your first expense above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-table-container">
      <h3>Your Expenses</h3>
      
      <div className="table-responsive">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense._id}>
                <td className="expense-title">{expense.title}</td>
                <td>
                  <span className="category-badge">
                    {expense.category}
                  </span>
                </td>
                <td className="expense-amount">${expense.amount.toFixed(2)}</td>
                <td className="expense-date">{formatDate(expense.createdAt)}</td>
                <td className="expense-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(expense)}
                    title="Edit expense"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(expense._id)}
                    title="Delete expense"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-summary">
        <p>
          Total: <strong>${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
};

export default ExpenseTable;
