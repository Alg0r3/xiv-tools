import Forecast from './Forecast';

const MapList = ({maps}) => {
    return(
        <table className="map-list">
            <tbody>
                {maps.map(map => (        
                    <tr key={map.ID}>    
                        <td>{map.PlaceName.Name_en}</td>
                        <Forecast rateId={map.TerritoryType.WeatherRate}/>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MapList;