// custom hook called useFetchGallery.js that handles fetching the gallery data
// hooks/useFetchGallery.js

import { useState, useEffect } from 'react';

const useFetchGallery = () => {
  const [images, setImages] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    fetch(`${baseUrl}/gallery`, {method:'GET'})
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setImages(data);
        setResultsPerPage(data.length);
      })
      .catch(error => {
        console.error('Something went wrong with the fetch request:', error)
        setError(error);
      });
  }, [])
  
  return { images, resultsPerPage, error } ;
};

export default useFetchGallery



