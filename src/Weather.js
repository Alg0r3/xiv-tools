import { useState } from 'react';
import useFetch from './useFetch';
import MapList from './MapList';

const Weather = () => {
    const [id, setId] = useState(26);
    const {data, isLoading, error} = useFetch(`https://xivapi.com/Search?indexes=Map&columns=ID,PlaceName.Name_de,PlaceName.Name_en,PlaceName.Name_fr,PlaceName.Name_ja,TerritoryType.WeatherRate&filters=GameContentLinks.TerritoryType!,GamePatch.Banner!,TerritoryType.Aetheryte!,TerritoryType.BGM!!,TerritoryType.PlaceNameIconID>-1,TerritoryType.WeatherRate>0,PlaceNameRegionTargetID=${id}`);

    return (
        <div className="weather">
            <h2>Eorzea Weather Forecast</h2>
            <button type="button" onClick={() => setId(22)}>La Noscea</button>
            <button type="button" onClick={() => setId(23)}>The Black Shroud</button>
            {error && <div className="error">{error}</div>}
            {isLoading ? <div className="loading">Loading...</div> : <MapList maps={data.Results} />}
        </div>
    );
};

export default Weather;