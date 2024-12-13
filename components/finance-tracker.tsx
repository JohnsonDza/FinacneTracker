'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionForm } from './transaction-form'
import { TransactionList } from './transaction-list'
import { calculateBalance } from '@/lib/utils'
import { Transaction } from '@/types/transaction'
import { Button } from '@/components/ui/button'

// Main FinanceTracker component
export function FinanceTracker() {
  // State for storing transactions
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Load transactions from local storage on component mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions')
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions).map((t: Transaction) => ({
        ...t,
        date: new Date(t.date)
      })))
    }
  }, [])

  // Save transactions to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  // Add a new transaction
  const addTransaction = (newTransaction: Transaction) => {
    setTransactions([...transactions, { ...newTransaction, date: new Date() }])
  }

  // Delete a transaction
  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  // Clear all transactions
  const clearTransactions = () => {
    setTransactions([])
  }

  // Calculate the current balance
  const balance = calculateBalance(transactions)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Finance Tracker</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Transaction form */}
        <Card>
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm onAddTransaction={addTransaction} />
          </CardContent>
        </Card>
        {/* Balance display */}
        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-center">
              ${balance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Transaction history */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <Button variant="destructive" onClick={clearTransactions}>Clear All</Button>
        </CardHeader>
        <CardContent>
          <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
        </CardContent>
      </Card>
    </div>
  )
}

