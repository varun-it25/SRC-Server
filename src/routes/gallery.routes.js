// routes/galleryRoutes.js
import express from 'express';
import {
  uploadFile,
  getAllFiles,
  getFileById,
  deleteFileById,
  deleteAllFiles
} from '../controllers/gallery.controller.js';

const router = express.Router();

router.post('/gallery/upload', uploadFile);
router.get('/gallery', getAllFiles);
router.get('/gallery/read_file/:id', getFileById);
router.delete('/gallery/delete_file/:id', deleteFileById);
router.delete('/gallery/delete_all_files', deleteAllFiles);

export default router;
