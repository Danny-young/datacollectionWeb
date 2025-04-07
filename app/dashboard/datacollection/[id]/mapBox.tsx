'use client';

import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Define the Property interface
interface Property {
  id?: number;
  agent_id: string;
  first_name: string;
  last_name: string;
  electoral_area: string;
  locality: string;
  street_name: string;
  valuation_no: string;
  data_type?: string;
  data_type_info: string;
  createdAt: string;
  geolocation: {
    longitude: string | number;
    latitude: string | number;
    accuracy: string;
  };
  phone_number?: string;
  nationality?: string;
  id_type?: string;
  id_number?: string;
}

interface MapComponentProps {
  property: Property;
}

const MapComponent: React.FC<MapComponentProps> = ({ property }) => {
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Check if the map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      setMapError('Map container not found!');
      return;
    }

    // Get Mapbox token
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    
    // Validate token
    if (!mapboxToken) {
      setMapError('Mapbox access token is missing. Please add it to your environment variables.');
      console.error('Missing Mapbox token. Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env.local file');
      return;
    }

 
    mapboxgl.accessToken = mapboxToken;

    // Debug coordinate information
    console.log('Property coordinates:', {
      lng: property.geolocation?.longitude, 
      lat: property.geolocation?.latitude
    });

    // Validate coordinates
    let lng: number, lat: number;
    
    try {
      lng = typeof property.geolocation.longitude === 'string' 
        ? parseFloat(property.geolocation.longitude) 
        : Number(property.geolocation.longitude);
      
      lat = typeof property.geolocation.latitude === 'string' 
        ? parseFloat(property.geolocation.latitude) 
        : Number(property.geolocation.latitude);
        
      if (isNaN(lng) || isNaN(lat)) {
        setMapError('Invalid coordinates: values cannot be converted to numbers');
        return;
      }
      
      if (Math.abs(lng) > 180 || Math.abs(lat) > 90) {
        setMapError('Coordinates out of valid range (lng: -180 to 180, lat: -90 to 90)');
        return;
      }
    } catch (error) {
      setMapError(`Error parsing coordinates: ${error instanceof Error ? error.message : String(error)}`);
      return;
    }

    // Initialize the map
    let mapInstance: mapboxgl.Map;
    
    try {
      console.log('Initializing map with coordinates:', [lng, lat]);
      
      // Use default coordinates for Ghana if none provided
      const defaultCenter = [-0.220164, 5.603717]; // Ghana default
      const center = (lng !== 0 && lat !== 0) ? [lng, lat] : defaultCenter;
      
      mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12', // Using streets style for better visibility
        center: center as [number, number],
        zoom: 15, // Closer zoom to see details
      });

      // Add navigation controls
      mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
    } catch (error) {
      setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : String(error)}`);
      console.error('Map initialization error:', error);
      return;
    }

    // Handle map load event
    mapInstance.on('load', () => {
      setIsMapLoaded(true);
      console.log('Map loaded successfully');
      
      try {
        // Only add marker if we have valid coordinates
        if (lng !== 0 && lat !== 0) {
          // Add marker to map
          const marker = new mapboxgl.Marker({ color: '#ff69b4' })
            .setLngLat([lng, lat])
            .addTo(mapInstance);

          // Create popup with property info
          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
              <div style="padding: 10px;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold;">${property.first_name} ${property.last_name}</h3>
                <p style="margin: 0 0 5px 0;"><strong>Locality:</strong> ${property.locality}</p>
                <p style="margin: 0 0 5px 0;"><strong>Street:</strong> ${property.street_name}</p>
                <p style="margin: 0 0 5px 0;"><strong>Valuation No:</strong> ${property.valuation_no}</p>
              </div>
            `);

          // Show popup on hover
          marker.getElement().addEventListener('mouseenter', () => {
            popup.setLngLat([lng, lat]).addTo(mapInstance);
          });

          // Hide popup on mouseleave
          marker.getElement().addEventListener('mouseleave', () => {
            popup.remove();
          });

          // Center map on marker with animation
          mapInstance.flyTo({
            center: [lng, lat],
            zoom: 16,
            essential: true,
            duration: 1000
          });
        } else {
          console.warn('Using default coordinates as property has invalid or zero coordinates');
        }
      } catch (error) {
        console.error('Error adding marker to map:', error);
        setMapError(`Error adding marker: ${error instanceof Error ? error.message : String(error)}`);
      }
    });

    // Handle map errors
    mapInstance.on('error', (e) => {
      console.error('Mapbox error:', e);
      setMapError(`Mapbox error: ${e.error instanceof Error ? e.error.message : 'Unknown error'}`);
    });

    // Clean up on component unmount
    return () => {
      if (mapInstance) mapInstance.remove();
    };
  }, [property]); // Re-run if property changes

  return (
    <div className="relative w-full">
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
            <p className="font-bold">Map Error</p>
            <p>{mapError}</p>
            <p className="text-sm mt-2">Please check your Mapbox configuration and coordinates.</p>
          </div>
        </div>
      )}
      
      <div 
        id="map" 
        className="rounded-lg shadow-md" 
        style={{ 
          width: '100%', 
          height: '400px', 
          opacity: mapError ? 0.3 : 1 
        }}
      ></div>
      
      {!mapError && !isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 rounded-lg">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-700">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;





