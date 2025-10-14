'use client';

import { Box, Typography } from '@mui/material';

interface PropertyData {
  reonomyProperties?: {
    items?: Array<{
      parcel_id?: string;
      property_id?: string;
      address_line1?: string;
      city?: string;
      state?: string;
      zip4?: string;
      zip5?: string;
      year_built?: number;
      year_renovated?: number;
      floors?: number;
      sum_buildings_nbr?: number;
      existing_floor_area_ratio?: number;
      commercial_units?: number;
      residential_units?: number;
      total_units?: number;
      building_area?: number;
      sum_building_sqft?: number;
      max_floor_plate?: number;
      building_class?: string;
      frontage?: number;
      depth?: number;
      asset_type?: string;
      lot_size_sqft?: number;
      lot_size_acres?: number;
      zoning?: string;
      lot_size_depth_feet?: number;
      lot_size_frontage_feet?: number;
      census_tract?: string;
      opp_zone?: boolean;
      msa_name?: string;
      fips_county?: string;
      municipality?: string;
      borough_id?: number;
      mcd_name?: string;
      neighborhood_name?: string;
      zoning_district_1?: string;
      zoning_district_2?: string;
      special_purpose_district?: string;
      split_boundary?: boolean;
      sanborn_map_number?: string;
      zoning_map_number?: string;
    }>;
  };
}

interface PropertyDetailsProps {
  data: PropertyData;
}

const PropertyRow = ({ label, value }: { label: string; value: string | number | null | undefined }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      py: 1.5,
      borderBottom: '1px solid #f0f0f0',
      '&:last-child': {
        borderBottom: 'none'
      }
    }}
  >
    <Typography sx={{ color: '#666', fontSize: '14px' }}>
      {label}
    </Typography>
    <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '14px', textAlign: 'right' }}>
      {value || '-'}
    </Typography>
  </Box>
);

const PropertySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '20px' }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default function PropertyDetails({ data }: PropertyDetailsProps) {
  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Click on a parcel to view details</Typography>
      </Box>
    );
  }

  const property = data.reonomyProperties?.items?.[0];

  if (!property) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No property data found for this parcel.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <PropertySection title="Building">
        <PropertyRow label="Year Built" value={property.year_built} />
        <PropertyRow label="Year Renovated" value={property.year_renovated} />
        <PropertyRow label="Stories" value={property.floors} />
        <PropertyRow label="Number of Buildings" value={property.sum_buildings_nbr} />
        <PropertyRow 
          label="Existing Floor Area Ratio" 
          value={property.existing_floor_area_ratio} 
        />
        <PropertyRow label="Commercial Units" value={property.commercial_units} />
        <PropertyRow label="Residential Units" value={property.residential_units} />
        <PropertyRow label="Total Units" value={property.total_units} />
        <PropertyRow 
          label="Building Area" 
          value={property.sum_building_sqft ? `${Number(property.sum_building_sqft).toLocaleString()} sf` : property.building_area ? `${Number(property.building_area).toLocaleString()} sf` : '-'} 
        />
        <PropertyRow 
          label="Max Floor Plate" 
          value={property.max_floor_plate ? `${Number(property.max_floor_plate).toLocaleString()} sf` : '-'} 
        />
        <PropertyRow label="Building Class" value={property.building_class} />
        <PropertyRow 
          label="Frontage" 
          value={property.frontage ? `${property.frontage} sf` : '-'} 
        />
        <PropertyRow 
          label="Depth" 
          value={property.depth ? `${property.depth} sf` : '-'} 
        />
      </PropertySection>

      <PropertySection title="Lot">
        <PropertyRow label="Property Type" value={property.asset_type} />
        <PropertyRow 
          label="Lot Area SF" 
          value={property.lot_size_sqft ? `${Number(property.lot_size_sqft).toLocaleString()} sf` : '-'} 
        />
        <PropertyRow 
          label="Lot Area Acres" 
          value={property.lot_size_acres ? `${property.lot_size_acres} acres` : '-'} 
        />
        <PropertyRow label="Zoning" value={property.zoning} />
        <PropertyRow 
          label="Depth" 
          value={property.lot_size_depth_feet ? `${property.lot_size_depth_feet} ft` : '-'} 
        />
        <PropertyRow 
          label="Frontage" 
          value={property.lot_size_frontage_feet ? `${property.lot_size_frontage_feet} ft` : '-'} 
        />
        <PropertyRow label="Census Tract" value={property.census_tract} />
        <PropertyRow 
          label="Opportunity Zone" 
          value={property.opp_zone ? 'Yes' : 'No'} 
        />
      </PropertySection>

      <PropertySection title="Location">
        <PropertyRow 
          label="Metropolitan Statistical Area" 
          value={property.msa_name} 
        />
        <PropertyRow label="County" value={property.fips_county} />
        <PropertyRow label="Municipality" value={property.municipality} />
        <PropertyRow label="Minor Civil Division" value={property.mcd_name} />
        <PropertyRow label="Neighborhood" value={property.neighborhood_name} />
      </PropertySection>

      <PropertySection title="Zoning Info">
        <PropertyRow label="Zoning District 1" value={property.zoning_district_1} />
        <PropertyRow label="Zoning District 2" value={property.zoning_district_2} />
        <PropertyRow label="Special District 1" value={property.special_purpose_district} />
        <PropertyRow 
          label="Split Boundary" 
          value={property.split_boundary ? 'Yes' : 'No'} 
        />
        <PropertyRow label="Sandborn Map #" value={property.sanborn_map_number} />
        <PropertyRow label="Zoning Map #" value={property.zoning_map_number} />
      </PropertySection>
    </Box>
  );
}