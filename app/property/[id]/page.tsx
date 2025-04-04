import Link from "next/link"
import { Building, ArrowLeft, MapPin, User, Calendar, Phone, FileText, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would be fetched from an API in a real application
const property = {
  id: 27,
  agent_id: "AG035",
  phone_number: "02345454657",
  first_name: "John",
  last_name: "Doe",
  electoral_area: "Ablekuma Central",
  locality: "Darkuman",
  id_type: "Passport",
  id_number: "P1234567",
  nationality: "Ghanaian",
  street_name: "Darkuman Avenue",
  valuation_no: "AN-DA-002",
  geolocation: {
    longitude: "345.0",
    latitude: "34567.0",
    accuracy: "3",
  },
  data_type: "property",
  data_type_info: "commercial",
  createdAt: "2025-01-30T03:26:14.650Z",
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <Building className="h-6 w-6" />
            <span>PropertyCollect</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/agents" className="text-muted-foreground hover:text-foreground">
              Agents
            </Link>
            <Link href="/properties" className="text-muted-foreground hover:text-foreground">
              Properties
            </Link>
            <Link href="/reports" className="text-muted-foreground hover:text-foreground">
              Reports
            </Link>
          </nav>
          <div>
            <Button variant="outline" className="mr-2">
              Profile
            </Button>
            <Button>Logout</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6">
            <Button variant="ghost" size="sm" className="mb-2" asChild>
              <Link href="/properties">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to properties
              </Link>
            </Button>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Property Details</h1>
                <p className="text-muted-foreground">Valuation Number: {property.valuation_no}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Edit Property
                </Button>
                <Button>
                  <FileText className="mr-2 h-4 w-4" /> Generate Report
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="owner">Owner Information</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="history">Collection History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                  <CardDescription>Basic details about this property</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Property Type</h3>
                    <Badge className="capitalize">{property.data_type_info}</Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Valuation Number</h3>
                    <p>{property.valuation_no}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Street Name</h3>
                    <p>{property.street_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Locality</h3>
                    <p>{property.locality}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Electoral Area</h3>
                    <p>{property.electoral_area}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Date Collected</h3>
                    <p>{new Date(property.createdAt).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Collection Information</CardTitle>
                  <CardDescription>Details about data collection</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Collected By</h3>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p>{property.agent_id}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Collection Date</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p>{new Date(property.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="owner" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Owner Information</CardTitle>
                  <CardDescription>Details about the property owner</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Full Name</h3>
                    <p>
                      {property.first_name} {property.last_name}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Phone Number</h3>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p>{property.phone_number}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Nationality</h3>
                    <p>{property.nationality}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">ID Type</h3>
                    <p>{property.id_type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">ID Number</h3>
                    <p>{property.id_number}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Information</CardTitle>
                  <CardDescription>Geolocation data for this property</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 aspect-video bg-muted rounded-md flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Map view would be displayed here</span>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Longitude</h3>
                      <p>{property.geolocation.longitude}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Latitude</h3>
                      <p>{property.geolocation.latitude}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Accuracy</h3>
                      <p>{property.geolocation.accuracy} meters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Collection History</CardTitle>
                  <CardDescription>Timeline of data collection and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <div className="font-medium">Initial data collection</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(property.createdAt).toLocaleString()} by {property.agent_id}
                        </div>
                        <div className="mt-1 text-sm">Property information was first recorded in the system.</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 h-2 w-2 rounded-full bg-muted" />
                      <div>
                        <div className="font-medium">No updates yet</div>
                        <div className="text-sm text-muted-foreground">
                          This property has not been updated since initial collection
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

