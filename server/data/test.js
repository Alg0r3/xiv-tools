import axios from 'axios';

import WeatherRate from '../models/weatherRate.js';
import Map from '../models/map.js';

export const createWeatherRates = async (req, res) => {
    let data = '';
    
    await axios.get(`https://xivapi.com/WeatherRate/6`)
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

    const newWeatherRates = new WeatherRate({
        id: data.ID,
        rates: [data.Rate0, data.Rate1, data.Rate2, data.Rate3, data.Rate4, data.Rate5, data.Rate6, data.Rate7],
        weathers: arrWeather
    });

    try {
        await newWeatherRates.save();
        res.send(`WEATHER RATE CREATED`);
    } catch (err) {
        console.log(err.message);
        res.send(`ERROR`);
    }
};

export const createMaps = async (req, res) => {
    let data = '';

    await axios.get(`https://xivapi.com/Search?indexes=Map&columns=ID,PlaceName.Name_de,PlaceName.Name_en,PlaceName.Name_fr,PlaceName.Name_ja,PlaceNameRegion.ID,PlaceNameRegion.Name_de,PlaceNameRegion.Name_en,PlaceNameRegion.Name_fr,PlaceNameRegion.Name_ja,TerritoryType.WeatherRate&filters=GameContentLinks.TerritoryType!,GamePatch.Banner!,TerritoryType.Aetheryte!,TerritoryType.BGM!!,TerritoryType.PlaceNameIconID>-1,TerritoryType.WeatherRate>0`)
        .then(res => data = res.data.Results);

    let weatherRate = '';
    const arrDocuments = [];

    for (let element of data) {
        try {
            weatherRate = await WeatherRate.findOne({id: element.TerritoryType.WeatherRate}).select('_id'); 
        } catch (err) {
            console.log(err.message);
        }

        let document = {
            id: element.ID,
            name_de: element.PlaceName.Name_de,
            name_en: element.PlaceName.Name_en,
            name_fr: element.PlaceName.Name_fr,
            name_ja: element.PlaceName.Name_ja,
            weather_rate: weatherRate
        };

        arrDocuments.push(document);
    }

    try {
        Map.insertMany(arrDocuments);
        res.send(`MAPS CREATED`);
    } catch (err) {
        console.log(err.message);
        res.send(`ERROR`);
    }
};
