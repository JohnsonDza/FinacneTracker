'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Transaction } from '@/types/transaction'

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('income')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description && amount) {
      onAddTransaction({
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        type,
        date: new Date(),
      })
      setDescription('')
      setAmount('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />
      </div>
      <RadioGroup value={type} onValueChange={(value) => setType(value as 'income' | 'expense')}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="income" id="income" />
          <Label htmlFor="income">Income</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="expense" id="expense" />
          <Label htmlFor="expense">Expense</Label>
        </div>
      </RadioGroup>
      <Button type="submit" className="w-full">Add Transaction</Button>
    </form>
  )
}

