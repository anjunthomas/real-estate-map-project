'use client';

import { useQuery, gql } from '@apollo/client';

const GET_TAX_ASSESSORS = gql`
  query {
    attomTaxAssessors {
      items {
        PropertyAddressFull
        PropertyLatitude
        PropertyLongitude
        ATTOM_ID
        parcel_id
      }
    }
  }
`;

interface TaxAssessor {
  PropertyAddressFull: string;
  PropertyLatitude: number;
  PropertyLongitude: number;
  ATTOM_ID: string;
  parcel_id: string;
}

interface TaxAssessorsData {
  attomTaxAssessors: {
    items: TaxAssessor[];
  };
}

export function TaxAssessors() {
  const { loading, error, data } = useQuery<TaxAssessorsData>(GET_TAX_ASSESSORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.attomTaxAssessors.items.map((item, index) => (
        <div key={index}>
          <p>{item.PropertyAddressFull}</p>
        </div>
      ))}
    </div>
  );
}