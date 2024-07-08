const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DebtSchema = new Schema({
  creditorName: { type: String, required: true },
  debtType: { type: String, required: true },
  debtOutstanding: { type: Number, required: true },
  emi: { type: Number, required: true },
  missedEmi: { type: Number, required: true },
  secured: { type: Boolean, required: true }
});
const SummarySchema = new Schema({
  totalOutstandingSecured: { type: Number, required: true },
  totalEMISecured: { type: Number, required: true },
  totalOutstandingUnsecured: { type: Number, required: true },
  totalEMIUnsecured: { type: Number, required: true },
  totalDebtsOutstanding: { type: Number, required: true },
  totalMonthlyEmi: { type: Number, required: true }
});
const IncomeSchema = new Schema({
  salary: { type: Number, required: true },
  business: { type: Number, required: true },
  other: { type: Number, required: true },
  familySupport: { type: Number, required: true }
});

const LivingExpensesSchema = new Schema({
  rent: { type: Number, required: true },
  food: { type: Number, required: true },
  electricity: { type: Number, required: true },
  gas: { type: Number, required: true },
  phone: { type: Number, required: true },
  otherUtilities: { type: Number, required: true }
});

const LifestyleExpensesSchema = new Schema({
  travel: { type: Number, required: true },
  digital: { type: Number, required: true },
  dining: { type: Number, required: true },
  houseHelp: { type: Number, required: true },
  outing: { type: Number, required: true }
});

const AllTotalSchema = new Schema({
  income: { type: IncomeSchema, required: true },
  livingExpenses: { type: LivingExpensesSchema, required: true },
  lifestyleExpenses: { type: LifestyleExpensesSchema, required: true },
});
const SummaryIncomeExpenditureSchema = new Schema({
  monthlyTakeHomeIncome: { type: Number, required: true },
  securedLoanEMI: { type: Number, required: true },
  livingExpenses: { type: Number, required: true },
  lifestyleExpenses: { type: Number, required: true },
  totalFundsForDebtSolution: { type: Number, required: true },
  diPercentage: { type: Number, required: true }
});
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  debts: [DebtSchema],
  summarydebts:[SummarySchema],
  alltotal: [AllTotalSchema],
  summaryIncomeExpenditure: [SummaryIncomeExpenditureSchema],
  selectedPlan: { type: String, required: false }
});

module.exports = mongoose.model('User', UserSchema);
