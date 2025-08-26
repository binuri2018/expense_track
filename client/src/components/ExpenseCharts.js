import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCategoryColor } from '../utils/colors';
import './ExpenseCharts.css';

const ExpenseCharts = ({ summary }) => {

  // Prepare data for pie chart
  const pieData = Object.entries(summary.categoryBreakdown).map(([category, amount], index) => ({
    name: category,
    value: amount
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
              <h3>Expense Charts</h3>
      <div className="no-data">
        <p>Add some expenses to see beautiful charts!</p>
      </div>
      </div>
    );
  }

  return (
    <div className="expense-charts-container">
      <h3>Expense Charts</h3>
      
      <div className="chart-section">
        <h4>Spending by Category (Pie Chart)</h4>
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
                fill="#ff6b6b"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name)} />
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
              <Bar dataKey="amount">
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="chart-legend">
        <h4>Category Colors Legend</h4>
        <div className="legend-items">
          {Object.entries(summary.categoryBreakdown).map(([category, amount]) => (
            <div key={category} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: getCategoryColor(category) }}
              ></div>
              <span className="legend-label">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
