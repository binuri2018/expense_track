import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import ExpenseCharts from './ExpenseCharts';
import './Dashboard.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalAmount: 0,
    categoryBreakdown: {},
    totalExpenses: 0
  });
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/api/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get('/api/expenses/summary');
      setSummary(res.data);
    } catch (err) {
      console.error('Error fetching summary:', err);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const res = await axios.post('/api/expenses', expenseData);
      setExpenses([res.data, ...expenses]);
      fetchSummary();
    } catch (err) {
      console.error('Error adding expense:', err);
      throw err;
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const res = await axios.put(`/api/expenses/${id}`, expenseData);
      setExpenses(expenses.map(expense => 
        expense._id === id ? res.data : expense
      ));
      fetchSummary();
      setEditingExpense(null);
    } catch (err) {
      console.error('Error updating expense:', err);
      throw err;
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
      fetchSummary();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your expenses...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Expense Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Expenses</h3>
            <p className="stat-value">${summary.totalAmount.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>Number of Expenses</h3>
            <p className="stat-value">{summary.totalExpenses}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-left">
          <ExpenseForm 
            onSubmit={handleAddExpense}
            editingExpense={editingExpense}
            onUpdate={handleUpdateExpense}
            onCancel={handleCancelEdit}
          />
          <ExpenseTable 
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        </div>
        
        <div className="dashboard-right">
          <ExpenseCharts summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
