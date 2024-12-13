import { Transaction } from "@/types/transaction";
export const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((total, transaction) => {
    return transaction.type === "income"
      ? total + transaction.amount
      : total - transaction.amount;
  }, 0);
}
