import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

declare global {
  interface Window {
    locateMe: () => void;
  }
}

export default function NairobiBinsMap() {
  useEffect(() => {
    // Initialize map
    const map = L.map('map').setView([-1.284722, 36.824444], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Bins data (realistic clocks + smart statuses)
    type BinStatus = 'available' | 'full' | 'maintenance';

    const bins: {
      name: string;
      lat: number;
      lng: number;
      status: BinStatus;
      wasteTypes: string[];
    }[] = [
      {
        name: 'Kenyatta Avenue Clock',
        lat: -1.286389,
        lng: 36.817223,
        status: 'available',
        wasteTypes: ['plastic'],
      },
      {
        name: 'Moi Avenue Clock',
        lat: -1.284722,
        lng: 36.824444,
        status: 'full',
        wasteTypes: ['organic'],
      },
      {
        name: 'Tom Mboya Clock',
        lat: -1.280278,
        lng: 36.8275,
        status: 'maintenance',
        wasteTypes: ['metal'],
      },
      {
        name: 'Kencom Clock',
        lat: -1.2845,
        lng: 36.8201,
        status: 'available',
        wasteTypes: ['ewaste'],
      },
    ];

    // Status colors
    const statusColors = {
      available: 'green',
      full: 'red',
      maintenance: 'purple',
    };

    // Add bins to map
    bins.forEach((bin) => {
      const marker = L.marker([bin.lat, bin.lng], {
        icon: L.divIcon({
          className: '',
          html: `<svg xmlns='http://www.w3.org/2000/svg' fill='${statusColors[bin.status]}' width='30' height='30' viewBox='0 0 16 16'>
            <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zM8 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0A.5.5 0 0 1 11 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z'/>
            <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h3a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 1 .5-.5H5a.5.5 0 0 1 .5.5H10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5H2.5z'/>
          </svg>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        }),
      }).addTo(map);

      marker.bindPopup(
        `<b>${bin.name}</b><br>Status: ${bin.status}<br>Waste Types: ${bin.wasteTypes.join(', ')}`
      );
    });

    // Locate user
    const locateMe = () => {
      map.locate({ setView: true, maxZoom: 17 });
    };

    map.on('locationfound', function (e) {
      L.marker(e.latlng).addTo(map)
        .bindPopup('You are here').openPopup();
    });

    map.on('locationerror', function () {
      alert('Could not get your location.');
    });

    // Make locate globally accessible
    window.locateMe = locateMe;

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
      <button
        onClick={() => window.locateMe()}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 1000,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}
      >
        📍
      </button>
    </div>
  );
}
