import express from 'express';
import {getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee} from '../controllers/employeeController.js';
const router = express.Router();
router.route('/api/employees')
    .get(getAllEmployees)
    .post(createEmployee);
router.route('/api/employees/:id')
    // .get(getEmployee)
    // .put(updateEmployee)
    .delete(deleteEmployee);
    export default router;