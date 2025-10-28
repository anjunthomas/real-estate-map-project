# Real Estate Mapping Application

An interactive map for to explore property parcels and view detailed information. Click any parcel to see building specs, lot details, zoning info, and more.

![Main View](screenshots/RealEstateHomePage.png)
*Interactive parcel map*

**Live Demo:** [https://real-estate-map-project-54qbw2mjf-anjunthomas-projects.vercel.app](https://real-estate-map-project-54qbw2mjf-anjunthomas-projects.vercel.app)

## Features

- Click parcels to view property details
- Hover effects for visual feedback
- Full-screen map interface

![Property Details](screenshots/SidePanelView.png)
*Property details panel*

## Setup

```bash
# Install dependencies
npm install

# Add your Mapbox token to .env.local
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

**Mapbox GL JS** : Interactive mapping
- Created vector tilesets in Mapbox Studio by uploading parcel boundary data
- Configured custom styling for fills and borders with hover states
- [Mapbox Documentation](https://docs.mapbox.com/mapbox-gl-js/)

**GraphQL + Apollo Client**  : Data fetching
- Single endpoint for all property data
- Only fetch what you need (no over fetching)
- Built-in caching for better performance
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)

**Azure Data API Builder** : GraphQL server
- Auto-generates GraphQL schema from database tables
- Handles filtering and pagination out of the box
- [Azure Data API Builder](https://learn.microsoft.com/en-us/azure/data-api-builder/)

**Next.js + TypeScript** : Frontend framework

**Material-UI** : UI components

## How It Works

1. User clicks a parcel on the map
2. Mapbox captures the click and gets the parcel ID
3. Apollo Client fetches property details via GraphQL
4. Property info displays in a side drawer

## Future Plans

- **Address search** using Google Geocoding API : convert addresses to coordinates, then use `executeGetParcelByLocation` to find the parcel
  - [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding)
- Property filtering by type, year, size
- Export data to CSV/PDF

## Testing

Tests would be run with:
```bash
npm run test
```

## Deploy

Built for Vercel:
```bash
vercel
```

---

Built with Next.js, Mapbox, and GraphQL
