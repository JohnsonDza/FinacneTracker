import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-6">Welcome to Finance Tracker</h1>
      <p className="text-xl mb-8">Track your income and expenses with ease</p>
      <div className="space-x-4">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </div>
    </div>
  )
}

