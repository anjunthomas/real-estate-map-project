'use client';

import { Box, Typography, Paper, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LandscapeIcon from '@mui/icons-material/Landscape';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';

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

const InfoCard = ({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) => (
  <Paper 
    elevation={0}
    sx={{ 
      mb: 2.5,
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transform: 'translateY(-2px)'
      }
    }}
  >
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 2,
        bgcolor: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Box sx={{ color: '#1976d2', display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px', color: '#212121' }}>
        {title}
      </Typography>
    </Box>
    <Box sx={{ p: 2.5 }}>
      {children}
    </Box>
  </Paper>
);

const DetailRow = ({ 
  label, 
  value,
  highlight = false 
}: { 
  label: string; 
  value: string | number | null | undefined;
  highlight?: boolean;
}) => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 1.25,
      borderBottom: '1px solid #f0f0f0',
      '&:last-child': {
        borderBottom: 'none'
      }
    }}
  >
    <Typography 
      variant="body2" 
      sx={{ 
        color: '#616161',
        fontSize: '14px',
        fontWeight: 500
      }}
    >
      {label}
    </Typography>
    <Typography 
      variant="body2" 
      sx={{ 
        color: highlight ? '#1976d2' : '#212121',
        fontWeight: highlight ? 700 : 600,
        fontSize: '14px',
        textAlign: 'right'
      }}
    >
      {value !== null && value !== undefined && value !== '' ? value : '—'}
    </Typography>
  </Box>
);

const StatBox = ({ 
  label, 
  value,
  color = '#1976d2'
}: { 
  label: string; 
  value: string | number;
  color?: string;
}) => (
  <Box 
    sx={{ 
      p: 2,
      bgcolor: '#f5f5f5',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #e0e0e0'
    }}
  >
    <Typography 
      variant="h5" 
      sx={{ 
        fontWeight: 700, 
        color: color,
        mb: 0.5 
      }}
    >
      {value}
    </Typography>
    <Typography 
      variant="caption" 
      sx={{ 
        color: '#757575',
        fontSize: '12px',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
    >
      {label}
    </Typography>
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
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <StatBox 
              label="Year Built" 
              value={property.year_built || '—'} 
              color="#212121"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <StatBox 
              label="Stories" 
              value={property.floors || '—'} 
              color="#212121"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <StatBox 
              label="Total Units" 
              value={property.total_units || '—'} 
              color="#212121"
            />
          </Box>
        </Box>
      </Box>

      <InfoCard title="Building Information" icon={<HomeIcon />}>
        <DetailRow label="Year Renovated" value={property.year_renovated} />
        <DetailRow label="Number of Buildings" value={property.sum_buildings_nbr} />
        <DetailRow 
          label="Floor Area Ratio" 
          value={property.existing_floor_area_ratio} 
        />
        <DetailRow label="Commercial Units" value={property.commercial_units} />
        <DetailRow label="Residential Units" value={property.residential_units} />
        <DetailRow 
          label="Building Area" 
          value={property.sum_building_sqft 
            ? `${Number(property.sum_building_sqft).toLocaleString()} sq ft` 
            : '—'
          } 
          highlight
        />
        <DetailRow 
          label="Max Floor Plate" 
          value={property.max_floor_plate 
            ? `${Number(property.max_floor_plate).toLocaleString()} sq ft` 
            : '—'
          } 
        />
        <DetailRow label="Building Class" value={property.building_class} />
        <DetailRow label="Frontage" value={property.frontage ? `${property.frontage} ft` : '—'} />
        <DetailRow label="Depth" value={property.depth ? `${property.depth} ft` : '—'} />
      </InfoCard>

      <InfoCard title="Lot Information" icon={<LandscapeIcon />}>
        <DetailRow label="Property Type" value={property.asset_type} />
        <DetailRow 
          label="Lot Size" 
          value={property.lot_size_sqft 
            ? `${Number(property.lot_size_sqft).toLocaleString()} sq ft` 
            : '—'
          } 
          highlight
        />
        <DetailRow 
          label="Lot Size (Acres)" 
          value={property.lot_size_acres ? `${property.lot_size_acres} acres` : '—'} 
        />
        <DetailRow label="Zoning" value={property.zoning} />
        <DetailRow 
          label="Lot Depth" 
          value={property.lot_size_depth_feet ? `${property.lot_size_depth_feet} ft` : '—'} 
        />
        <DetailRow 
          label="Lot Frontage" 
          value={property.lot_size_frontage_feet ? `${property.lot_size_frontage_feet} ft` : '—'} 
        />
        <DetailRow label="Census Tract" value={property.census_tract} />
        <Box sx={{ mt: 2 }}>
          {property.opp_zone && (
            <Chip 
              label="Opportunity Zone" 
              color="success" 
              size="small"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>
      </InfoCard>

      <InfoCard title="Location" icon={<LocationCityIcon />}>
        <DetailRow label="Metropolitan Area" value={property.msa_name} />
        <DetailRow label="County" value={property.fips_county} />
        <DetailRow label="Municipality" value={property.municipality} />
        <DetailRow label="Neighborhood" value={property.neighborhood_name} />
      </InfoCard>

      {(property.zoning_district_1 || property.zoning_district_2) && (
        <InfoCard title="Zoning Details" icon={<MapIcon />}>
          <DetailRow label="Zoning District 1" value={property.zoning_district_1} />
          <DetailRow label="Zoning District 2" value={property.zoning_district_2} />
          <DetailRow label="Special District" value={property.special_purpose_district} />
          <DetailRow 
            label="Split Boundary" 
            value={property.split_boundary ? 'Yes' : 'No'} 
          />
          <DetailRow label="Sanborn Map #" value={property.sanborn_map_number} />
          <DetailRow label="Zoning Map #" value={property.zoning_map_number} />
        </InfoCard>
      )}
    </Box>
  );
}