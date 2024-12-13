'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FinanceTracker } from "@/components/finance-tracker"
import { Navbar } from "@/components/navbar"

// Dashboard page component
export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation bar */}
      <Navbar />
      {/* Main finance tracker component */}
      <FinanceTracker />
    </div>
  )
}

