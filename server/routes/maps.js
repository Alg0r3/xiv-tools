import express from 'express';

import { getMaps, getMap } from '../controllers/maps.js';

const router = express.Router();

router.get('/', getMaps);
router.get('/:mapId', getMap);

export default router;
