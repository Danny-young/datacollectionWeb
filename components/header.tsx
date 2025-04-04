"use client"

import Link from "next/link"
import { Building, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { useAuth } from "@/components/auth-provider"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function Header() {
//   const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 font-bold">
          <Building className="h-6 w-6" />
          <span>PropertyCollect</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/dashboard"
            className={isActive("/dashboard") ? "font-medium" : "text-muted-foreground hover:text-foreground"}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/agents"
            className={isActive("/dashboard/agents") ? "font-medium" : "text-muted-foreground hover:text-foreground"}
          >
            Agents
          </Link>
          <Link
            href="/dashboard/datacollection"
            className={isActive("/dashboard/datacollection") ? "font-medium" : "text-muted-foreground hover:text-foreground"}
          >
            Properties
          </Link>
          <Link
            href="/dashboard/map"
            className={isActive("/dashboard/map") ? "font-medium" : "text-muted-foreground hover:text-foreground"}
          >
            Map
          </Link>
          <Link
            href="/dashboard/billing"
            className={isActive("/dashboard/billing") ? "font-medium" : "text-muted-foreground hover:text-foreground"}
          >
            Reports
          </Link>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex">
          <Button variant="outline" className="mr-2">
            Profile
          </Button>
          <Button /* onClick={logout} */>Logout</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Button variant="outline" size="lg">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b bg-background">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/dashboard"
                className={isActive("/dashboard") ? "font-medium" : "text-muted-foreground"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/agents"
                className={isActive("/agents") ? "font-medium" : "text-muted-foreground"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Agents
              </Link>
              <Link
                href="/properties"
                className={isActive("/properties") ? "font-medium" : "text-muted-foreground"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/map"
                className={isActive("/map") ? "font-medium" : "text-muted-foreground"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Map
              </Link>
              <Link
                href="/reports"
                className={isActive("/reports") ? "font-medium" : "text-muted-foreground"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Reports
              </Link>
            </nav>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Profile
              </Button>
              <Button className="flex-1" /* onClick={logout} */>
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

