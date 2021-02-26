import mongoose from 'mongoose';

const weatherRateSchema = mongoose.Schema({
    id: Number,
    rates: [Number],
    weathers: [{
        id: Number,
        icon: String,
        name_de: String,
        name_en: String,
        name_fr: String,
        name_ja: String
    }]
});

const WeatherRate = mongoose.model('WeatherRate', weatherRateSchema);

export default WeatherRate;
