//const API_URL = process.env.NEXT_PUBLIC_API_URL;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Bill {
    id: number
    valuation_no: string
    valuation_amt: number
    property_no: string
    duration:number
    property_type:string
    units?:number
    data_typeInfo: string  
    billId: string
    bill_amount: string
    billing_year: number
    status?: string
    createdAt: string
    updatedAt: string
  }

export const revalidate = 30; 
export async function billing(): Promise<Bill[]> {
    try {
        const res = await fetch(`${API_URL}/billing`);
        if (!res.ok) {
            throw new Error('Failed to fetch bills');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching bills:', error);
        return [];
    }
}

export async function getBillById(id: number): Promise<Bill | null> {
    try {
        const res = await fetch(`${API_URL}/billing/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch bill');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching bill:', error);
        return null;
    }
}

export async function createBill(billData: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bill | null> {
    try {
        const res = await fetch(`${API_URL}/billing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(billData),
        });
        if (!res.ok) {
            throw new Error('Failed to create bill');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error creating bill:', error);
        return null;
    }
}






export async function createIndividualBill(propertyIds: number[]) {
  try {
    const response = await fetch(`${API_URL}/billing/create-selected-bills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ propertyIds }),
      //credentials: 'include' // Remove if not using cookies
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate bills');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating bills:', error);
    throw error;
  }
}

export async function updateBillStatus(billId: number, status: string): Promise<Bill | null> {
    try {
        const res = await fetch(`${API_URL}/billing/${billId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        if (!res.ok) {
            throw new Error('Failed to update bill status');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error updating bill status:', error);
        return null;
    }
} 


///New Create Bill 

export async function createNewBill(billData: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bill | null> {
    try {
        const res = await fetch(`${API_URL}/billing/create-bill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(billData),
        });
        if (!res.ok) {
            throw new Error('Failed to create bill');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error creating bill:', error);
        return null;
    }
}