// routes/downloadExcel.js
import express from 'express';
import { downloadFeedbacksExcel, downloadRegistersExcel } from '../controllers/downloadExcel.controller.js';

const router = express.Router();

router.get(`/download/feedbacks/excel`, downloadFeedbacksExcel)
router.get(`/download/registers/excel`, downloadRegistersExcel)

export default router;