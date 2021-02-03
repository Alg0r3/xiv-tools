import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const API_KEY = process.env.API_KEY;

const somethingMaps = async () => {
    let maps = '';

    await axios.get(`https://xivapi.com/Search?private_key=${API_KEY}&indexes=Map&columns=ID,PlaceName.Name_de,PlaceName.Name_en,PlaceName.Name_fr,PlaceName.Name_ja,TerritoryType.WeatherRate&filters=GameContentLinks.TerritoryType!,GamePatch.Banner!,TerritoryType.Aetheryte!,TerritoryType.BGM!!,TerritoryType.PlaceNameIconID>-1,TerritoryType.WeatherRate>0,PlaceNameRegionTargetID=22`)
        .then(res => maps = res.data.Results);

    fs.writeFile('./data/maps.json', JSON.stringify(maps), () => console.log('File was written'));
};

somethingMaps();
