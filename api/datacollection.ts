const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const revalidate = 30; 
export async function datacollected() {      
  // console.log(`${API_URL}/agents`);
//console.log(`listing to agents list`);
   const res = await fetch(`${API_URL}/collectedData`);
   const data = await res.json();
   console.log(data);
   return data;
} 

// export const collectiondata = async (data: FormDataType) => {
//   try {
//     console.log('Sending data:', data); // Log the data being sent
//     const res = await fetch(`${API_URL}/collectedData`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
    
//     const responseData = await res.json();
//     console.log('API Response:', responseData); // Log the API response
    
//     if (!res.ok) {
//       throw new Error(`API error: ${JSON.stringify(responseData)}`);
//     }
    
//     return responseData;
//   } catch (error) {
//     console.error('API call failed:', error);
//     throw error;
//   }
// };
// export async function collectiondata() {
//     const res = await fetch(`${API_URL}/collectedData`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({}),
//     });
  
//     const data = await res.json();
//     if (!res.ok) {
//       console.log(data);
//       throw Error('Failed to collect data');
//     }
//     return data;  
//   }

  export const fetchLocations = async () => {
    try {
      const response = await fetch(`${API_URL}/electoralarea`);
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Failed to fetch electoralarea');
    }
  };

  export const fetchLocality = async () => {
    try {
      const response = await fetch(`${API_URL}/localities`);
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Failed to fetch localities');
    }
  };

  export const fetchLocalitiesByMunicipality = async (municipality: string) => {
    try {
      // First get the electoral area data
      const electoralAreaResponse = await fetch(`${API_URL}/electoralarea`);
      interface ElectoralArea {
        id: string;
        municipalities: string;
      }
      const electoralAreas: ElectoralArea[] = await electoralAreaResponse.json();
      
      // Find the electoral area ID for the selected municipality
      const selectedArea = electoralAreas.find(
        (area: ElectoralArea) => area.municipalities === municipality
      );

      if (!selectedArea) {
        throw new Error('Municipality not found');
      }
      interface Locality {
        electoralAreaId: string;
        // Add other properties of Locality if needed
      }
        // Removed the unused expression

      // Then fetch localities using the electoral area ID
      const localitiesResponse = await fetch(`${API_URL}/localities`);
      const allLocalities = await localitiesResponse.json();
      
      // Filter localities that match the electoral area ID
      interface Locality {
        electoralAreaId: string;
        // Add other properties of Locality if needed
      }

      const filteredLocalities = allLocalities.filter(
        (locality: Locality) => locality.electoralAreaId === selectedArea.id
      );

      return filteredLocalities;
    } catch {
      throw new Error(`Failed to fetch localities for municipality: ${municipality}`);
    }
  };