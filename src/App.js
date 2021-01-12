import React from 'react';
import './App.css';

const App = () => {
    const getWeatherRate = async () => {
        const response = await fetch('https://xivapi.com/WeatherRate/91');
        
        if (response.status !== 200) {
            throw new Error('Cannot fetch the data.');
        }
        
        const data = await response.json();
        
        return data;
    };
    
    getWeatherRate()
        .then(data => console.log(`resolved: ${data}`))
        .catch(err => console.log(`rejected: ${err.message}`));

    return (
        <div className='App'>
            W.I.P.
        </div>
    );
};

export default App;