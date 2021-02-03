import express from 'express';
import dotenv from 'dotenv';

import MapRoutes from './routes/maps.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use('/maps', MapRoutes);

// http.createServer()
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
