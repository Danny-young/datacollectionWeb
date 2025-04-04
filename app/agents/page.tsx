import { listAgents } from "@/api/agents"
import AgentsListPage from "./agentList"

export default async function AgentsPage() {
  const agents = await listAgents()
  
  return (
    <div> 
      <AgentsListPage agent={agents} />
    </div>
  )
}


