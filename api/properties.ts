const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function billing() {      
  try {
    const res = await fetch(`${API_URL}/properties`);
    const data = await res.json();
    
    // Transform the data to match the ValuationData interface if needed
    const transformedData = data.map((item: any) => ({
      id: item.id,
      valuation_no: item.valuation_no || `VAL-${item.id}`,
      valuation_amt: item.valuation_amt || "0",
      property_no: item.property_no || `PROP-${item.id}`,
      duration: item.duration || 12,
      property_type: item.property_type || "residential",
      units: item.units || 1,
      tax_rate: item.tax_rate || "1.5",
      tax_amt: item.tax_amt || "0",
      data_typeInfo: item.data_typeInfo || "house",
      createdAt: item.createdAt || new Date().toISOString()
    }));
    
    return transformedData;
  } catch (error) {
    console.error("Error fetching billing data:", error);
    // Return empty array as fallback
    return [];
  }
} 

// export const propertiesdata = async (data: PropertyDetail) => {
//   try {
//     console.log('Sending property data:', data); // Log the data being sent
//     console.log('API URL:', `${API_URL}/properties`); // Log the full URL

//     const response = await fetch(`${API_URL}/properties`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
    
//     const responseData = await response.json();
//     console.log('Property API Response:', responseData);
    
//     if (!response.ok) {
//       throw new Error(`API error: ${JSON.stringify(responseData)}`);
//     }
    
//     return responseData;
//   } catch (error) {
//     console.error('Property API call failed:', error);
//     throw error;
//   }
// }; 