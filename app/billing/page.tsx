"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, MapPin, MoreHorizontal, Grid, List, FileText, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
    // Billing information
    valuation_amount: 250000,
    valuation_percentage: 0.5,
    final_charge: 1250,
    payment_status: "unpaid",
    bill_date: "2025-03-01T00:00:00.000Z",
    due_date: "2025-04-01T00:00:00.000Z",
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
    // Billing information
    valuation_amount: 180000,
    valuation_percentage: 0.4,
    final_charge: 720,
    payment_status: "paid",
    bill_date: "2025-02-15T00:00:00.000Z",
    due_date: "2025-03-15T00:00:00.000Z",
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
    // Billing information
    valuation_amount: 450000,
    valuation_percentage: 0.6,
    final_charge: 2700,
    payment_status: "partial",
    bill_date: "2025-02-01T00:00:00.000Z",
    due_date: "2025-03-01T00:00:00.000Z",
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
    // Billing information
    valuation_amount: 320000,
    valuation_percentage: 0.5,
    final_charge: 1600,
    payment_status: "unpaid",
    bill_date: "2025-03-01T00:00:00.000Z",
    due_date: "2025-04-01T00:00:00.000Z",
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
    // Billing information
    valuation_amount: 210000,
    valuation_percentage: 0.4,
    final_charge: 840,
    payment_status: "paid",
    bill_date: "2025-02-15T00:00:00.000Z",
    due_date: "2025-03-15T00:00:00.000Z",
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
    // Billing information
    valuation_amount: 380000,
    valuation_percentage: 0.6,
    final_charge: 2280,
    payment_status: "unpaid",
    bill_date: "2025-03-01T00:00:00.000Z",
    due_date: "2025-04-01T00:00:00.000Z",
  },
]

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid" | "billing">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all")
  const [electoralAreaFilter, setElectoralAreaFilter] = useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
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

    // Payment status filter (only for billing view)
    const matchesPaymentStatus = paymentStatusFilter === "all" || property.payment_status === paymentStatusFilter

    return matchesSearch && matchesType && matchesArea && (viewMode !== "billing" || matchesPaymentStatus)
  })

  const handlePropertyClick = (id: number) => {
    router.push(`/property/${id}`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="default" className="bg-green-500">
            Paid
          </Badge>
        )
      case "partial":
        return (
          <Badge variant="default" className="bg-amber-500">
            Partial
          </Badge>
        )
      case "unpaid":
        return (
          <Badge variant="default" className="bg-red-500">
            Unpaid
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const openBillReport = (property: any) => {
    setSelectedProperty(property)
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
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
          <div className="border rounded-md p-1 flex">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-8 w-8"
              title="List View"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8"
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "billing" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("billing")}
              className="h-8 w-8"
              title="Billing View"
            >
              <FileText className="h-4 w-4" />
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
        <div className="flex flex-wrap gap-2">
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
          {viewMode === "billing" && (
            <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          )}
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

      {viewMode === "list" && (
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
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              openBillReport(property)
                            }}
                          >
                            Generate Bill Report
                          </DropdownMenuItem>
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
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                onClick={() => handlePropertyClick(property.id)}
              >
                <div className="aspect-video relative bg-muted">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={`Property ${property.valuation_no}`}
                    className="object-cover w-full h-full"
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

      {viewMode === "billing" && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Valuation No</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead>Valuation Amount</TableHead>
                <TableHead>Rate (%)</TableHead>
                <TableHead>Final Charge</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <TableRow key={property.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{property.valuation_no}</TableCell>
                    <TableCell>
                      {property.first_name} {property.last_name}
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
                    <TableCell>{formatCurrency(property.valuation_amount)}</TableCell>
                    <TableCell>{property.valuation_percentage * 100}%</TableCell>
                    <TableCell className="font-medium">{formatCurrency(property.final_charge)}</TableCell>
                    <TableCell>{getPaymentStatusBadge(property.payment_status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openBillReport(property)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Bill Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No properties found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {viewMode === "billing" ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>Distribution by payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Paid</span>
                    <span className="font-medium">
                      {properties.filter((p) => p.payment_status === "paid").length}(
                      {Math.round(
                        (properties.filter((p) => p.payment_status === "paid").length / properties.length) * 100,
                      )}
                      %)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Partial</span>
                    <span className="font-medium">
                      {properties.filter((p) => p.payment_status === "partial").length}(
                      {Math.round(
                        (properties.filter((p) => p.payment_status === "partial").length / properties.length) * 100,
                      )}
                      %)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unpaid</span>
                    <span className="font-medium">
                      {properties.filter((p) => p.payment_status === "unpaid").length}(
                      {Math.round(
                        (properties.filter((p) => p.payment_status === "unpaid").length / properties.length) * 100,
                      )}
                      %)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Billing Summary</CardTitle>
                <CardDescription>Financial overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Valuation</span>
                    <span className="font-medium">
                      {formatCurrency(properties.reduce((sum, p) => sum + p.valuation_amount, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Charges</span>
                    <span className="font-medium">
                      {formatCurrency(properties.reduce((sum, p) => sum + p.final_charge, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collected</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(
                        properties
                          .filter((p) => p.payment_status === "paid")
                          .reduce((sum, p) => sum + p.final_charge, 0),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outstanding</span>
                    <span className="font-medium text-red-600">
                      {formatCurrency(
                        properties
                          .filter((p) => p.payment_status !== "paid")
                          .reduce((sum, p) => sum + p.final_charge, 0),
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Due Dates</CardTitle>
                <CardDescription>Upcoming payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Due this month</p>
                    <div className="flex justify-between">
                      <span>Properties</span>
                      <span className="font-medium">
                        {
                          properties.filter((p) => {
                            const dueDate = new Date(p.due_date)
                            const now = new Date()
                            return (
                              dueDate.getMonth() === now.getMonth() &&
                              dueDate.getFullYear() === now.getFullYear() &&
                              p.payment_status !== "paid"
                            )
                          }).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className="font-medium">
                        {formatCurrency(
                          properties
                            .filter((p) => {
                              const dueDate = new Date(p.due_date)
                              const now = new Date()
                              return (
                                dueDate.getMonth() === now.getMonth() &&
                                dueDate.getFullYear() === now.getFullYear() &&
                                p.payment_status !== "paid"
                              )
                            })
                            .reduce((sum, p) => sum + p.final_charge, 0),
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Overdue</p>
                    <div className="flex justify-between">
                      <span>Properties</span>
                      <span className="font-medium text-red-600">
                        {
                          properties.filter((p) => {
                            const dueDate = new Date(p.due_date)
                            const now = new Date()
                            return dueDate < now && p.payment_status !== "paid"
                          }).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(
                          properties
                            .filter((p) => {
                              const dueDate = new Date(p.due_date)
                              const now = new Date()
                              return dueDate < now && p.payment_status !== "paid"
                            })
                            .reduce((sum, p) => sum + p.final_charge, 0),
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Bill Report Dialog */}
      <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && setSelectedProperty(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Property Bill Report</DialogTitle>
            <DialogDescription>Billing details for property {selectedProperty?.valuation_no}</DialogDescription>
          </DialogHeader>

          {selectedProperty && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Property Tax Bill</h2>
                  <p className="text-muted-foreground">
                    Bill Date: {new Date(selectedProperty.bill_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Bill #: {selectedProperty.valuation_no}-BILL</p>
                  <p className="text-muted-foreground">
                    Due Date: {new Date(selectedProperty.due_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Property Owner</h3>
                  <p className="font-medium">
                    {selectedProperty.first_name} {selectedProperty.last_name}
                  </p>
                  <p>{selectedProperty.street_name}</p>
                  <p>
                    {selectedProperty.locality}, {selectedProperty.electoral_area}
                  </p>
                  <p>Phone: {selectedProperty.phone_number}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Property Details</h3>
                  <p>
                    <span className="font-medium">Valuation No:</span> {selectedProperty.valuation_no}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    <span className="capitalize">{selectedProperty.data_type_info}</span>
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> {selectedProperty.street_name},{" "}
                    {selectedProperty.locality}
                  </p>
                  <p>
                    <span className="font-medium">Electoral Area:</span> {selectedProperty.electoral_area}
                  </p>
                </div>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Property Valuation</TableCell>
                      <TableCell className="text-right">{formatCurrency(selectedProperty.valuation_amount)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Property Tax Rate ({selectedProperty.valuation_percentage * 100}% of valuation)
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(selectedProperty.valuation_amount * selectedProperty.valuation_percentage)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">Total Due</TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(selectedProperty.final_charge)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Payment Status</h3>
                <div className="flex items-center gap-2">
                  {getPaymentStatusBadge(selectedProperty.payment_status)}
                  <span>
                    {selectedProperty.payment_status === "paid"
                      ? "Payment received"
                      : selectedProperty.payment_status === "partial"
                        ? "Partial payment received"
                        : "Payment pending"}
                  </span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Please make payment before the due date to avoid late penalties. For questions regarding this bill,
                  contact the Property Tax Department at 0300-000-0000.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedProperty(null)}>
              Close
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" /> Print Bill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

