import { useState } from 'react';
import useFetch from './useFetch';
import MapList from './MapList';

const REGIONS = [
    {'Name': 'La Noscea', 'ID': 22},
    {'Name': 'The Black Shroud', 'ID': 23},
    {'Name': 'Thanalan', 'ID': 24},
    {'Name': 'Coerthas', 'ID': 25},
    {'Name': 'Mor Dhona', 'ID': 26},
    {'Name': 'Abalathia\'s Spine', 'ID': 497},
    {'Name': 'Dravania', 'ID': 498}, 
    {'Name': 'Gyr Abania', 'ID': 2400},
    {'Name': 'Othard', 'ID': 2401},
    {'Name': 'Hingashi', 'ID': 2402},
    {'Name': 'Norvrandt', 'ID': 2950}
];

const Weather = () => {
    const [id, setId] = useState(26);
    const {data, isLoading, error} = useFetch(`https://xivapi.com/Search?indexes=Map&columns=ID,PlaceName.Name_de,PlaceName.Name_en,PlaceName.Name_fr,PlaceName.Name_ja,TerritoryType.WeatherRate&filters=GameContentLinks.TerritoryType!,GamePatch.Banner!,TerritoryType.Aetheryte!,TerritoryType.BGM!!,TerritoryType.PlaceNameIconID>-1,TerritoryType.WeatherRate>0,PlaceNameRegionTargetID=${id}`);

    return (
        <div className="weather">
            <h2>Eorzea Weather Forecast</h2>
            {REGIONS.map(region => {
                return <button key={region.ID} type="button" onClick={() => setId(region.ID)}>{region.Name}</button>
            })}
            {error && <div className="error">{error}</div>}
            {isLoading ? <div className="loading">Loading...</div> : <MapList maps={data.Results} />}
        </div>
    );
};

export default Weather;
