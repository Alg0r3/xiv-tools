import useFetch from './useFetch';

const calcForecast = (time = 0) => {
    const unixSeconds = Date.now() / 1000 + time;
    const eorzeaHour = Math.trunc(unixSeconds / 175);
    const eorzeaDay = Math.trunc(unixSeconds / 4200);
    const increment = (eorzeaHour + 8 - (eorzeaHour % 8)) % 24;
    const calcBase = eorzeaDay * 100 + increment;
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
        else if (val.match(/Weather[0-9]$/gm) && data[val] !== null) arrWeather.push(data[val]);
    }

    const weather = [];
    let time = -1400;

    for (let i = 0; i < 10; i++) {
        weather.push(
            <td key={i} className="forecast-cell">
                {error && <div className="error">{error}</div>}
                {isLoading ? <div className="loading">Loading...</div> : <span>{calcWeather(calcForecast(time), arrRate, arrWeather)}</span>}
            </td>
        );
        time += 1400;
    }

    return(
        <>
            {weather}
        </>
    );
};

export default Forecast;