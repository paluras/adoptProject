import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);


                setData(response.data);
                setLoading(false);

            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
