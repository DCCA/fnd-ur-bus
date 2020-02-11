import React from 'react';

export default function BusStopCard(props) {
  const getEstimatesHandler = e => {
    console.log(typeof props.fetchEstimates);
    if (typeof props.fetchEstimates === 'function') {
      props.fetchEstimates(e);
    }
  };
  return (
    <div
      value={props.busStops.StopNo}
      className='mt3 p2 border rounded flex'
      onClick={getEstimatesHandler.bind(this)}
    >
      <div
        style={{
          width: '60%',
          backgroundImage:
            'url(' +
            'https://maps.googleapis.com/maps/api/staticmap?center=' +
            props.busStops.Latitude +
            ',' +
            props.busStops.Longitude +
            '&zoom=16&size=200x200&maptype=roadmap&markers=color:green%7C' +
            '%7C' +
            props.busStops.Latitude +
            ',' +
            props.busStops.Longitude +
            '&key=' +
            props.maps +
            '),' +
            'url(https://picsum.photos/300/300)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className='p2 flex flex-column'>
        <h1 className='p1 bold h3'>Name:</h1>
        <h1 className='p1'>{props.busStops.Name}</h1>
        <p className='p1 h3'>Stop Numb:</p>
        <p className='p1'>{props.busStops.StopNo}</p>
        <p className='p1 h3'>On Street:</p>
        <p className='p1'>{props.busStops.OnStreet}</p>
        <p className='p1 h3'>Routes:</p>
        <p className='p1'>{props.busStops.Routes}</p>
        <button className='m1 flex-auto'>Select</button>
      </div>
    </div>
  );
}
