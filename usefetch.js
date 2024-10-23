// hooks/useFetchSurahs.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchSurahs = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  return { surahs, loading, error };
};

export default useFetchSurahs;
