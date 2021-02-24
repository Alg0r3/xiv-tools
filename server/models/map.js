import mongoose from 'mongoose';

import WeatherRate from './weatherRates.js';

const mapSchema = mongoose.Schema({
    id: Number,
    name_de: String,
    name_en: String,
    name_fr: String,
    name_ja: String,
    weatherRate: WeatherRate.schema
});

const Map = mongoose.model('Map', mapSchema);

export default Map;
