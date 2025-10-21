/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react';
import { useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLazyQuery } from '@apollo/client';
import { GET_PARCEL_DETAILS } from '@/components/ParcelQuery';
import { Drawer, Typography, Box, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropertyDetails from '@/components/PropertyDetails';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapComponent() {
  const [parcelId, setParcelId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [fetchParcelDetails, { loading, error, data }] = useLazyQuery(GET_PARCEL_DETAILS);

  const handleClick = React.useCallback((event: any) => {
    try {
      if (!mapLoaded) {
        console.log("Map not fully loaded yet, skipping click");
        return;
      }

      const map = event.target;
      let features = [];
      
      try {
        // Query the parcel-fills layer
        features = map.queryRenderedFeatures(event.point, {
          layers: ["parcel-fills"]
        });
      } catch (layerError) {
        console.log("Layer-specific query failed:", layerError);
        
        // Fallback: query all features and filter by source
        try {
          const allFeatures = map.queryRenderedFeatures(event.point);
          features = allFeatures.filter((f: any) => f.source === 'parcels');
        } catch (allError) {
          console.error("All features query failed:", allError);
          return;
        }
      }
      
      if (features.length > 0) {
        console.log("Full feature object:", features[0]);
        console.log("Feature ID:", features[0].id);
        console.log("Feature Properties:", features[0].properties);
        
        // Get the ID from properties
        const clickedParcelId = features[0].properties?.ID;
        
        console.log("Clicked Parcel ID (maps to GraphQL parcel_id):", clickedParcelId);
        
        if (!clickedParcelId) {
          console.error("No ID found in feature properties!");
          return;
        }
        
        setParcelId(clickedParcelId);
        fetchParcelDetails({ variables: { parcelId: clickedParcelId } });
        setIsDrawerOpen(true);
      } else {
        console.log("No parcel features found at click point");
      }
    } catch (error) {
      console.error("Click handler error:", error);
    }
  }, [mapLoaded, fetchParcelDetails]);

  return (
    <div>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: -73.9857,
          latitude: 40.7484,
          zoom: 15
        }}
        style={{ width: '100%', height: '800px' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        interactiveLayerIds={['parcel-fills']}
        onClick={handleClick}
        onLoad={() => {
          console.log("Map loaded!");
          setMapLoaded(true);
        }}
      >
        <Source
          id="parcels"
          type="vector"
          url="mapbox://svayser.parcel-boundaries"
          promoteId="ID"
        >
          <Layer
            id="parcel-fills"
            type="fill"
            source-layer="attom-parcels"
            paint={{
              'fill-color': '#088',
              'fill-opacity': 0.3
            }}
          />
          <Layer
            id="parcel-lines"
            type="line"
            source-layer="attom-parcels"
            paint={{
              'line-color': '#000',
              'line-width': 2
            }}
          />
        </Source>
      </Map>

      <Drawer 
        anchor="right" 
        open={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 450,
            maxWidth: '90vw'
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box 
            sx={{ 
              p: 2, 
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Parcel Details
            </Typography>
            <IconButton onClick={() => setIsDrawerOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            )}
            
            {error && (
              <Box sx={{ mt: 2 }}>
                <Typography color="error">
                  Error loading data: {error.message}
                </Typography>
              </Box>
            )}

            {!loading && !error && data && <PropertyDetails data={data} />}
            
            {!loading && !error && !data && (
              <Typography>Click on a parcel to view details</Typography>
            )}
          </Box>

          {parcelId && (
            <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', bgcolor: '#f5f5f5' }}>
              <Typography variant="caption" color="text.secondary">
                Parcel ID: {parcelId}
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </div>
  );
}