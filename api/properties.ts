const API_URL = process.env.NEXT_PUBLIC_API_URL;



export async function billing() {      
  // console.log(`${API_URL}/agents`);
//console.log(`listing to agents list`);
   const res = await fetch(`${API_URL}/properties`);
   const data = await res.json();
   console.log(data);
   return data;
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