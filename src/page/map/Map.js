import React from 'react';
import './map.scss';
import { useParams } from 'react-router-dom';
const Map = () => {
  const { lat, lng, address, name } = useParams();
  return (
    <div className='content'>
      <div className='map-header'>
        <h1>GOOGLE MAP</h1>
        <h2>
          <strong>Name</strong>: {name}
        </h2>
        <h2>
          <strong>Address</strong>: {address}
        </h2>
      </div>
      <div className='google-map-code'>
        <iframe
          src={`https://maps.google.com/maps?q=${lat}, ${lng}&z=15&output=embed`}
          width='100%'
          title='My Daily Marathon Tracker'
          height='600'
          frameborder='0'
          style={{ border: 0 }}
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
