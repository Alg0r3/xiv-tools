import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import RegionRoutes from './routes/region.js'
import MapRoutes from './routes/map.js';
import WeatherRateRoutes from './routes/weatherRate.js';
import TestRoutes from './routes/test.js';


dotenv.config();
const app = express();

const CONNECTION_URL_DB = process.env.CONNECTION_URL_DB;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message))

// Middleware
app.use('/region', RegionRoutes);
app.use('/map', MapRoutes);
app.use('/weatherrate', WeatherRateRoutes);
app.use('/test', TestRoutes);
