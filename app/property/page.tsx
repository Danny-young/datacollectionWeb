"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, MapPin, MoreHorizontal, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

// Sample data - in a real app, this would come from an API
const properties = [
  {
    id: 27,
    agent_id: "AG035",
    agent_name: "John Doe",
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
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 28,
    agent_id: "AG030",
    agent_name: "Daniel Jackson",
    phone_number: "0557889900",
    first_name: "Kwame",
    last_name: "Asante",
    electoral_area: "Ablekuma Central",
    locality: "Kaneshie",
    id_type: "Ghana Card",
    id_number: "GHA-123456789",
    nationality: "Ghanaian",
    street_name: "Kaneshie Road",
    valuation_no: "AN-KA-015",
    geolocation: {
      longitude: "345.2",
      latitude: "34568.5",
      accuracy: "2",
    },
    data_type: "property",
    data_type_info: "residential",
    createdAt: "2025-01-28T10:15:22.650Z",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 29,
    agent_id: "AG022",
    agent_name: "Ama Kofi",
    phone_number: "0244556677",
    first_name: "Abena",
    last_name: "Mensah",
    electoral_area: "Ablekuma South",
    locality: "Odorkor",
    id_type: "Voter ID",
    id_number: "V9876543",
    nationality: "Ghanaian",
    street_name: "Odorkor Main",
    valuation_no: "AS-OD-007",
    geolocation: {
      longitude: "346.1",
      latitude: "34570.3",
      accuracy: "4",
    },
    data_type: "property",
    data_type_info: "industrial",
    createdAt: "2025-01-25T14:42:08.650Z",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 30,
    agent_id: "AG035",
    agent_name: "John Doe",
    phone_number: "02345454657",
    first_name: "Michael",
    last_name: "Owusu",
    electoral_area: "Ablekuma North",
    locality: "Lapaz",
    id_type: "Ghana Card",
    id_number: "GHA-987654321",
    nationality: "Ghanaian",
    street_name: "Lapaz Main Road",
    valuation_no: "AN-LP-010",
    geolocation: {
      longitude: "345.5",
      latitude: "34569.2",
      accuracy: "2",
    },
    data_type: "property",
    data_type_info: "commercial",
    createdAt: "2025-02-05T08:30:45.650Z",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 31,
    agent_id: "AG030",
    agent_name: "Daniel Jackson",
    phone_number: "0557889900",
    first_name: "Sarah",
    last_name: "Addo",
    electoral_area: "Ablekuma South",
    locality: "Dansoman",
    id_type: "Passport",
    id_number: "P7654321",
    nationality: "Ghanaian",
    street_name: "Dansoman Highway",
    valuation_no: "AS-DN-022",
    geolocation: {
      longitude: "346.3",
      latitude: "34571.5",
      accuracy: "3",
    },
    data_type: "property",
    data_type_info: "residential",
    createdAt: "2025-02-10T13:45:30.650Z",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 32,
    agent_id: "AG022",
    agent_name: "Ama Kofi",
    phone_number: "0244556677",
    first_name: "Emmanuel",
    last_name: "Tetteh",
    electoral_area: "Ablekuma Central",
    locality: "Darkuman",
    id_type: "Ghana Card",
    id_number: "GHA-456789123",
    nationality: "Ghanaian",
    street_name: "Darkuman Junction",
    valuation_no: "AN-DA-018",
    geolocation: {
      longitude: "345.1",
      latitude: "34567.8",
      accuracy: "2",
    },
    data_type: "property",
    data_type_info: "industrial",
    createdAt: "2025-02-15T09:20:15.650Z",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all")
  const [electoralAreaFilter, setElectoralAreaFilter] = useState("all")
  const router = useRouter()

  // Filter properties based on search query and filters
  const filteredProperties = properties.filter((property) => {
    // Search filter
    const matchesSearch =
      property.valuation_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${property.first_name} ${property.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())

    // Property type filter
    const matchesType = propertyTypeFilter === "all" || property.data_type_info === propertyTypeFilter

    // Electoral area filter
    const matchesArea =
      electoralAreaFilter === "all" ||
      property.electoral_area.toLowerCase().replace(/\s+/g, "-") === electoralAreaFilter

    return matchesSearch && matchesType && matchesArea
  })

  const handlePropertyClick = (id: number) => {
    router.push(`/property/${id}`)
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Properties</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/map">
              <MapPin className="mr-2 h-4 w-4" /> View Map
            </Link>
          </Button>
          <Button variant="outline">Export Data</Button>
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
            placeholder="Search properties by location, valuation number..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
            </SelectContent>
          </Select>
          <Select value={electoralAreaFilter} onValueChange={setElectoralAreaFilter}>
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
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setPropertyTypeFilter("all")}>
            All Properties
          </TabsTrigger>
          <TabsTrigger value="commercial" onClick={() => setPropertyTypeFilter("commercial")}>
            Commercial
          </TabsTrigger>
          <TabsTrigger value="residential" onClick={() => setPropertyTypeFilter("residential")}>
            Residential
          </TabsTrigger>
          <TabsTrigger value="industrial" onClick={() => setPropertyTypeFilter("industrial")}>
            Industrial
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {viewMode === "list" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Valuation No</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Date Collected</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <TableRow
                    key={property.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handlePropertyClick(property.id)}
                  >
                    <TableCell className="font-medium">{property.valuation_no}</TableCell>
                    <TableCell>
                      {property.first_name} {property.last_name}
                    </TableCell>
                    <TableCell>
                      {property.locality}, {property.electoral_area}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          property.data_type_info === "commercial"
                            ? "default"
                            : property.data_type_info === "residential"
                              ? "secondary"
                              : "outline"
                        }
                        className="capitalize"
                      >
                        {property.data_type_info}
                      </Badge>
                    </TableCell>
                    <TableCell>{property.agent_id}</TableCell>
                    <TableCell>{new Date(property.createdAt).toLocaleDateString()}</TableCell>
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
                              e.stopPropagation()
                              router.push(`/property/${property.id}`)
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Property</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View on Map</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Generate Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No properties found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                onClick={() => handlePropertyClick(property.id)}
              >
                <div className="aspect-video relative bg-muted">
                  
                  
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={`Property ${property.valuation_no}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <Badge
                    variant={
                      property.data_type_info === "commercial"
                        ? "default"
                        : property.data_type_info === "residential"
                          ? "secondary"
                          : "outline"
                    }
                    className="capitalize absolute top-2 right-2"
                  >
                    {property.data_type_info}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{property.valuation_no}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">
                    {property.street_name}, {property.locality}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{property.electoral_area}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                        {property.agent_id.substring(0, 2)}
                      </div>
                      <span className="text-xs text-muted-foreground">{property.agent_name}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No properties found matching your filters.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Commercial</span>
                <span className="font-medium">
                  {properties.filter((p) => p.data_type_info === "commercial").length}(
                  {Math.round(
                    (properties.filter((p) => p.data_type_info === "commercial").length / properties.length) * 100,
                  )}
                  %)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Residential</span>
                <span className="font-medium">
                  {properties.filter((p) => p.data_type_info === "residential").length}(
                  {Math.round(
                    (properties.filter((p) => p.data_type_info === "residential").length / properties.length) * 100,
                  )}
                  %)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Industrial</span>
                <span className="font-medium">
                  {properties.filter((p) => p.data_type_info === "industrial").length}(
                  {Math.round(
                    (properties.filter((p) => p.data_type_info === "industrial").length / properties.length) * 100,
                  )}
                  %)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Electoral Areas</CardTitle>
            <CardDescription>Property distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Ablekuma Central</span>
                <span className="font-medium">
                  {properties.filter((p) => p.electoral_area === "Ablekuma Central").length} properties
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ablekuma South</span>
                <span className="font-medium">
                  {properties.filter((p) => p.electoral_area === "Ablekuma South").length} properties
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ablekuma North</span>
                <span className="font-medium">
                  {properties.filter((p) => p.electoral_area === "Ablekuma North").length} properties
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collection Trends</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>New properties</span>
                <span className="font-medium">42</span>
              </div>
              <div className="flex justify-between">
                <span>Updated records</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between">
                <span>Growth rate</span>
                <span className="font-medium">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

