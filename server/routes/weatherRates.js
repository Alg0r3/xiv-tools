import express from 'express';

import { getAllWeatherRates, getWeatherRates } from '../controllers/weatherRates.js';

const router = express.Router();

router.get('/', getAllWeatherRates);
router.get('/:weatherId', getWeatherRates);

export default router;
