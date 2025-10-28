'use client';
import { gql } from '@apollo/client';

export const GET_PARCEL_DETAILS = gql`
  query GetParcelDetails($parcelId: String!) {
    reonomyProperties(filter: { parcel_id: { eq: $parcelId } }) {
      items {
        parcel_id
        property_id
        address_line1
        city
        state
        zip4
        zip5
        
        # Building fields
        year_built
        year_renovated
        floors
        sum_buildings_nbr
        existing_floor_area_ratio
        commercial_units
        residential_units
        total_units
        building_area
        sum_building_sqft
        max_floor_plate
        building_class
        frontage
        depth
        
        # Lot fields
        asset_type
        lot_size_sqft
        lot_size_acres
        zoning
        lot_size_depth_feet
        lot_size_frontage_feet
        census_tract
        opp_zone
        
        # Location fields
        msa_name
        fips_county
        municipality
        borough_id
        neighborhood_name
        
        # Zoning Info fields
        zoning_district_1
        zoning_district_2
        special_purpose_district
        split_boundary
        sanborn_map_number
        zoning_map_number
      }
    }
  }
`;
























