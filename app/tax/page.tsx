"use client"
/* 
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
 */
export default function tax(){
    <div className="text-center text-xl">
        Hello I am the tax page
    </div>
}
