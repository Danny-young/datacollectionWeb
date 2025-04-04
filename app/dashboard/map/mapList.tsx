'use client';

import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/navigation'; // For navigation in Next.js
import type { Map } from 'mapbox-gl';

// Ensure the Mapbox access token is set
if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
  console.error('Mapbox access token is missing!');
}

// @ts-ignore - Ignoring the read-only property error
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Define the Property interface
interface Property {
  id: number;
  agent_id: string;
  first_name: string;
  last_name: string;
  electoral_area: string;
  locality: string;
  street_name: string;
  valuation_no: string;
  geolocation: {
    longitude: string | number;
    latitude: string | number;
    accuracy: string;
  };
  data_type: string;
  data_type_info: string;
  createdAt: string;
}

interface MapComponentProps {
  property: Property[];
}

const MapComponent: React.FC<MapComponentProps> = ({ property }) => {
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    // Check if the map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container not found!');
      return;
    }

    // Log the property data to debug
    console.log('Property data:', property);
    console.log('Number of properties:', property.length);

    // Initialize the map
    const map = new mapboxgl.Map({
      container: 'map', // The HTML element ID where the map will be rendered
      style: 'mapbox://styles/mapbox/light-v11', // Map style
      center: [-0.220164, 5.603717], // Starting position [lng, lat]
      zoom: 12, // Starting zoom level
      attributionControl: false, // Optional: Disable default attribution control
      interactive: true, // Optional: Enable/disable user interaction
    });

    // Add error handling
    map.on('error', (e: { error: any }) => {
      console.error('Map error:', e.error);
    });

    map.on('load', () => {
      try {
        // Add markers for each property
        property.forEach((entry: Property) => {
          const { longitude, latitude } = entry.geolocation;
          
          // Skip if coordinates are invalid
          if (!longitude || !latitude) {
            console.warn('Invalid coordinates for property:', entry.id);
            return;
          }
          
          console.log('Adding marker for property:', entry.id, 'at coordinates:', longitude, latitude);

          // Create a marker and set its coordinates
          const marker = new mapboxgl.Marker({ color: '#ff69b4' })
            .setLngLat([Number(longitude), Number(latitude)])
            .addTo(map);

          // Create a popup for the marker
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div>
              <h3>${entry.first_name} ${entry.last_name}</h3>
              <p><strong>Locality:</strong> ${entry.locality}</p>
              <p><strong>Street:</strong> ${entry.street_name}</p>
              <p><strong>Valuation No:</strong> ${entry.valuation_no}</p>
            </div>
          `);

          // Show popup on hover
          marker.getElement().addEventListener('mouseenter', () => {
            popup.addTo(map);
          });

          // Hide popup on mouse leave
          marker.getElement().addEventListener('mouseleave', () => {
            popup.remove();
          });

          // Navigate to property page on click
          marker.getElement().addEventListener('click', () => {
            router.push(`/property/${entry.id}`); // Navigate to the property page
          });
        });
      } catch (error) {
        console.error('Error adding markers:', error);
      }
    });

    // Cleanup on component unmount
    return () => map.remove();
  }, [router, property]); // Re-run effect if router or property data changes

  return (
    <div
      id="map"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    ></div>
  );
};

export default MapComponent;