// StrainPage.jsx
import { useState, useEffect } from 'react';

const StrainPage = () => {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'http://example.com/api/plants' with the actual endpoint of your Django backend
    fetch('http://example.com/api/plants')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPlants(data); // Assuming the backend returns an array of plant names
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []); // The empty array as a second argument ensures the effect runs only once after the initial render

  return (
    <div>
      <h1>Strain Page</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {plants.map((plant, index) => (
          <li key={index}>{plant.name}</li> // Replace 'plant.name' with the actual property that holds the name in your data
        ))}
      </ul>
    </div>
  );
};

export default StrainPage;
