"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, MoreHorizontal, Grid, List, Phone, Mail, MapPin, Filter, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"


// const agents = [
//     {
//       id: 30,
//       name: "Daniel Jackson",
//       email: "daneieel@gmail.com",
//       user_name: "AG030",
//       phone_number: "0345335222",
//       created_at: "2025-01-14T02:46:00.527Z",
//       role: "agent",
//       electoral_area: "Ablekuma Central",
//       properties_collected: 32,
//       status: "active",
//     },
//     {
//       id: 35,
//       name: "John Doe",
//       email: "johndoe@gmail.com",
//       user_name: "AG035",
//       phone_number: "0245454657",
//       created_at: "2025-01-10T10:22:15.527Z",
//       role: "agent",
//       electoral_area: "Ablekuma South",
//       properties_collected: 28,
//       status: "active",
//     },
//     {
//       id: 22,
//       name: "Ama Kofi",
//       email: "amakofi@gmail.com",
//       user_name: "AG022",
//       phone_number: "0557889900",
//       created_at: "2024-12-05T08:30:45.527Z",
//       role: "agent",
//       electoral_area: "Ablekuma North",
//       properties_collected: 24,
//       status: "active",
//     },
//     {
//       id: 18,
//       name: "Kwame Mensah",
//       email: "kwame@gmail.com",
//       user_name: "AG018",
//       phone_number: "0244556677",
//       created_at: "2024-11-20T14:15:30.527Z",
//       role: "agent",
//       electoral_area: "Ablekuma Central",
//       properties_collected: 19,
//       status: "inactive",
//     },
//     {
//       id: 42,
//       name: "Sarah Addo",
//       email: "sarah@gmail.com",
//       user_name: "AG042",
//       phone_number: "0277889900",
//       created_at: "2025-02-05T09:20:10.527Z",
//       role: "agent",
//       electoral_area: "Ablekuma South",
//       properties_collected: 15,
//       status: "active",
//     },
//     {
//       id: 27,
//       name: "Michael Owusu",
//       email: "michael@gmail.com",
//       user_name: "AG027",
//       phone_number: "0233445566",
//       created_at: "2024-12-18T11:35:22.527Z",
//       role: "agent",
//       electoral_area: "Ablekuma North",
//       properties_collected: 21,
//       status: "active",
//     },
//   ]


  export default function AgentsListPage( {agent}: {agent: any}) {
    const [viewMode, setViewMode] = useState<"list" | "grid">("list")
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()
  
    // const filteredAgents = agent.filter(
    //   (a: {name: string; user_name: string}) =>
    //     a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     a.user_name.toLowerCase().includes(searchQuery.toLowerCase()),
    // )
    const handleAgentClick = (id: number) => {
      router.push(`/agents/${id}`);
    }
  
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    }
  
    const getStatusColor = (status: string) => {
      return status === "active" ? "bg-green-500" : "bg-gray-400"
    }
  
    return (
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold">Agents</h1>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Agent
            </Button>
            <div className="border rounded-md p-1 flex">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
  
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search agents by name or ID..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Electoral Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="ablekuma-central">Ablekuma Central</SelectItem>
                <SelectItem value="ablekuma-south">Ablekuma South</SelectItem>
                <SelectItem value="ablekuma-north">Ablekuma North</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
  
        {viewMode === "list" ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Telephone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead> 
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agent.map((agent: {
                  id: string;
                  user_name: string;
                  name: string;
                  electoral_area: string;
                  properties_collected: number;
                  status: string;
                  created_at: string;
                  phone_number: string;
                  role: string;
                }) => (
                  <TableRow
                    key={agent.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleAgentClick(Number(agent.id))}
                  >
                    <TableCell className="font-medium">{agent.user_name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-8 w-8 rounded-full ${getStatusColor(agent.status)} flex items-center justify-center text-white font-medium text-xs`}
                        >
                          {getInitials(agent.name)}
                        </div>
                        {agent.name}
                      </div>
                    </TableCell>
                    <TableCell>{agent.phone_number}</TableCell>
                    <TableCell>{agent.role}</TableCell>
                    <TableCell>
                      <Badge variant={agent.status === "active" ? "default" : "secondary"} className="capitalize">
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(agent.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/agents/${agent.id}`);
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Agent</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View Collected Data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {agent.map((agent: any) => (
              <Card
                key={agent.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleAgentClick(Number(agent.id))}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div
                      className={`h-20 w-20 rounded-full ${getStatusColor(agent.status)} flex items-center justify-center text-white font-bold text-2xl mb-3`}
                    >
                      {getInitials(agent.name)}
                    </div>
                    <h3 className="font-bold text-lg">{agent.name}</h3>
                    <p className="text-muted-foreground">{agent.user_name}</p>
                    <Badge variant={agent.status === "active" ? "default" : "secondary"} className="mt-2 capitalize">
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{agent.electoral_area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{agent.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{agent.phone_number}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Properties</p>
                      <p className="font-bold">{agent.properties_collected}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/agents/${agent.id}`)
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }
