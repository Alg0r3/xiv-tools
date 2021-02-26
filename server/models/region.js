import mongoose from 'mongoose';

import Map from './map.js'

const regionSchema = mongoose.Schema({
    id: Number,
    name_de: String,
    name_en: String,
    name_fr: String,
    name_ja: String,
    maps: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: Map
    }]
});

const Region = mongoose.model('Region', regionSchema);

export default Region;
