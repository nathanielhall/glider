import express from 'express';

//import controller file
import * as AuthController from '../controllers/user.auth.controller';
import * as ExpenseController from '../controllers/expense.controller';
import * as ReportContrl from '../controllers/report.controller'
// get an instance of express router
const router = express.Router();

router.route('/login').post(AuthController.login);
router.route('/register').post(AuthController.register);
router.route('/getList').post(ExpenseController.getList);
router.route('/createExpense').post(ExpenseController.createExpense);
router.route('/deleteExpense').post(ExpenseController.deleteExpense);
router.route('/getFilerList').post(ExpenseController.getFilerList);
router.route('/createreport').post(ReportContrl.createReport);
router.route('/getreports').post(ReportContrl.getList);
router.route('/delexpenseofreport').post(ReportContrl.deleteExpenseOfReport);
router.route('/updatereport').post(ReportContrl.updateReport);
router.route('/delreport').post(ReportContrl.deleteReport);
router.route('/setstats').post(ReportContrl.setstats);


export default router;
