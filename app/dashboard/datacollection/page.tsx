import { datacollected } from "@/api/datacollection"
import PropertiesPage from "./collectedata"
export const revalidate = 30; // Revalidate every 60 seconds
export default async function DataCollectionPage() {
  const properties = await datacollected()
  
  return (
    <div> 
      <PropertiesPage property={properties} />
    </div>
  )
}

