import express from 'express';

import { createMaps, createWeatherRates } from '../data/test.js';

const router = express.Router();

router.get('/weatherrate', createWeatherRates);
router.get('/map', createMaps);

export default router;
