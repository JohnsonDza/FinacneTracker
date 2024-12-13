import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Transaction } from '@/types/transaction'
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

interface TransactionListProps {
  transactions: Transaction[]
  onDeleteTransaction: (id: number) => void
}

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
            <TableCell>{transaction.date.toLocaleTimeString()}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
            <TableCell className={transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {transaction.type}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => onDeleteTransaction(transaction.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

