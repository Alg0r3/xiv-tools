import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(url);
        
            if (response.status !== 200) {
                throw new Error('Cannot fetch data from ressources.');
            }
        
            const data = await response.json();
        
            setData(data.Results);
            setIsPending(false);
            setError(null);
        };

        getData()
            .then(() => console.log('Resolved.'))
            .catch(err => {
                setIsPending(false);
                setError(err.message)
            });
    }, [url]);

    return {data, isPending, error};
}

export default useFetch;