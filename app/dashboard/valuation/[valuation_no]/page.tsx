
import { use } from 'react';
import PropertyDetailsPage from './valuation'; // Adjust the import path as needed

interface PageProps {
  params: Promise<{
    valuation_no: string;
  }>;
}

export default function ValuationPage({ params }: PageProps) {
  // Unwrap the params in the Server Component
  const unwrappedParams = use(params);
  const valuation_no = unwrappedParams.valuation_no;

  // Pass the unwrapped value to the Client Component
  return <PropertyDetailsPage valuation_no={valuation_no} />;
}