'use client'

import * as React from 'react';
import { useState } from 'react';
import Map, { Source, Layer,  } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { LayerProps } from 'react-map-gl/mapbox';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapComponent() {
  const [parcelId, setParcelId] = useState<string | null>(null);

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

  const handleClick = (event: any) => {
    if (event.features && event.features.length > 0) {
      setParcelId(event.features[0].properties.ID);
      console.log('Clicked parcel ID:', event.features[0].properties.ID);
    }
  };

  return (
    <div>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5
        }}
        style={{width: 1800, height: 800}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
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
        {parcelId && <p>Selected Parcel ID: {parcelId}</p>}
    </div>
  );
}