import MapsQuery from './MapsQuery.json';

const App = () => {
    const getMaps = async () => {
        const response = await fetch('https://xivapi.com/Search', {
            method: 'POST',
            body: JSON.stringify(MapsQuery)
        });
        
        if (response.status !== 200) {
            throw new Error('Cannot fetch the data.');
        }
        
        const data = await response.json();
        
        return data;
    };
    
    getMaps()
        .then(data => console.log(`resolved: ${data}`))
        .catch(err => console.log(`rejected: ${err.message}`));

    return (
        <div className='App'>
            W.I.P.
        </div>
    );
};

export default App;