// ApiViewModel.js
import { useEffect, useState } from 'react';

const useApiViewModel = () => {
  const [responseData, setResponseData] = useState('');

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch('https://your-api-endpoint.com/data');
      const data = await response.json();
      setResponseData(JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setResponseData('Error fetching data');
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []); // Fetch data on component mount

  return { responseData, fetchDataFromApi };
};

export default useApiViewModel;
