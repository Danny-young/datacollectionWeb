"use client"

import { useState } from "react"
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

interface ValuationData {
  id: number;
  valuation_no: string;
  valuation_amt: string;
  property_no: string;
  duration: number;
  property_type: string;
  units: number;
  tax_rate: string;
  tax_amt: string;
  data_typeInfo: string;
  createdAt: string;
}

const formatCurrency = (value: string | number) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

const getPropertyTypeBadge = (type: string) => {
  const variant = type.toLowerCase() === 'commercial' 
    ? 'default' 
    : type.toLowerCase() === 'residential' 
      ? 'secondary' 
      : 'outline';
  
  return (
    <Badge variant={variant} className="capitalize">
      {type.toLowerCase()}
    </Badge>
  );
};

export function BillingTable({ valuation }: { valuation: ValuationData[] }) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all")
  const [selectedValuation, setSelectedValuation] = useState<ValuationData | null>(null)
  const router = useRouter()

  // Filter valuations based on search query and filters
  const filteredValuations = valuation.filter((item) => {
    // Search filter
    const matchesSearch =
      item.valuation_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.property_no.toLowerCase().includes(searchQuery.toLowerCase())

    // Property type filter
    const matchesType = propertyTypeFilter === "all" || item.property_type === propertyTypeFilter

    return matchesSearch && matchesType
  })

  const handleValuationClick = (id: number) => {
    router.push(`/billing/${id}`)
  }

  const openBillReport = (item: ValuationData) => {
    setSelectedValuation(item)
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Billing Data</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/map">
              <MapPin className="mr-2 h-4 w-4" /> View Map
            </a>
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
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by valuation number, property number..."
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
                <TableHead>Property No</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead>Valuation Amount</TableHead>
                <TableHead>Tax Rate (%)</TableHead>
                <TableHead>Tax Amount</TableHead>
                <TableHead>Unit Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredValuations.length > 0 ? (
                filteredValuations.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleValuationClick(item.id)}
                  >
                    <TableCell className="font-medium">{item.valuation_no}</TableCell>
                    <TableCell>{item.property_no}</TableCell>
                    <TableCell>
                      {getPropertyTypeBadge(item.property_type)}
                    </TableCell>
                    <TableCell>{formatCurrency(item.valuation_amt)}</TableCell>
                    <TableCell>{item.tax_rate}%</TableCell>
                    <TableCell className="font-medium">{formatCurrency(item.tax_amt)}</TableCell>
                    <TableCell className="capitalize">{item.data_typeInfo.toLowerCase()}</TableCell>
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
                              router.push(`/billing/${item.id}`)
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            Edit Valuation
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              openBillReport(item)
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
                  <TableCell colSpan={8} className="h-24 text-center">
                    No valuations found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredValuations.length > 0 ? (
            filteredValuations.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                onClick={() => handleValuationClick(item.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{item.valuation_no}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">
                    Property No: {item.property_no}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Property Type:</span>
                    {getPropertyTypeBadge(item.property_type)}
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Valuation Amount:</span>
                    <span className="font-medium">{formatCurrency(item.valuation_amt)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Tax Rate:</span>
                    <span>{item.tax_rate}%</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">Tax Amount:</span>
                    <span className="font-medium">{formatCurrency(item.tax_amt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                        {item.data_typeInfo.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs text-muted-foreground">{item.data_typeInfo}</span>
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
              <p className="text-muted-foreground">No valuations found matching your filters.</p>
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
                  {valuation.filter((p) => p.property_type === "commercial").length}(
                  {Math.round(
                    (valuation.filter((p) => p.property_type === "commercial").length / valuation.length) * 100,
                  )}
                  %)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Residential</span>
                <span className="font-medium">
                  {valuation.filter((p) => p.property_type === "residential").length}(
                  {Math.round(
                    (valuation.filter((p) => p.property_type === "residential").length / valuation.length) * 100,
                  )}
                  %)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Industrial</span>
                <span className="font-medium">
                  {valuation.filter((p) => p.property_type === "industrial").length}(
                  {Math.round(
                    (valuation.filter((p) => p.property_type === "industrial").length / valuation.length) * 100,
                  )}
                  %)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tax Summary</CardTitle>
            <CardDescription>Financial overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Valuation</span>
                <span className="font-medium">
                  {formatCurrency(
                    valuation.reduce((sum, p) => sum + parseFloat(p.valuation_amt), 0)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Tax</span>
                <span className="font-medium">
                  {formatCurrency(
                    valuation.reduce((sum, p) => sum + parseFloat(p.tax_amt), 0)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Tax Rate</span>
                <span className="font-medium">
                  {Math.round(
                    valuation.reduce((sum, p) => sum + parseFloat(p.tax_rate), 0) / valuation.length
                  )}%
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
                <span>New valuations</span>
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

      {/* Bill Report Dialog */}
      <Dialog open={!!selectedValuation} onOpenChange={(open) => !open && setSelectedValuation(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Property Bill Report</DialogTitle>
            <DialogDescription>Billing details for property {selectedValuation?.valuation_no}</DialogDescription>
          </DialogHeader>

          {selectedValuation && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Property Tax Bill</h2>
                  <p className="text-muted-foreground">
                    Bill Date: {new Date(selectedValuation.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Bill #: {selectedValuation.valuation_no}-BILL</p>
                  <p className="text-muted-foreground">
                    Due Date: {new Date(new Date(selectedValuation.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Property Details</h3>
                  <p>
                    <span className="font-medium">Valuation No:</span> {selectedValuation.valuation_no}
                  </p>
                  <p>
                    <span className="font-medium">Property No:</span> {selectedValuation.property_no}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    <span className="capitalize">{selectedValuation.property_type}</span>
                  </p>
                  <p>
                    <span className="font-medium">Unit Type:</span> {selectedValuation.data_typeInfo}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Billing Information</h3>
                  <p>
                    <span className="font-medium">Duration:</span> {selectedValuation.duration} months
                  </p>
                  <p>
                    <span className="font-medium">Units:</span> {selectedValuation.units}
                  </p>
                  <p>
                    <span className="font-medium">Tax Rate:</span> {selectedValuation.tax_rate}%
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
                      <TableCell className="text-right">{formatCurrency(selectedValuation.valuation_amt)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Property Tax Rate ({selectedValuation.tax_rate}% of valuation)
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(selectedValuation.tax_amt)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">Total Due</TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(selectedValuation.tax_amt)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Payment Status</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-amber-500">
                    Pending
                  </Badge>
                  <span>Payment pending</span>
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
            <Button variant="outline" onClick={() => setSelectedValuation(null)}>
              Close
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" /> Print Bill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}