const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword, phoneNumber });
    await newUser.save();
    console.log("Succesfull")
    res.status(200).json({ message: 'SignUp Succsfull'});
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.login = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }] });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const data = {
      id: user._id,
      name: user.name
    };
    res.status(200).json({ message: 'Login Successful', data });
  } catch (error) {
    res.status(500).json({ message: 'Login Failed' });
  }
};

exports.updateDebts = async (req, res) => {
  const { userId, debts } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.debts = debts;
    await user.save();

    res.status(200).json({ message: 'Debts updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update debts', error });
  }
};

exports.updateSummary = async (req, res) => {
  const {
    userId,
    summarydebts
  } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.summarydebts = summarydebts;
    await user.save();

    res.status(200).json({ message: 'Summary updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update summary', error });
  }
};
exports.updateAllTotal = async (req, res) => {
  const { userId, income, livingExpenses, lifestyleExpenses } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.alltotal.push({
      income,
      livingExpenses,
      lifestyleExpenses,
    });

    await user.save();

    res.status(200).json({ message: 'All total data updated successfully' });
  } catch (error) {
    console.error('Failed to update all total data:', error);
    res.status(500).json({ message: 'Failed to update all total data', error });
  }
};

exports.updateIncomeTotal = async (req, res) => {
  const { userId, summaryData } = req.body;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Assuming you have a field to store the summary data
      user.summaryIncomeExpenditure = summaryData;
      await user.save();

      res.status(200).json({ message: 'Summary data stored successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error storing summary data', error });
  }
};

exports.userPlan =async (req, res) => {
  const { userId, selectedPlan } = req.body;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.selectedPlan = selectedPlan;
      await user.save();

      res.status(200).json({ message: 'Selected plan updated successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error updating selected plan', error });
  }
};