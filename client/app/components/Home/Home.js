import React, {useState} from 'react'

const Home = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    long: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCoordinatesHandler = async () => {
    setIsLoading(true);
    try {
        const { coords } = await getCurrentPosition();
        const { latitude, longitude } = coords;
        // Handle coordinates
        setCoordinates({
          lat: latitude,
          long: longitude,
        })
        // Loading
        setIsLoading(false);

    } catch (error) {
        // Handle error
        console.error(error);
        setIsLoading(false);
    }
  }

  function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  if(isLoading){
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div>
      <button onClick={fetchCoordinatesHandler} >Get Bus Stops</button>
      <p>Latitude: {coordinates.lat} Longitude: {coordinates.long}</p>
    </div>
  )
}

export default Home;

