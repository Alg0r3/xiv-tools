import Timer from './Timer';
import Forecast from './Forecast';

const MapList = ({maps}) => {
    return(
        <table className="map-list">
            <thead>
                <tr>
                    <Timer />
                </tr>
            </thead>
            <tbody>
                {maps.map(map => (        
                    <tr key={map.ID} className="map-row">    
                        <td className="map-name">{map.PlaceName.Name_en}</td>
                        <Forecast rateId={map.TerritoryType.WeatherRate}/>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MapList;