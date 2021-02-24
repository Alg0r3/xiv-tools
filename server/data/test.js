import axios from 'axios';

import WeatherRates from '../models/weatherRates.js';

export const createWeatherRates = async (req, res) => {
    let data = '';
    
    // 20 => Upper La Noscea & 91 => Anemos
    await axios.get(`https://xivapi.com/WeatherRate/94`)
        .then(res => data = res.data);

    const arrWeather = [];

    for (let val in data) {
        if (val.match(/Weather[0-9]$/gm) && data[val] !== null) {
            let buffer = {
                id: data[val].ID,
                icon: data[val].Icon,
                name_de: data[val].Name_de,
                name_en: data[val].Name_en,
                name_fr: data[val].Name_fr,
                name_ja: data[val].Name_ja
            };
            
            arrWeather.push(buffer);
        }
    }

    const newWeatherRates = new WeatherRates({
        id: data.ID,
        rates: [data.Rate0, data.Rate1, data.Rate2, data.Rate3, data.Rate4, data.Rate5, data.Rate6, data.Rate7],
        weathers: arrWeather
    });

    try {
        await newWeatherRates.save();
        res.send(`WEATHER RATE CREATED`);
    } catch (err) {
        console.log(err.message);
    }
};
