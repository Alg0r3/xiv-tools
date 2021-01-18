import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(url);
        
            if (response.status !== 200) {
                throw new Error('Cannot fetch data from ressources.');
            }
        
            const data = await response.json();
        
            setData(data.Results);
            setIsLoading(false);
            setError(null);
        };

        getData()
            .then(() => console.log('Resolved.'))
            .catch(err => {
                setIsLoading(false);
                setError(err.message)
            });
    }, [url]);

    return {data, isLoading, error};
};

export default useFetch;