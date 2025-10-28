/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import Map, { Source, Layer, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLazyQuery } from '@apollo/client';
import { GET_PARCEL_DETAILS } from '@/components/ParcelQuery';
import { 
  Drawer, 
  Typography, 
  Box, 
  CircularProgress, 
  IconButton,
  TextField,
  Paper,
  Chip,
  Fade,
  Tooltip,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropertyDetails from '@/components/PropertyDetails';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapComponent() {
  const [parcelId, setParcelId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [hoveredParcel, setHoveredParcel] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  const [fetchParcelDetails, { loading, error, data }] = useLazyQuery(GET_PARCEL_DETAILS);

  const handleClick = useCallback((event: any) => {
    try {
      if (!mapLoaded) {
        console.log("Map not fully loaded yet");
        return;
      }

      const map = event.target;
      let features = [];
      
      try {
        features = map.queryRenderedFeatures(event.point, {
          layers: ["parcel-fills"]
        });
      } catch (layerError) {
        console.log("Layer-specific query failed:", layerError);
        
        try {
          const allFeatures = map.queryRenderedFeatures(event.point);
          features = allFeatures.filter((f: any) => f.source === 'parcels');
        } catch (allError) {
          console.error("All features query failed:", allError);
          return;
        }
      }
      
      if (features.length > 0) {
        const clickedParcelId = features[0].properties?.ID;
        
        if (!clickedParcelId) {
          console.error("No ID found in feature properties!");
          return;
        }
        
        setParcelId(clickedParcelId);
        fetchParcelDetails({ variables: { parcelId: clickedParcelId } });
        setIsDrawerOpen(true);
      }
    } catch (error) {
      console.error("Click handler error:", error);
    }
  }, [mapLoaded, fetchParcelDetails]);

  const handleSearch = async () => {
    if (!searchValue || !mapRef.current) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchValue)}.json?access_token=${MAPBOX_TOKEN}&limit=1`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: 18,
          duration: 1500
        });
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMouseMove = useCallback((event: any) => {
    if (!mapLoaded) return;
    
    const map = event.target;
    const features = map.queryRenderedFeatures(event.point, {
      layers: ['parcel-fills']
    });
    
    if (features.length > 0) {
      map.getCanvas().style.cursor = 'pointer';
      setHoveredParcel(features[0].properties?.ID);
    } else {
      map.getCanvas().style.cursor = '';
      setHoveredParcel(null);
    }
  }, [mapLoaded]);

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)' }}>
      <Fade in={mapLoaded && !isDrawerOpen}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 80,
            left: 20,
            zIndex: 10,
          }}
        >
          <Tooltip title="Click on any parcel to view property details" arrow>
            <Chip
              icon={<InfoOutlinedIcon />}
              label="Click parcels for details"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                fontWeight: 500,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
          </Tooltip>
        </Box>
      </Fade>

      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: -73.9857,
          latitude: 40.7484,
          zoom: 15
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        interactiveLayerIds={['parcel-fills']}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onLoad={() => {
          console.log("Map loaded!");
          setMapLoaded(true);
        }}
      >
        <NavigationControl position="top-right" style={{ marginTop: '100px' }} />
        
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
              'fill-color': [
                'case',
                ['==', ['get', 'ID'], hoveredParcel || ''],
                '#1976d2',
                '#4fc3f7'
              ],
              'fill-opacity': [
                'case',
                ['==', ['get', 'ID'], hoveredParcel || ''],
                0.5,
                0.25
              ]
            }}
          />
          <Layer
            id="parcel-lines"
            type="line"
            source-layer="attom-parcels"
            paint={{
              'line-color': [
                'case',
                ['==', ['get', 'ID'], hoveredParcel || ''],
                '#0d47a1',
                '#0288d1'
              ],
              'line-width': [
                'case',
                ['==', ['get', 'ID'], hoveredParcel || ''],
                2.5,
                1
              ],
              'line-opacity': 0.8
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
            width: 500,
            maxWidth: '95vw',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box 
            sx={{ 
              background: 'linear-gradient(135deg, #2d7a6e 0%, #1e5248 100%)',
              color: 'white',
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {data?.reonomyProperties?.items?.[0]?.address_line1 || 'Property Details'}
              </Typography>
              {data?.reonomyProperties?.items?.[0] && (
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {data.reonomyProperties.items[0].city}, {data.reonomyProperties.items[0].state} {data.reonomyProperties.items[0].zip5}
                </Typography>
              )}
              {parcelId && (
                <Chip
                  label={`Parcel ID: ${parcelId}`}
                  size="small"
                  sx={{
                    mt: 1.5,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 500
                  }}
                />
              )}
            </Box>
            <IconButton 
              onClick={() => setIsDrawerOpen(false)} 
              sx={{ 
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflow: 'auto', bgcolor: '#fafafa' }}>
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </Box>
            )}
            
            {error && (
              <Box sx={{ m: 3 }}>
                <Paper sx={{ p: 3, bgcolor: '#ffebee', border: '1px solid #ef5350' }}>
                  <Typography color="error" fontWeight={600}>
                    Error loading data
                  </Typography>
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {error.message}
                  </Typography>
                </Paper>
              </Box>
            )}

            {!loading && !error && data && <PropertyDetails data={data} />}
            
            {!loading && !error && !data && (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <LocationOnIcon sx={{ fontSize: 60, color: '#bdbdbd', mb: 2 }} />
                <Typography color="text.secondary">
                  Select a parcel on the map to view property details
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}