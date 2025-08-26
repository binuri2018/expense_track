import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onSubmit, editingExpense, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ];

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        category: editingExpense.category,
        amount: editingExpense.amount.toString()
      });
    } else {
      setFormData({
        title: '',
        category: '',
        amount: ''
      });
    }
    setErrors({});
  }, [editingExpense]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const expenseData = {
        title: formData.title.trim(),
        category: formData.category,
        amount: parseFloat(formData.amount)
      };

      if (editingExpense) {
        await onUpdate(editingExpense._id, expenseData);
      } else {
        await onSubmit(expenseData);
        setFormData({
          title: '',
          category: '',
          amount: ''
        });
      }
    } catch (err) {
      console.error('Error saving expense:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="expense-form-container">
      <h3>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h3>
      
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="Enter expense title"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={errors.amount ? 'error' : ''}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>
        
        <div className="form-actions">
          {editingExpense ? (
            <>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update Expense'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Expense'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
