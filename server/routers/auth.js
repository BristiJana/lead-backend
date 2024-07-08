const express = require('express');
const router = express.Router();
const { signup, login ,updateDebts,updateSummary,updateAllTotal,updateIncomeTotal,userPlan} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/debts', updateDebts);
router.post('/updateSummary', updateSummary);
router.post('/updateAllTotal',updateAllTotal)
router.post('/storeSummary',updateIncomeTotal);
router.post('/updatePlan',userPlan);
module.exports = router;
