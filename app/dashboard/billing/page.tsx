import { BillingTable } from "./billingdata"
import { billing } from "@/api/properties"
export const revalidate = 60; // Revalidate every 60 seconds
// This would typically come from an API
// const mockValuationData = [
//   {
//     id: 1,
//     valuation_no: "VAL-001",
//     valuation_amt: "250000",
//     property_no: "PROP-001",
//     duration: 12,
//     property_type: "commercial",
//     units: 1,
//     tax_rate: "2.5",
//     tax_amt: "6250",
//     data_typeInfo: "retail",
//     createdAt: "2023-01-15T10:30:00Z"
//   },
//   {
//     id: 2,
//     valuation_no: "VAL-002",
//     valuation_amt: "180000",
//     property_no: "PROP-002",
//     duration: 12,
//     property_type: "residential",
//     units: 1,
//     tax_rate: "1.8",
//     tax_amt: "3240",
//     data_typeInfo: "apartment",
//     createdAt: "2023-02-20T14:45:00Z"
//   },
//   {
//     id: 3,
//     valuation_no: "VAL-003",
//     valuation_amt: "350000",
//     property_no: "PROP-003",
//     duration: 12,
//     property_type: "industrial",
//     units: 2,
//     tax_rate: "3.0",
//     tax_amt: "10500",
//     data_typeInfo: "warehouse",
//     createdAt: "2023-03-10T09:15:00Z"
//   },
//   {
//     id: 4,
//     valuation_no: "VAL-004",
//     valuation_amt: "120000",
//     property_no: "PROP-004",
//     duration: 12,
//     property_type: "residential",
//     units: 1,
//     tax_rate: "1.5",
//     tax_amt: "1800",
//     data_typeInfo: "house",
//     createdAt: "2023-04-05T11:20:00Z"
//   },
//   {
//     id: 5,
//     valuation_no: "VAL-005",
//     valuation_amt: "420000",
//     property_no: "PROP-005",
//     duration: 12,
//     property_type: "commercial",
//     units: 3,
//     tax_rate: "2.8",
//     tax_amt: "11760",
//     data_typeInfo: "office",
//     createdAt: "2023-05-12T16:30:00Z"
//   },
//   {
//     id: 6,
//     valuation_no: "VAL-006",
//     valuation_amt: "280000",
//     property_no: "PROP-006",
//     duration: 12,
//     property_type: "industrial",
//     units: 1,
//     tax_rate: "2.2",
//     tax_amt: "6160",
//     data_typeInfo: "factory",
//     createdAt: "2023-06-18T13:40:00Z"
//   }
// ]

export default async function BillingPage() {
    const billings = await billing()
  return (
    <div>
      <BillingTable valuation={billings} />
    </div>
  )
}
