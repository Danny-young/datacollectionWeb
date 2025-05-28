import { BillingMainPage } from "./billingdata"
import { unBilled } from "@/api/properties"
import { billing } from "@/api/bills";
export const revalidate = 30; // Revalidate every 30 seconds

export default async function BillingPage() {
    const unbilling = await unBilled()
    const bills = await billing()
    
    return (
        <div>
            <BillingMainPage bills={bills} unbilledProperties={unbilling} />
        </div>
    )
}