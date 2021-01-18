const MapList = ({maps}) => {
    return(
        <div className="map-list">
            {maps.map(map => (
                <div key={map.ID}>{map.PlaceName.Name_en}</div>
            ))}
        </div>
    );
};

export default MapList;