"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { Building, ArrowRight, /* CheckCircle */ } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselItems = [
  {
    image: "/images/propertycollection.jpg",
    title: "Efficient Property Data Collection",
    description: "Streamline your property data collection process with our advanced system.",
  },
  {
    image: "/images/realtime_analytics.jpg",
    title: "Real-time Analytics",
    description: "Get instant insights with our powerful analytics dashboard.",
  },
  {
    image: "/images/datacollection.jpg",
    title: "Mobile-friendly Data Collection",
    description: "Collect property data on-the-go with our mobile-optimized platform.",
  },
]

const features = [
  {
    title: "Efficient Data Collection",
    description: "Our streamlined process ensures quick and accurate property data collection.",
    icon: "📱"
  },
  {
    title: "Real-time Analytics",
    description: "Get instant insights with our powerful analytics dashboard.",
    icon: "📊"
  },
  {
    title: "User-friendly Interface",
    description: "Our intuitive interface makes property data management a breeze.",
    icon: "🖥️"
  }
]

export default function LandingPage() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col p-4">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <Building className="h-6 w-6" />
            <span>PropertyCollect</span>
          </div>
          <nav className="flex items-center gap-4">
        <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">
        Dashboard
        </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Contact
            </Link>
            <Button asChild>
              <Link href="/login">
                Login <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 bg-gradient-to-b from-background to-muted">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                  Property Data Collection Made Simple
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Streamline your property data collection process with our advanced system.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/demo">View Demo</Link>
                  </Button>
                </div>
              </div>
              <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-xl mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {carouselItems.map((item, index) => (
                    <CarouselItem key={index}>
                      <Card>
                        <CardContent className="p-0">
                          <div className="relative aspect-[16/9]">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose PropertyCollect?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="relative p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12">Ready to Get Started?</h2>
            <Button size="lg" asChild>
              <Link href="/register">
                Start Collecting Data <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold mb-4">
                <Building className="h-6 w-6" />
                <span>PropertyCollect</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Streamlining property data collection for efficient management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="/pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link href="/demo" className="text-muted-foreground hover:text-primary">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Twitter</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">LinkedIn</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">GitHub</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 PropertyCollect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}