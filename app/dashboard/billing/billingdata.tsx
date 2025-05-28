"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"
import {
  FileText,
  Filter,
  Search,
  Download,
  Printer,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  RefreshCw,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { billing, createIndividualBill } from "@/api/bills"
import { unBilled } from "@/api/properties"

interface Bill {
  id: number
  valuation_no: string
  valuation_amt: number
  property_no: string
  duration: number
  property_type: string
  units?: number
  data_typeInfo: string  
  billId: string
  bill_amount: string
  billing_year: number
  status?: string
  createdAt: string
  updatedAt: string
}

interface Unbilled {
  id: number
  valuation_no: string
  valuation_amt: number
  property_no: string
  duration: number
  property_type: string
  units: number
  tax_rate: number
  data_typeInfo: string
  createdAt: string
  isbilled: number
}

// interface BillResponse {
//   bills: Bill[];
//   success: boolean;
// }

interface BillingDataProps {
  bills: Bill[];
  unbilledProperties: Unbilled[];
}

export function BillingMainPage({ bills, unbilledProperties }: BillingDataProps) {
  const [activeTab, setActiveTab] = useState("generate")
  const [billsState, setBillsState] = useState<Bill[]>(bills)
  const [unbilledState, setUnbilledState] = useState<Unbilled[]>(unbilledProperties)
  const [selectedProperties, setSelectedProperties] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [isLoading] = useState(false)
  const [showGenerateBillDialog, setShowGenerateBillDialog] = useState(false)
  const [showBillDetailsDialog, setShowBillDetailsDialog] = useState(false)
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null)
  const [showNotification, setShowNotification] = useState(true)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [paymentReference, setPaymentReference] = useState("")
  const [processingPayment, setProcessingPayment] = useState(false)
  const router = useRouter()

  // Filter unbilled properties based on search query and filters
  const filteredUnbilledProperties = unbilledState.filter((property) => {
    const matchesSearch =
      property.valuation_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.property_no.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = propertyTypeFilter === "all" || property.property_type === propertyTypeFilter

    return matchesSearch && matchesType
  })

  // Filter bills based on search query and filters
  const filteredBills = billsState.filter((bill) => {
    const matchesSearch =
      bill.billId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.valuation_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.property_no.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || bill.status === statusFilter
    const matchesYear = yearFilter === "all" || bill.billing_year.toString() === yearFilter

    return matchesSearch && matchesStatus && matchesYear
  })

  const handleSelectAllProperties = (checked: boolean) => {
    if (checked) {
      setSelectedProperties(filteredUnbilledProperties.map((property) => property.id))
    } else {
      setSelectedProperties([])
    }
  }

  const handleSelectProperty = (propertyId: number, checked: boolean) => {
    if (checked) {
      setSelectedProperties([...selectedProperties, propertyId])
    } else {
      setSelectedProperties(selectedProperties.filter((id) => id !== propertyId))
    }
  }

  const handleGenerateBills = () => {
  if (selectedProperties.length === 0) return;
  setShowGenerateBillDialog(true);
};

const confirmGenerateBills = async () => {
  let toastId;
  try {
    setShowGenerateBillDialog(false);

    // Show loading state
    toastId = toast.loading("Generating bills...");

    // Prepare property IDs (if needed)
    const selectedPropertiesData = selectedProperties
      .map(propertyId => {
        const property = unbilledState.find((p) => p.id === propertyId);
        return property?.id;
      })
      .filter((id): id is number => id !== null && id !== undefined);

    // Call your API endpoint to generate bills
    const result = await createIndividualBill(selectedPropertiesData);
    console.log('API Response:', result);

    // Refresh unbilled properties from backend
    const updatedUnbilled = await unBilled();
    setUnbilledState(updatedUnbilled);

    // Refresh bills data before switching tabs
    const updatedBills = await billing();
    setBillsState(updatedBills);

    // Clear selection
    setSelectedProperties([]);

    // Switch to bills tab after data is refreshed
    setActiveTab("bills");

    // Dismiss loading toast and show success message
    toast.dismiss(toastId);
    toast.success("Bills generated successfully");
  } catch (error) {
    console.error('Error generating bills:', error);

    // Dismiss loading toast and show error message
    if (toastId) toast.dismiss(toastId);
    toast.error(error instanceof Error ? error.message : 'Failed to generate bills');
  }
};

  const viewBillDetails = (bill: Bill) => {
    setSelectedBill(bill)
    setShowBillDetailsDialog(true)
  }

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(Number(amount))
  }

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="default" className="bg-green-500">
            Paid
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

  const calculateTotalSelected = () => {
    return selectedProperties.reduce((total, propertyId) => {
      const property = unbilledState.find((p) => p.id === propertyId)
      return total + (property ? Number(property.valuation_amt) : 0)
    }, 0)
  }

  const calculateTotalBillAmount = () => {
    return calculateTotalSelected() * 2.75
  }

  const calculateCollectionRate = () => {
    const totalBills = billsState.length
    const paidBills = billsState.filter((bill) => bill.status === "paid").length
    return totalBills > 0 ? (paidBills / totalBills) * 100 : 0
  }

  const calculateTotalBilled = () => {
    return billsState.reduce((total, bill) => total + Number(bill.bill_amount), 0)
  }

  const calculateTotalCollected = () => {
    return billsState.filter((bill) => bill.status === "paid").reduce((total, bill) => total + Number(bill.bill_amount), 0)
  }

  const dismissNotification = () => {
    setShowNotification(false)
  }

  // Add a function to handle making a payment
  const handleMakePayment = (bill: Bill) => {
    setSelectedBill(bill)
    setPaymentAmount(bill.bill_amount)
    setShowPaymentDialog(true)
    setShowBillDetailsDialog(false)
  }

  // Add a function to process the payment
  const processPayment = () => {
    setProcessingPayment(true)

    setTimeout(() => {
      const updatedBills = billsState.map((bill) => {
        if (bill.id === selectedBill?.id) {
          return {
            ...bill,
            status: "paid",
            updatedAt: new Date().toISOString(),
          }
        }
        return bill
      })

      setBillsState(updatedBills)
      setProcessingPayment(false)
      setShowPaymentDialog(false)
    }, 1500)
  }

  return (
    <>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Billing Management</h1>
            <p className="text-muted-foreground">Generate and manage property bills</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Print Report
            </Button>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
            </Button>
          </div>
        </div>

        {showNotification && unbilledState.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 flex items-start justify-between">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">New Properties Available for Billing</h3>
                <p className="text-amber-700">
                  {unbilledState.length} properties are ready to be billed. Generate bills now to ensure timely
                  collection.
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={dismissNotification}>
              Dismiss
            </Button>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate Bills</TabsTrigger>
            <TabsTrigger value="bills">Manage Bills</TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={
                  activeTab === "generate"
                    ? "Search properties by valuation number, property number..."
                    : "Search bills by ID, valuation number..."
                }
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {activeTab === "generate" ? (
                <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="mixed use">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Billing Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          <TabsContent value="generate" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Properties Available for Billing</h2>
                <p className="text-muted-foreground">
                  {isLoading ? "Loading properties..." : `${filteredUnbilledProperties.length} properties found`}
                </p>
              </div>
              <Button onClick={handleGenerateBills} disabled={selectedProperties.length === 0 || isLoading}>
                <FileText className="mr-2 h-4 w-4" /> Generate Bills ({selectedProperties.length})
              </Button>
            </div>

            {isLoading ? (
              <Card>
                <CardContent className="p-6 flex justify-center items-center">
                  <p>Loading properties...</p>
                </CardContent>
              </Card>
            ) : filteredUnbilledProperties.length > 0 ? (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedProperties.length > 0 &&
                          selectedProperties.length === filteredUnbilledProperties.length
                        }
                        onCheckedChange={handleSelectAllProperties}
                        aria-label="Select all properties"
                      />
                    </TableHead>
                    <TableHead>Property No</TableHead>
              <TableHead>Valuation No</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Tax</TableHead>
              <TableHead>Valuation Amount</TableHead>
                    <TableHead>Billed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUnbilledProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProperties.includes(property.id)}
                          onCheckedChange={(checked) => handleSelectProperty(property.id, !!checked)}
                          aria-label={`Select property ${property.property_no}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{property.property_no}</TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="p-0 h-auto font-normal"
                          onClick={() => router.push(`/dashboard/valuation/${encodeURIComponent(property.valuation_no)}`)}
                        >
                          {property.valuation_no}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={property.property_type === "commercial" ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {property.property_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{property.data_typeInfo}</TableCell>
                      <TableCell>{property.duration}</TableCell>
                      <TableCell>{property.units}</TableCell>
                      <TableCell>{property.tax_rate}%</TableCell>
                      <TableCell>{formatCurrency(property.valuation_amt.toString())}</TableCell>
                      <TableCell>
                        <Badge variant={property.isbilled === 1 ? "default" : "secondary"}>
                          {property.isbilled === 1 ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center py-10">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">All Properties Billed</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  There are no properties available for billing at the moment. All properties have been billed.
                </p>
              </CardContent>
            </Card>
          )}

          {selectedProperties.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Billing Summary</CardTitle>
                <CardDescription>Summary of selected properties for billing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Selected Properties</p>
                    <p className="text-2xl font-bold">{selectedProperties.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Valuation</p>
                    <p className="text-2xl font-bold">{formatCurrency(calculateTotalSelected().toFixed(2))}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bill Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(calculateTotalBillAmount().toFixed(2))}</p>
                    <p className="text-xs text-muted-foreground">Based on 2.75% tax rate</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleGenerateBills}>
                  <FileText className="mr-2 h-4 w-4" /> Generate Bills for Selected Properties
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="bills" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{billsState.length}</div>
                <p className="text-xs text-muted-foreground">
                  {billsState.filter((bill) => bill.status === "unpaid").length} unpaid
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculateCollectionRate().toFixed(1)}%</div>
                <Progress value={calculateCollectionRate()} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(calculateTotalCollected().toFixed(2))}</div>
                <p className="text-xs text-muted-foreground">
                  of {formatCurrency(calculateTotalBilled().toFixed(2))} billed
                </p>
              </CardContent>
            </Card>
          </div>

          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center items-center">
                <p>Loading bills...</p>
              </CardContent>
            </Card>
          ) : filteredBills.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill ID</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Bill Amount</TableHead>
                    <TableHead>Billing Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                  {filteredBills.map((bill) => (
                    <TableRow key={bill.id} className="cursor-pointer" onClick={() => viewBillDetails(bill)}>
                      <TableCell className="font-medium">{bill.billId}</TableCell>
                <TableCell>
                          <div className="flex flex-col">
                            <span>{bill.property_no}</span>
                            <span className="text-xs text-muted-foreground">{bill.valuation_no}</span>
                          </div>
                </TableCell>
                      <TableCell>{formatCurrency(bill.bill_amount)}</TableCell>
                      <TableCell>{bill.billing_year}</TableCell>
                      <TableCell>{getStatusBadge(bill.status)}</TableCell>
                      <TableCell>{new Date(bill.createdAt).toLocaleDateString()}</TableCell>
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
                                  viewBillDetails(bill)
                                }}
                              >
                                View Bill Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Print Bill</DropdownMenuItem>
                              {bill.status === "unpaid" && (
                                <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMakePayment(bill)
                                }}
                              >
                                Make Payment
                              </DropdownMenuItem>  )}
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View Property</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                </TableCell>
              </TableRow>
                  ))}
          </TableBody>
        </Table>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 flex justify-center items-center">
                <p>No bills found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Generate Bill Dialog */}
      <Dialog open={showGenerateBillDialog} onOpenChange={setShowGenerateBillDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Bills</DialogTitle>
            <DialogDescription>
              You are about to generate bills for {selectedProperties.length} properties. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-muted/50">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Selected Properties:</span>
                <span className="font-medium">{selectedProperties.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Total Valuation:</span>
                <span className="font-medium">{formatCurrency(calculateTotalSelected().toFixed(2))}</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-muted-foreground">Total Bill Amount:</span>
                <span className="font-medium">{formatCurrency(calculateTotalBillAmount().toFixed(2))}</span>
              </div> */}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Bills will be generated for the current year (2025)</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span>Tax rate of 2.75% will be applied to all properties</span>
            </div> */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGenerateBillDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmGenerateBills}>Generate Bills</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bill Details Dialog */}
      <Dialog open={showBillDetailsDialog} onOpenChange={setShowBillDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Bill Details</DialogTitle>
            <DialogDescription>
              {selectedBill?.billId} - {selectedBill?.property_no}
            </DialogDescription>
          </DialogHeader>

          {selectedBill && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Property Tax Bill</h2>
                  <p className="text-muted-foreground">
                    Bill Date: {new Date(selectedBill.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Bill #: {selectedBill.billId}</p>
                  <p className="text-muted-foreground">Billing Year: {selectedBill.billing_year}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Property Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property No:</span>
                      <span className="font-medium">{selectedBill.property_no}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valuation No:</span>
                      <span className="font-medium">{selectedBill.valuation_no}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium capitalize">{selectedBill.property_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Details:</span>
                      <span className="font-medium">{selectedBill.data_typeInfo}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Billing Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bill Amount:</span>
                      <span className="font-medium">{formatCurrency(selectedBill.bill_amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span>{getStatusBadge(selectedBill.status)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created Date:</span>
                      <span className="font-medium">{new Date(selectedBill.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedBill.status === "unpaid" && (
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Payment Information</h3>
                  <p className="text-sm text-muted-foreground">
                    This bill is currently unpaid. Please make payment to avoid late penalties.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBillDetailsDialog(false)}>
              Close
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" /> Print Bill
            </Button>
            {selectedBill?.status === "unpaid" && (
              <Button variant="default" className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" /> Mark as Paid
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>Enter payment details for bill {selectedBill?.billId}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <Input
                id="amount"
                type="text"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="0.00"
              />
              <p className="text-xs text-muted-foreground">
                Total bill amount: {selectedBill ? formatCurrency(selectedBill.bill_amount) : ""}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Payment Reference</Label>
              <Input
                id="reference"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="Transaction ID, Receipt Number, etc."
              />
            </div>

            <div className="border rounded-md p-4 bg-muted/50">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Bill ID:</span>
                <span className="font-medium">{selectedBill?.billId}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Property:</span>
                <span className="font-medium">{selectedBill?.property_no}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)} disabled={processingPayment}>
              Cancel
            </Button>
            <Button onClick={processPayment} disabled={processingPayment || !paymentAmount || !paymentMethod}>
              {processingPayment ? "Processing..." : "Complete Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
      <Toaster />
    </>
  );
}