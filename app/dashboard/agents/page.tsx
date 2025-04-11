import { listAgents } from "@/api/agents"
import AgentsListPage from "./agentList"

export const revalidate = 60; // Revalidate every 60 seconds
export default async function AgentsPage() {
  const agents = await listAgents()
  
  return (
    <div> 
      <AgentsListPage agent={agents} />
    </div>
  )
}
