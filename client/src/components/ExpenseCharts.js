import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ExpenseCharts.css';

const ExpenseCharts = ({ summary }) => {
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4'
  ];

  // Prepare data for pie chart
  const pieData = Object.entries(summary.categoryBreakdown).map(([category, amount], index) => ({
    name: category,
    value: amount,
    color: COLORS[index % COLORS.length]
  }));

  // Prepare data for bar chart
  const barData = Object.entries(summary.categoryBreakdown).map(([category, amount]) => ({
    category,
    amount: parseFloat(amount.toFixed(2))
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  if (Object.keys(summary.categoryBreakdown).length === 0) {
    return (
      <div className="expense-charts-container">
        <h3>Expense Analytics</h3>
        <div className="no-data">
          <p>Add some expenses to see beautiful charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-charts-container">
      <h3>Expense Analytics</h3>
      
      <div className="chart-section">
        <h4>Category Breakdown (Pie Chart)</h4>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h4>Category Comparison (Bar Chart)</h4>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h4>Quick Stats</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Spent</span>
            <span className="stat-value">${summary.totalAmount.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Expenses</span>
            <span className="stat-value">{summary.totalExpenses}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Categories</span>
            <span className="stat-value">{Object.keys(summary.categoryBreakdown).length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average</span>
            <span className="stat-value">
              ${summary.totalExpenses > 0 ? (summary.totalAmount / summary.totalExpenses).toFixed(2) : '0.00'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
