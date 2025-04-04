import { datacollected } from "@/api/datacollection"
import PropertiesPage from "./collectedata"

export default async function DataCollectionPage() {
  const properties = await datacollected()
  
  return (
    <div> 
      <PropertiesPage property={properties} />
    </div>
  )
}


