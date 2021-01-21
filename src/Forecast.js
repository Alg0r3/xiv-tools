import useFetch from './useFetch';

const calcForecast = (time = 0) => {
    const unixSeconds = Date.now() / 1000 + time;
    
    // 1 bell = 1 Eorzean hour, 1 sun = 1 Eorzean day 
    const bell = Math.trunc(unixSeconds / 175);
    const sun = Math.trunc(unixSeconds / 4200);

    const increment = (bell + 8 - (bell % 8)) % 24;

    const calcBase = sun * 100 + increment;
    const step1 = (calcBase << 11) ^ calcBase;
    const step2 = (step1 >>> 8) ^ step1;

    const weatherChance = step2 % 100;

    return weatherChance;
};

const calcWeather = (chance, rates, names) => {
    let sum = 0;

    for (let i = 0; i <= 7; i++) {
        sum += rates[i];
        if (chance < sum) return names[i].Name_en;
    }
};

const Forecast = ({rateId}) => {
    const {data, isLoading, error} = useFetch(`https://xivapi.com/WeatherRate/${rateId}`);
    const arrRate = [];
    const arrWeather = []

    for (let val in data) {
        if (val.match(/Rate/g)) arrRate.push(data[val]);
    }

    for (let val in data) {
        if (val.match(/Weather/g) && typeof(data[val]) === 'object' && data[val] !== null) arrWeather.push(data[val]);
    }

    const prevWeather = calcWeather(calcForecast(-1400), arrRate, arrWeather);
    const currWeather = calcWeather(calcForecast(), arrRate, arrWeather);
    const nextWeather = calcWeather(calcForecast(1400), arrRate, arrWeather);

    return(
        <>
            <td>
                {error && <div className="error">{error}</div>}
                {isLoading ? <div className="loading">Loading...</div> : prevWeather}
            </td>
            <td>
                {error && <div className="error">{error}</div>}
                {isLoading ? <div className="loading">Loading...</div> : currWeather}
            </td>
            <td>
                {error && <div className="error">{error}</div>}
                {isLoading ? <div className="loading">Loading...</div> : nextWeather}
            </td>
        </>
    );
};

export default Forecast;