'use client'
import { useState, useEffect } from 'react';
import { getPropertyByValuationNumber } from '@/api/properties';
//import { notFound } from 'next/navigation';

import Link from "next/link"
//import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Printer, Filter, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


interface PropertyData {
  id: number;
  valuation_no: string;
  valuation_amt: string;
  property_no: string;
  duration: number;
  property_type: string;
  units: number;
  tax_rate: string;
  data_typeInfo: string;
  createdAt: string;
  isbilled: number;
  payment_status?: string;
}



interface PropertyDetailsPageProps {
  valuation_no: string; // Change to accept the value directly
}

// Accept the unwrapped param from the parent
function PropertyDetailsPage({ valuation_no }: PropertyDetailsPageProps) {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);

  // Format currency
  const formatCurrency = (
    amount: string | number,
    currency: string = 'GHS', // Default: Ghana Cedi (GHS)
    locale: string = 'en-GH'  // Default: Ghana locale (optional)
  ) => {
    try {
      const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
      if (isNaN(numericAmount)) return 'GH₵0.00'; // Fallback with GHS symbol
      
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency, // Now defaults to 'GHS'
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numericAmount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return 'GH₵0.00'; // Fallback with GHS symbol
    }
  };

  // Calculate totals
  const calculateTotalAmount = () => {
    return properties.reduce((sum, property) => {
      const amount = parseFloat(property.valuation_amt) || 0;
      return sum + amount;
    }, 0);
  };

//   const calculateTotalTax = () => {
//     return properties.reduce((sum, property) => {
//       const amount = parseFloat(property.valuation_amt) || 0;
//       const taxRate = parseFloat(property.tax_rate.replace('%', '')) || 0;
//       return sum + (amount * (taxRate / 100));
//     }, 0);
//   };

  const calculateTotalUnits = () => {
    return properties.reduce((sum, property) => sum + (property.units || 0), 0);
  };

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = 
      property.property_no?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.data_typeInfo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = 
      propertyTypeFilter === "all" || 
      property.property_type.toLowerCase() === propertyTypeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  const handlePropertyClick = (property: PropertyData) => {
    setSelectedProperty(property);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getPropertyByValuationNumber(valuation_no);
        
        // Your backend now returns an array thanks to our fix
        const propertiesData = Array.isArray(data) ? data : [data];
        
        if (!propertiesData || propertiesData.length === 0) {
          setError("No properties found");
          return;
        }
        
        setProperties(propertiesData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [valuation_no]);

  if (isLoading) return <div >Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (properties.length === 0) return <div>No properties found</div>;

  return (
<div className="container py-6">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/dashboard/datacollection">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to properties
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          {/* <h1 className="text-3xl font-bold">Valuation: {decodedValuationNo}</h1> */}
          <p className="text-muted-foreground">
            {isLoading ? "Loading properties..." : `${properties.length} properties found`}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Button>
        </div>
      </div>

      

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by property number or type..."
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
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="Mixed use">Mixed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-6 flex justify-center items-center">
            <p>Loading properties...</p>
          </CardContent>
        </Card>
      ) : filteredProperties.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property No</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Valuation Amount</TableHead>
                <TableHead>Tax Rate</TableHead>
                <TableHead>Billed</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow
                  key={property.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handlePropertyClick(property)}
                >
                  <TableCell className="font-medium">{property.property_no || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={property.property_type === "commercial" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {property.property_type}
                    </Badge>
                  </TableCell>
                  <TableCell>{property.data_typeInfo}</TableCell>
                  <TableCell>{property.units}</TableCell>
                  <TableCell>{property.duration} months</TableCell>
                  <TableCell>{formatCurrency(property.valuation_amt)}</TableCell>
                  <TableCell>{property.tax_rate}%</TableCell>
                  <TableCell>
                    {property.isbilled === 1 ? 'Yes' : 'No'}
                  </TableCell> 
                  {/* <TableCell>
                    {formatCurrency(
                      (
                        Number.parseFloat(property.valuation_amt) *
                        (Number.parseFloat(property.tax_rate) / 100)
                      ).toString(),
                    )}
                  </TableCell> */}
                  <TableCell>
                    <Badge variant={property.payment_status === 'Paid' ? 'default' : 'secondary'}>
                      {property.payment_status || 'Pending'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 flex justify-center items-center">
            <p>No properties found matching your filters.</p>
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Valuation Summary</CardTitle>
            <CardDescription>Overview of properties under this valuation number</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Property Distribution</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Residential</span>
                    <span className="font-medium">
                      {properties.filter((p) => p.property_type === "residential").length} properties
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commercial</span>
                    <span className="font-medium">
                      {properties.filter((p) => p.property_type === "commercial").length} properties
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mixed</span>
                    <span className="font-medium">
                      {properties.filter((p) => p.property_type === "Mixed use").length} properties
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Card className="w-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Valuation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoading ? "..." : `${formatCurrency(calculateTotalAmount())}`}
                    </div>
                    <p className="text-xs text-muted-foreground">Combined property value</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Additional Information</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Valaution_No</p>
                  <p className="text-lg font-bold">{valuation_no}</p>
                </div>

                
                <div>
                  <p className="text-sm text-muted-foreground">Total Properties</p>
                  <p className="text-lg font-bold">{properties.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Units</p>
                  <p className="text-lg font-bold">{calculateTotalUnits()}</p>
                </div>
                {/* <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-lg font-bold">{properties[0]?.duration || "N/A"} months</p>
                </div> */}
                <div>
                  <p className="text-sm text-muted-foreground">Created Date</p>
                  <p className="text-lg font-bold">
                    {properties[0] ? new Date(properties[0].createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" /> Download Full Report
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Property Detail Dialog */}
      <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && setSelectedProperty(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
            <DialogDescription>
              Property {selectedProperty?.property_no || "N/A"} under valuation {valuation_no}
            </DialogDescription>
          </DialogHeader>

          {selectedProperty && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Property Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property No:</span>
                      <span className="font-medium">{selectedProperty.property_no || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium capitalize">{selectedProperty.property_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Details:</span>
                      <span className="font-medium">{selectedProperty.data_typeInfo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Units:</span>
                      <span className="font-medium">{selectedProperty.units}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-medium">{new Date(selectedProperty.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Financial Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valuation Amount:</span>
                      <span className="font-medium">{formatCurrency(selectedProperty.valuation_amt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax Rate:</span>
                      <span className="font-medium">{selectedProperty.tax_rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax Amount:</span>
                      <span className="font-medium">
                        {formatCurrency(
                          (
                            Number.parseFloat(selectedProperty.valuation_amt) *
                            (Number.parseFloat(selectedProperty.tax_rate) / 100)
                          ).toString(),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{selectedProperty.duration} months</span>
                    </div>
                
                  </div>
                </div>
              </div>

            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedProperty(null)}>
              Close
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" /> Print Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
  
}

export default PropertyDetailsPage;