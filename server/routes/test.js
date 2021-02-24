import express from 'express';

import { createWeatherRates } from '../data/test.js';

const router = express.Router();

router.get('/', createWeatherRates);

export default router;
