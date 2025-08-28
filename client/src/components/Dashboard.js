import React, { useState, useEffect } from 'react';
import http from '../api/http';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import ExpenseCharts from './ExpenseCharts';
import { getCategoryColor } from '../utils/colors';
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
  const [user, setUser] = useState(null);



  useEffect(() => {
    fetchUser();
    fetchExpenses();
    fetchSummary();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await http.get('/api/auth/user');
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await http.get('/api/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await http.get('/api/expenses/summary');
      setSummary(res.data);
    } catch (err) {
      console.error('Error fetching summary:', err);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const res = await http.post('/api/expenses', expenseData);
      setExpenses([res.data, ...expenses]);
      fetchSummary();
    } catch (err) {
      console.error('Error adding expense:', err);
      throw err;
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const res = await http.put(`/api/expenses/${id}`, expenseData);
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
      console.log('Attempting to delete expense with ID:', id);
      
      const response = await http.delete(`/api/expenses/${id}`);
      console.log('Delete response:', response.data);
      setExpenses(expenses.filter(expense => expense._id !== id));
      fetchSummary();
    } catch (err) {
      console.error('Error deleting expense:', err);
      if (err.response) {
        console.error('Error response status:', err.response.status);
        console.error('Error response data:', err.response.data);
        alert(`Failed to delete expense: ${err.response.data.msg || 'Unknown error'}`);
      } else {
        console.error('Network error:', err.message);
        alert('Failed to delete expense. Please check your connection and try again.');
      }
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
        <h1>Welcome back, {user?.username || 'User'}! 👋</h1>
        <p className="welcome-subtitle">Track and manage your expenses with ease</p>
       <div className="dashboard-stats">
         <div className="stat-card">
           <h3>{summary.totalExpenses} Total Expenses</h3>
           <p className="stat-value">📊</p>
         </div>
         <div className="stat-card">
           <h3>${summary.totalAmount.toFixed(2)} Total Spent</h3>
           <p className="stat-value">💰</p>
         </div>
         <div className="stat-card">
           <h3>${summary.totalExpenses > 0 ? (summary.totalAmount / summary.totalExpenses).toFixed(2) : '0.00'} Average per Expense</h3>
           <p className="stat-value">📈</p>
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
         <div className="top-spending-categories">
           <h3>Top Spending Categories</h3>
           <div className="category-list">
             {Object.entries(summary.categoryBreakdown).map(([category, amount]) => (
               <div key={category} className="category-item">
                 <div className="category-info">
                   <span className="category-name">{category}</span>
                   <span className="category-count">1 expense</span>
                 </div>
                 <div className="category-progress">
                   <div 
                     className="progress-bar" 
                     style={{ 
                       width: `${(amount / summary.totalAmount) * 100}%`,
                       backgroundColor: getCategoryColor(category)
                     }}
                   ></div>
                 </div>
                 <span className="category-amount">${amount.toFixed(2)}</span>
               </div>
             ))}
           </div>
         </div>
         
         <div className="recent-expenses">
           <h3>Recent Expenses (Last 7 Days)</h3>
           <div className="recent-list">
             {expenses.slice(0, 3).map((expense) => (
               <div key={expense._id} className="recent-item">
                 <span className="recent-title">{expense.title}</span>
                 <span className="recent-category">({expense.category})</span>
                 <span className="recent-amount">${expense.amount.toFixed(2)}</span>
               </div>
             ))}
           </div>
         </div>
         
         <ExpenseCharts summary={summary} />
       </div>
     </div>
   </div>
  );
};

export default Dashboard;
