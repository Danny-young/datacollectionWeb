import { datacollected } from "@/api/datacollection"
import MapComponent from "./mapList"

export default async function MapPage() {
  try {
    const properties = await datacollected()
    
    return (
      <div className="h-screen w-full"> 
        <MapComponent property={properties || []} />
      </div>
    )
  } catch (error) {
    console.error("Error in MapPage:", error)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Map Data</h2>
          <p className="text-gray-600">There was a problem loading the property data. Please try again later.</p>
        </div>
      </div>
    )
  }
}