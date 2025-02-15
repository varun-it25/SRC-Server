

import express from 'express';
import { getAllUrls, updateUrl } from '../controllers/gallery.controller.js';

const router = express.Router();

router.get('/gallery/all', getAllUrls);
router.patch('/gallery/:id', updateUrl);





export default router;
