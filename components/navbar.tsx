'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"


// Navbar component
export function Navbar() {
  // Hooks for theme, navigation, and notifications
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const { toast } = useToast()

  // Handle user logout
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    localStorage.removeItem('transactions')
    // Show logout notification
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    // Redirect to home page
    router.push('/')
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* App title/logo */}
        <Link href="/" className="text-xl font-bold">Finance Tracker</Link>
        <div className="flex items-center space-x-4">
          {/* Logout button */}
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          {/* Theme toggle button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}

