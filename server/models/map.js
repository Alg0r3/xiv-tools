import mongoose from 'mongoose';

const mapSchema = mongoose.Schema({
    id: Number,
    name_de: String,
    name_en: String,
    name_fr: String,
    name_ja: String,
    weatherRate: Number,
    region: String
});

const Map = Mongoose.model('Map', mapSchema);

export default Map;
