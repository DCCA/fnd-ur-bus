import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Set States
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    long: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [busStops, setBusStops] = useState({});
  const [showBusStops, setShowBusStops] = useState(false);
  const [estimates, setEstimates] = useState({});
  const [showEstimates, setShowEstimates] = useState(false);
  const [maps, setMaps] = useState({});

  useEffect(() => {
    getMaps();
  }, []);

  // Get coordinations from user
  const fetchCoordinatesHandler = async () => {
    setIsLoading(true);
    try {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;
      // Handle coordinates
      setCoordinates({
        lat: latitude.toFixed(5),
        long: longitude.toFixed(5)
      });
      // Loading
      setIsLoading(false);
    } catch (error) {
      // Handle error
      console.error(error);
      setIsLoading(false);
    }
  };

  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true
      });
    });
  }

  // Get the bus stops, based on the coordinates from user
  const fetchBusStops = () => {
    setIsLoading(true);
    // ?id=" + props.match.params.id)
    fetch('/get-bus-stops?lat=' + coordinates.lat + '&long=' + coordinates.long)
      // Runs when success
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setBusStops(response);
        setShowBusStops(true);
        setShowEstimates(false);
      })
      // Runs when error
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  // Get the next 6 buses that will serve that bus stop
  const fetchEstimates = event => {
    const stop = event.currentTarget.getAttribute('value');
    setIsLoading(true);

    fetch('/get-bus-estimates?stops=' + stop)
      // Runs when success
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        setEstimates(response);
        setShowBusStops(false);
        setShowEstimates(true);
      })
      // Runs when error
      .catch(error => {
        setIsLoading(false);
        setErrorList(error);
      });
  };
  // Get maps
  const getMaps = () => {
    fetch('/set-maps')
      .then(response => response.text())
      .then(response => setMaps(response))
      .catch(error => {
        console.error(error);
      });
  };

  // Handle loading
  if (isLoading) {
    return <p className='m3'>Loading...</p>;
  }

  return (
    <div className='m3'>
      <div>
        <h2>Instructions</h2>
        <ol>
          <li>1. Get your location</li>
          <li>2. Get bus stops</li>
          <li>3. Select your bus stop</li>
          <li>4. Get the next buses information</li>
        </ol>
      </div>
      <div className='flex flex-column m3'>
        <button
          className='rounded m1 p1 bold'
          onClick={fetchCoordinatesHandler}
        >
          Get Your Location
        </button>
        <button
          className='rounded m1 p1 bold'
          onClick={fetchBusStops}
          disabled={coordinates.lat === 0}
        >
          Get Bus Stops
        </button>
      </div>
      <div className='border rounded p1'>
        <p className='p1'>You are here: \/</p>
        <p className='p1'>Latitude: {coordinates.lat}</p>
        <p className='p1'>Longitude: {coordinates.long}</p>
      </div>
      {showBusStops
        ? Object.keys(busStops).map(keys => {
            return (
              <div
                value={busStops[keys].StopNo}
                className='mt3 p2 border rounded flex'
                onClick={fetchEstimates.bind(this)}
              >
                <div
                  style={{
                    width: '60%',
                    backgroundImage:
                      'url(' +
                      'https://maps.googleapis.com/maps/api/staticmap?center=' +
                      busStops[keys].Latitude +
                      ',' +
                      busStops[keys].Longitude +
                      '&zoom=16&size=200x200&maptype=roadmap&markers=color:green%7C' +
                      '%7C' +
                      busStops[keys].Latitude +
                      ',' +
                      busStops[keys].Longitude +
                      '&key=' +
                      maps +
                      '), url(https://picsum.photos/300/300)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div className='p2 flex flex-column'>
                  <h1 className='p1 bold h3'>Name:</h1>
                  <h1 className='p1'>{busStops[keys].Name}</h1>
                  <p className='p1 h3'>On Street:</p>
                  <p className='p1'>{busStops[keys].OnStreet}</p>
                  <p className='p1 h3'>Routes:</p>
                  <p className='p1'>{busStops[keys].Routes}</p>
                  <button className='m1 flex-auto'>Select</button>
                </div>
              </div>
            );
          })
        : null}
      {showEstimates
        ? Object.keys(estimates).map(keys => {
            return (
              <div className='mt3 p2 border rounded'>
                <h1>
                  Name / Num: {estimates[keys].RouteName} /{' '}
                  {estimates[keys].RouteNo}
                </h1>
                <p className='mt2 mb2'>
                  Direction: {estimates[keys].Direction}
                </p>
                {estimates[keys].Schedules.map(e => {
                  return (
                    <div className='border rounded pt1 pb1 mt1 mb1'>
                      <p className='p1'>Next bus in: {e.ExpectedCountdown}</p>
                      <p className='p1'>Scheduled: {e.ExpectedLeaveTime}</p>
                    </div>
                  );
                })}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Home;
