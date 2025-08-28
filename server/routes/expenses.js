const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

const router = express.Router();

// @route   GET api/expenses
// @desc    Get all expenses for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/expenses
// @desc    Add new expense
// @access  Private
router.post('/', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('amount', 'Amount must be a positive number').isFloat({ min: 0 })
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, category, amount } = req.body;

  try {
    const newExpense = new Expense({
      title,
      category,
      amount,
      userId: req.user.id
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/expenses/:id
// @desc    Update expense
// @access  Private
router.put('/:id', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('amount', 'Amount must be a positive number').isFloat({ min: 0 })
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, category, amount } = req.body;

  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

    // Make sure user owns the expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, category, amount },
      { new: true }
    );

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/expenses/:id
// @desc    Delete expense
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Attempting to delete expense:', req.params.id, 'for user:', req.user.id);
    
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      console.log('Expense not found:', req.params.id);
      return res.status(404).json({ msg: 'Expense not found' });
    }

    // Make sure user owns the expense
    if (expense.userId.toString() !== req.user.id) {
      console.log('User not authorized to delete expense:', req.user.id, 'trying to delete:', expense.userId);
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const result = await Expense.findByIdAndDelete(req.params.id);
    if (!result) {
      console.log('Failed to delete expense:', req.params.id);
      return res.status(500).json({ msg: 'Failed to delete expense' });
    }
    
    console.log('Successfully deleted expense:', req.params.id);
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    console.error('Error deleting expense:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   GET api/expenses/summary
// @desc    Get expense summary for charts
// @access  Private
router.get('/summary', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const categoryBreakdown = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const summary = {
      totalAmount,
      categoryBreakdown,
      totalExpenses: expenses.length
    };

    res.json(summary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
