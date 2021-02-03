import express from 'express';

import { getMaps, sendMaps } from '../controllers/maps.js';

const router = express.Router();

router.get('/', getMaps);
router.post('/', sendMaps);

export default router;
