import mongoose from 'mongoose';

const regionSchema = mongoose.Schema({
    id: Number,
    name_de: String,
    name_en: String,
    name_fr: String,
    name_ja: String
});

const Region = Mongoose.model('Region', regionSchema);

export default Region;
