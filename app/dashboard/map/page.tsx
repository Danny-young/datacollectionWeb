import { datacollected } from "@/api/datacollection"
import MapComponent from "./mapList"

export default async function MapPage() {
  const properties = await datacollected()
  
  return (
    <div className="h-screen w-full"> 
      <MapComponent property={properties} />
    </div>
  )
}


