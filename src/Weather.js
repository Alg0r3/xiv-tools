import useFetch from './useFetch';
import MapList from './MapList';

const Weather = () => {
    const {data, isPending, error} = useFetch(`https://xivapi.com/Search?indexes=Map&columns=ID,PlaceName.Name_de,PlaceName.Name_en,PlaceName.Name_fr,PlaceName.Name_ja,TerritoryType.WeatherRate&filters=GameContentLinks.TerritoryType!,GamePatch.Banner!,TerritoryType.Aetheryte!,TerritoryType.BGM!!,TerritoryType.PlaceNameIconID>-1,TerritoryType.WeatherRate>0,PlaceNameRegionTargetID=22`);
    
    return (
        <div className="weather">
            <h1>Eorzea Weather Forecast</h1>
            {error && <div className="error">{error}</div>}
            {isPending && <div className="loading">Loading...</div>}
            <MapList maps={data}/>
        </div>
    );
};

export default Weather;