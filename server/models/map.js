import mongoose from 'mongoose';

import WeatherRate from './weatherRate.js';

const mapSchema = mongoose.Schema({
    id: Number,
    name_de: String,
    name_en: String,
    name_fr: String,
    name_ja: String,
    weather_rate: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: WeatherRate 
    }
});

const Map = mongoose.model('Map', mapSchema);

export default Map;
