import { useEffect, useState } from 'react';
import MapList from './MapList';

const App = () => {
    useEffect(() => {
        getMaps(22)
        .then(() => console.log('resolved'))
        .catch(err => console.log('rejected: ', err.message));
    }, []);
    
    const [maps, setMaps] = useState([]);

    const getMaps = async (id) => {
        const response = await fetch(`https://xivapi.com/Search?indexes=Map&columns=ID,PlaceName.Name_de,PlaceName.Name_en,PlaceName.Name_fr,PlaceName.Name_ja,TerritoryType.WeatherRate&filters=GameContentLinks.TerritoryType!,GamePatch.Banner!,TerritoryType.Aetheryte!,TerritoryType.BGM!!,TerritoryType.PlaceNameIconID>-1,TerritoryType.WeatherRate>0,PlaceNameRegionTargetID=${id}`);
        
        if (response.status !== 200) {
            throw new Error('Cannot fetch the data.');
        }
        
        const data = await response.json();
        
        setMaps(data.Results);
    };

    return (
        <div className="App">
            <h1>Weather Forecast</h1>
            <MapList maps={maps}/>
        </div>
    );
};

export default App;