import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private getTotalIncome(): number {
    return this.transactions
      .filter(trans => trans.type === 'income')
      .reduce((sum, transaction) => {
        return sum + transaction.value;
      }, 0);
  }

  private getTotalOutcome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, transaction) => {
        return sum + transaction.value;
      }, 0);
  }

  public getBalance(): Balance {
    const totalIncome = this.getTotalIncome();
    const totalOutcome = this.getTotalOutcome();
    const total = totalIncome - totalOutcome;

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = {
      id: uuid(),
      title,
      value,
      type,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
