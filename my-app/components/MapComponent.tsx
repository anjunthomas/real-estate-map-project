/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react';
import { useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { LayerProps } from 'react-map-gl/mapbox';
import { useLazyQuery } from '@apollo/client';
import { GET_PARCEL_DETAILS } from '@/components/ParcelQuery';
import { Drawer, Typography, Box, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropertyDetails from '@/components/PropertyDetails';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapComponent() {
  const [parcelId, setParcelId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [fetchParcelDetails, { loading, error, data }] = useLazyQuery(GET_PARCEL_DETAILS);

  const handleClick = (event: any) => {
    if (event.features && event.features.length > 0) {
      const id = event.features[0].properties.ID;
      setParcelId(id);
      fetchParcelDetails({ variables: { parcelId: id } });
      setIsDrawerOpen(true);
    }
  };

  const lineLayer: LayerProps = {
    id: 'parcel-lines',
    type: 'line',
    'source-layer': 'attom-parcels',
    paint: {
      'line-color': '#000',
      'line-width': 2
    }
  };

  const fillLayer: LayerProps = {
    id: 'parcel-fills',
    type: 'fill',
    'source-layer': 'attom-parcels',
    paint: {
      'fill-color': '#088',
      'fill-opacity': 0.3
    }
  };

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
        interactiveLayerIds={['parcel-lines', 'parcel-fills']}
        onClick={handleClick}
      >
        <Source
          id="parcels"
          type="vector"
          url="mapbox://svayser.parcel-boundaries"
          promoteId="ID"
        >
          <Layer {...fillLayer} />
          <Layer {...lineLayer} />
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