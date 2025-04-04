"use client";

//import Link from "next/link"
import { /* Building */ MapPin, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, /* CardFooter */ } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, Bar } from 'react-chartjs-2'; //recharts,react-chartjs-2
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend 
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Header } from "@/components/header";
// Sample data for charts
const collectionTrends = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Monthly Collections',
    data: [450, 520, 480, 600, 580, 620],
    borderColor: '#2563EB',
    tension: 0.4,
  }]
};

const areaPerformance = {
  labels: ['Ablekuma Central', 'Ablekuma North', 'Ablekuma South', 'Ablekuma West'],
  datasets: [{
    label: 'Properties Collected',
    data: [320, 280, 250, 290],
    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#6366F1'],
  }]
};

export default function Dashboard() {
    return ( 
      <div className="flex min-h-screen flex-col p-4">
      <Header/>
      
      <main className="flex-1">
  
      <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <select className="border rounded-md px-3 py-2">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
              </select>
              <Button variant="outline">
                Export Report
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 new this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Electoral Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Across 3 districts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Data Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12/day</div>
                <p className="text-xs text-muted-foreground">+18% from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* New Alert Section */}
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <p className="ml-3 text-sm text-yellow-700">
                <span className="font-medium">Attention needed:</span> 15 properties pending verification in Ablekuma Central
              </p>
            </div>
          </div>
      

          {/* Charts Section */}
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Collection Trends</CardTitle>
                <CardDescription>Daily property data collection trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Line 
                    data={collectionTrends}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Area Performance</CardTitle>
                <CardDescription>Properties collected by electoral area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar 
                    data={areaPerformance}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

   {/* Map Overview */}
 <Card className="mt-6">
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Property distribution across electoral areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Map integration coming soon</span>
              </div>
            </CardContent>
          </Card>


              {/* Performance Insights */}
              <div className="grid gap-6 mt-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Collection Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">92%</div>
                <p className="text-xs text-muted-foreground">Average completion rate</p>
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full" style={{ width: '92%' }} />
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Data Quality Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">4.8/5.0</div>
                <p className="text-xs text-muted-foreground">Based on verification results</p>
                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className={`h-2 w-4 rounded-full ${star <= 4.8 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Coverage Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">68%</div>
                <p className="text-xs text-muted-foreground">Of total target area</p>
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-purple-600 rounded-full" style={{ width: '68%' }} />
                </div>
              </CardContent>
            </Card>
            </div>


          </div>  
       
        </main>
      </div>
    )
  }