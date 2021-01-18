// Trying to calculate current Weather for the map Anemos Eureka

const calcForecast = (date) => {
    const unixSeconds = parseInt(date.getTime() / 1000);
    const bell = unixSeconds / 175;
    const increment = (bell + 8 - (bell % 8)) % 24;
    
    let sun = unixSeconds / 4200;
    sun = (sun << 32) >>> 0;

    const calcBase = sun * 100 + increment;
    const step1 = (calcBase << 11) ^ calcBase;
    const step2 = (step1 >>> 8) ^ step1;

    return step2 % 100;
};

const calcWeather = (int, rates) => {
    if (int <= rates.Rate0) {
        return rates.Weather0.Name;
    }

    if (int <= rates.Rate0 + rates.Rate1) {
        return rates.Weather1.Name;
    }

    if (int <= rates.Rate0 + rates.Rate1 + rates.Rate2) {
        return rates.Weather2.Name;
    }

    if (int <= rates.Rate0 + rates.Rate1 + rates.Rate2 + rates.Rate3) {
        return rates.Weather3.Name;
    }
};

const currDate = new Date();
const forecastInt = calcForecast(currDate);

const anemosRates = {
    "ID": 91,
    "Rate0": 30,
    "Rate1": 30,
    "Rate2": 30,
    "Rate3": 10,
    "Rate4": 0,
    "Rate5": 0,
    "Rate6": 0,
    "Rate7": 0,
    "Weather0": {"Name": "Fair Skies"},
    "Weather1": {"Name": "Gales"},
    "Weather2": {"Name": "Showers"},
    "Weather3": {"Name": "Snow"},
    "Weather4": null,
    "Weather5": null,
    "Weather6": null,
    "Weather7": null
};

const currWeather = calcWeather(forecastInt, anemosRates);

console.log(currDate);
console.log(forecastInt);
console.log(currWeather);