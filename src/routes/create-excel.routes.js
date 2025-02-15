// routes/createExcel.js
import express from 'express';
import { createFeedbacksExcel, createRegistersExcel } from '../controllers/excel.controller.js';

const router = express.Router();

router.post(`/create-excel/registers`, createRegistersExcel)
router.post(`/create-excel/feedbacks`, createFeedbacksExcel)

export default router;