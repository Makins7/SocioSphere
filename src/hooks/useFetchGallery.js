import { useState, useEffect } from 'react';

const useFetchGallery = () => {
  // State for storing the gallery images
  const [images, setImages] = useState([]);
  // State for managing the number of results per page (for future pagination feature)
  const [resultsPerPage, setResultsPerPage] = useState(0);
  // State for tracking any errors during the fetch operation
  const [error, setError] = useState(null);
  // State for indicating when data is being fetched
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Base URL for the API, pulled from environment variables
    const baseUrl = process.env.REACT_APP_API_URL;
    // Start fetching data; indicate loading state
    setIsLoading(true);

    fetch(`${baseUrl}/gallery`, { method: 'GET' })
      .then(response => {
        // Check the content type of the response
        const contentType = response.headers.get("content-type");
        
        // Throw an error if the network response was not ok
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        // Ensure the response is in JSON format
        if (!contentType || !contentType.includes("application/json")) {
          return response.text().then(text => {
            throw new TypeError(`Response not valid JSON: ${text}`);
          });
        }
        
        return response.json();
      })
      .then(data => {
        // Process each image, prepending the base URL to the image path
        const updatedImages = data.gallery.map(pic => ({
          ...pic,
          image: `${baseUrl}${pic.image}`
        }));
        // Update state with the processed images
        setImages(updatedImages);
        setResultsPerPage(updatedImages.length);
      })
      .catch(error => {
        // Log and set any errors that occur during the fetch operation
        console.error('Something went wrong with the fetch request:', error);
        setError(error);
      })
      .finally(() => {
        // Once the operation is complete or fails, update loading state
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Return the images, pagination control, loading, and error states
  return { images, resultsPerPage, isLoading, error };
};

export default useFetchGallery;














// import { useState, useEffect } from 'react';

// const useFetchGallery = () => {
//   const [images, setImages] = useState([]);
//   const [resultsPerPage, setResultsPerPage] = useState(0);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const baseUrl = process.env.REACT_APP_API_URL; 

//     fetch(`${baseUrl}/gallery`, {method:'GET'})
//       .then(response => {
//         const contentType = response.headers.get("content-type");
        
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         if (!contentType || !contentType.includes("application/json")) {
//           throw new TypeError("Response is not valid JSON");
//         }

//         return response.json();
//       })
//       .then(data => {
//         // Prepend base URL to each image path
//         const updatedImages = data.map(pic => ({
//           ...pic,
//           image: `${baseUrl}${pic.image}` 
//         }));
//         setImages(updatedImages);
//         setResultsPerPage(updatedImages.length);
//       })
//       .catch(error => {
//         console.error('Something went wrong with the fetch request:', error)
//         setError(error);
//       });
//   }, []);
  
//   return { images, resultsPerPage, error };
// };

// export default useFetchGallery;
























// import { useState, useEffect } from 'react';


// // hooks/useFetchGallery.js : custom hook called useFetchGallery.js that handles fetching the gallery data
// // Dynamically handle image URLs so they adapt to different environments without hardcoding the domain, we modify useFetchGallery hook to prepend the base URL to each image's path.



// const useFetchGallery = () => {

//   const [images, setImages] = useState([]);
//   const [resultsPerPage, setResultsPerPage] = useState(0);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     const baseUrl = process.env.REACT_APP_API_URL; // Get base URL from environment variables

//     fetch(`${baseUrl}/gallery`, {method:'GET'})
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Prepend base URL to each image path
//         const updatedImages = data.map(pic => ({
//           ...pic,
//           image: `${baseUrl}${pic.image}` // Ensuring pic.image contains the full URL
//         }));
//         setImages(updatedImages);
//         setResultsPerPage(updatedImages.length);
//       })
//       .catch(error => {
//         console.error('Something went wrong with the fetch request:', error)
//         setError(error);
//       });
//   }, []) // Empty dependency array to run once on component mount
  
//   return { images, resultsPerPage, error } ;
// };




// export default useFetchGallery



