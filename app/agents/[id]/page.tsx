"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - in a real app, this would come from an API
const agents = [
  {
    id: 30,
    name: "Daniel Jackson",
    email: "daneieel@gmail.com",
    user_name: "AG030",
    phone_number: "0345335222",
    created_at: "2025-01-14T02:46:00.527Z",
    role: "agent",
    electoral_area: "Ablekuma Central",
    properties_collected: 32,
    status: "active",
    address: "123 Darkuman Avenue, Accra",
    nationality: "Ghanaian",
    id_type: "Ghana Card",
    id_number: "GHA-123456789",
    bio: "Experienced data collector with over 5 years in property assessment and valuation. Specialized in commercial property documentation in urban areas.",
    recent_activity: [
      { date: "2025-03-10T10:30:00Z", action: "Collected data for property AN-DA-045", type: "collection" },
      { date: "2025-03-08T14:15:00Z", action: "Updated information for property AN-DA-032", type: "update" },
      { date: "2025-03-05T09:45:00Z", action: "Collected data for property AN-DA-044", type: "collection" },
      { date: "2025-03-01T11:20:00Z", action: "Collected data for property AN-DA-043", type: "collection" },
    ],
    performance: {
      monthly_collections: [28, 32, 30, 35, 32, 38],
      accuracy_rate: 98.5,
      completion_time_avg: 45, // minutes
      rejection_rate: 1.2,
    },
    collected_properties: [
      {
        id: 1,
        valuation_no: "AN-DA-045",
        type: "Commercial",
        address: "45 Darkuman Avenue",
        date: "2025-03-10T10:30:00Z",
      },
      {
        id: 2,
        valuation_no: "AN-DA-044",
        type: "Residential",
        address: "44 Darkuman Avenue",
        date: "2025-03-05T09:45:00Z",
      },
      {
        id: 3,
        valuation_no: "AN-DA-043",
        type: "Commercial",
        address: "43 Darkuman Avenue",
        date: "2025-03-01T11:20:00Z",
      },
      {
        id: 4,
        valuation_no: "AN-DA-042",
        type: "Industrial",
        address: "42 Darkuman Avenue",
        date: "2025-02-25T13:10:00Z",
      },
    ],
  },
  {
    id: 35,
    name: "John Doe",
    email: "johndoe@gmail.com",
    user_name: "AG035",
    phone_number: "0245454657",
    created_at: "2025-01-10T10:22:15.527Z",
    role: "agent",
    electoral_area: "Ablekuma South",
    properties_collected: 28,
    status: "active",
    address: "456 Kaneshie Road, Accra",
    nationality: "Ghanaian",
    id_type: "Passport",
    id_number: "P1234567",
    bio: "Property data specialist focused on residential properties. Strong attention to detail and excellent communication skills.",
    recent_activity: [
      { date: "2025-03-09T11:30:00Z", action: "Collected data for property AS-KA-028", type: "collection" },
      { date: "2025-03-07T13:45:00Z", action: "Updated information for property AS-KA-025", type: "update" },
      { date: "2025-03-04T10:15:00Z", action: "Collected data for property AS-KA-027", type: "collection" },
    ],
    performance: {
      monthly_collections: [25, 28, 26, 30, 28, 32],
      accuracy_rate: 97.8,
      completion_time_avg: 50, // minutes
      rejection_rate: 1.5,
    },
    collected_properties: [
      {
        id: 5,
        valuation_no: "AS-KA-028",
        type: "Residential",
        address: "28 Kaneshie Road",
        date: "2025-03-09T11:30:00Z",
      },
      {
        id: 6,
        valuation_no: "AS-KA-027",
        type: "Residential",
        address: "27 Kaneshie Road",
        date: "2025-03-04T10:15:00Z",
      },
      {
        id: 7,
        valuation_no: "AS-KA-026",
        type: "Commercial",
        address: "26 Kaneshie Road",
        date: "2025-02-28T14:20:00Z",
      },
    ],
  },
]

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const agentId = Number.parseInt(params.id)

  // Find the agent with the matching ID
  const agent = agents.find((a) => a.id === agentId)

  if (!agent) {
    return (
      <div className="container py-6">
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to agents
        </Button>
        <div className="flex flex-col items-center justify-center py-12">
          <XCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Agent Not Found</h2>
          <p className="text-muted-foreground mb-6">The agent you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button asChild>
            <Link href="/agents">Return to Agents List</Link>
          </Button>
        </div>
      </div>
    )
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
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/agents">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to agents
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div
            className={`h-16 w-16 rounded-full ${getStatusColor(agent.status)} flex items-center justify-center text-white font-bold text-xl`}
          >
            {getInitials(agent.name)}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{agent.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant={agent.status === "active" ? "default" : "secondary"} className="capitalize">
                {agent.status}
              </Badge>
              <span className="text-muted-foreground">{agent.user_name}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit Agent
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" /> Generate Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" /> Change Status
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Agent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Full Name</p>
                    <p className="text-muted-foreground">{agent.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{agent.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{agent.phone_number}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">{agent.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Joined</p>
                    <p className="text-muted-foreground">{new Date(agent.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Electoral Area</p>
                    <p className="text-muted-foreground">{agent.electoral_area}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Role</p>
                    <p className="text-muted-foreground capitalize">{agent.role}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">ID Type</p>
                    <p className="text-muted-foreground">{agent.id_type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">ID Number</p>
                    <p className="text-muted-foreground">{agent.id_number}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Nationality</p>
                    <p className="text-muted-foreground">{agent.nationality}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Properties Collected</p>
                  <p className="text-2xl font-bold">{agent.properties_collected}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  <p className="text-2xl font-bold">{agent.performance.accuracy_rate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Completion Time</p>
                  <p className="text-2xl font-bold">{agent.performance.completion_time_avg} min</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rejection Rate</p>
                  <p className="text-2xl font-bold">{agent.performance.rejection_rate}%</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/agents/${agent.id}?tab=performance`}>View Full Performance</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bio</CardTitle>
              <CardDescription>Agent background and expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{agent.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions performed by this agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agent.recent_activity.slice(0, 3).map((activity, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className={`mt-1 h-2 w-2 rounded-full ${activity.type === "collection" ? "bg-primary" : "bg-amber-500"}`}
                    />
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/agents/${agent.id}?tab=activity`}>View All Activity</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collected Properties</CardTitle>
              <CardDescription>Properties data collected by this agent</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Valuation No</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Date Collected</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agent.collected_properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.valuation_no}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            property.type === "Commercial"
                              ? "default"
                              : property.type === "Residential"
                                ? "secondary"
                                : "outline"
                          }
                          className="capitalize"
                        >
                          {property.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{property.address}</TableCell>
                      <TableCell>{new Date(property.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/property/${property.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Properties
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Property Types</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Pie chart would be displayed here</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Commercial</span>
                    <span className="font-medium">18 (56%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Residential</span>
                    <span className="font-medium">12 (38%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Industrial</span>
                    <span className="font-medium">2 (6%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collection Timeline</CardTitle>
                <CardDescription>Properties collected over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Line chart would be displayed here</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-medium">8 properties</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Month</span>
                    <span className="font-medium">12 properties</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth</span>
                    <span className="font-medium text-red-500">-33%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agent.properties_collected}</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agent.performance.accuracy_rate}%</div>
                <p className="text-xs text-muted-foreground">+0.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agent.performance.completion_time_avg} min</div>
                <p className="text-xs text-muted-foreground">-2 min from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rejection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agent.performance.rejection_rate}%</div>
                <p className="text-xs text-muted-foreground">-0.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Collections</CardTitle>
              <CardDescription>Number of properties collected per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                <span className="text-muted-foreground">Bar chart would be displayed here</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Line chart would be displayed here</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Analysis</CardTitle>
                <CardDescription>Time spent vs. properties collected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Scatter plot would be displayed here</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Recent actions performed by this agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {agent.recent_activity.map((activity, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className={`mt-1 h-3 w-3 rounded-full ${activity.type === "collection" ? "bg-primary" : "bg-amber-500"}`}
                    />
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleString()}</div>
                      <div className="mt-2 text-sm">
                        {activity.type === "collection"
                          ? "New property data was collected and added to the database."
                          : "Existing property information was updated with new details."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>Recent login sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Mar 10, 2025, 8:30 AM</TableCell>
                    <TableCell>192.168.1.1</TableCell>
                    <TableCell>Android Phone</TableCell>
                    <TableCell>Accra, Ghana</TableCell>
                    <TableCell>
                      <Badge variant="default">Successful</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mar 9, 2025, 9:15 AM</TableCell>
                    <TableCell>192.168.1.1</TableCell>
                    <TableCell>Android Phone</TableCell>
                    <TableCell>Accra, Ghana</TableCell>
                    <TableCell>
                      <Badge variant="default">Successful</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mar 8, 2025, 8:45 AM</TableCell>
                    <TableCell>192.168.1.1</TableCell>
                    <TableCell>Android Phone</TableCell>
                    <TableCell>Accra, Ghana</TableCell>
                    <TableCell>
                      <Badge variant="default">Successful</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

