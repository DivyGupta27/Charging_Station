import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 28.6139, // Default center (e.g., Delhi)
  lng: 77.2090,
};

const MapView = () => {
  const [chargers, setChargers] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY, // stored in .env
  });

  useEffect(() => {
    fetch('https://charging-station-mssh.onrender.com/api/chargers/getcharger')
      .then((res) => res.json())
      .then((data) => setChargers(data))
      .catch((err) => console.error('Map data fetch error:', err));
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📍 Charger Map View</h1>
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={6}>
        {chargers.map((c) => (
          <Marker
            key={c._id}
            position={{ lat: c.location.lat, lng: c.location.lng }}
            onClick={() => setSelected(c)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.location.lat, lng: selected.location.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2 className="font-bold">{selected.name}</h2>
              <p>Status: {selected.status}</p>
              <p>Power: {selected.powerOutput} kW</p>
              <p>Connector: {selected.connectorType}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapView;
