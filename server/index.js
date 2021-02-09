import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import RegionsRoutes from './routes/regions.js'
import MapsRoutes from './routes/maps.js';

dotenv.config();
const app = express();

const CONNECTION_URL_DB = process.env.CONNECTION_URL_DB;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message))

// Middleware
app.use('/regions', RegionsRoutes);
app.use('/maps', MapsRoutes);
