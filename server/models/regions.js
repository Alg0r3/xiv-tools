import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const API_KEY = process.env.API_KEY;

const somethingRegions = async () => {
    let data = '';

    await axios.get(`https://xivapi.com/Search?private_key=${API_KEY}&indexes=Map&columns=PlaceNameRegion.ID,PlaceNameRegion.Name_de,PlaceNameRegion.Name_en,PlaceNameRegion.Name_fr,PlaceNameRegion.Name_ja&filters=GameContentLinks.TerritoryType!,GamePatch.Banner!,TerritoryType.Aetheryte!,TerritoryType.BGM!!,TerritoryType.PlaceNameIconID>-1,TerritoryType.WeatherRate>0`)
        .then(res =>  data = res.data.Results);

    data = new Set(data.map(e => JSON.stringify(e)));
    data = Array.from(data).map(e => JSON.parse(e));

    fs.writeFile('./data/regions.json', JSON.stringify(data), () => console.log('File was written'));
};

somethingRegions();
