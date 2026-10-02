export interface BalanceSheet {
  memberId: string;
  memberName: string;
  netBalance: number; // Positivo = vai receber, Negativo = deve
}

export interface OptimizedTransaction {
  from: string;
  to: string;
  amount: number;
}

export class DebtSimplificationService {
  static optimize(balances: BalanceSheet[]): OptimizedTransaction[] {
    // Clona e separa quem deve (devedores) de quem tem a receber (credores)
    let debtors = balances
      .filter((b) => b.netBalance < -0.01)
      .map((b) => ({ ...b, netBalance: Math.abs(b.netBalance) }));

    let creditors = balances
      .filter((b) => b.netBalance > 0.01)
      .map((b) => ({ ...b }));

    const transactions: OptimizedTransaction[] = [];

    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      // Determina o valor da transação (o menor entre o quanto o devedor deve e o credor tem a receber)
      const amount = Math.min(debtor.netBalance, creditor.netBalance);
      const roundedAmount = Math.round(amount * 100) / 100;

      if (roundedAmount > 0) {
        transactions.push({
          from: debtor.memberName,
          to: creditor.memberName,
          amount: roundedAmount,
        });
      }

      debtor.netBalance -= amount;
      creditor.netBalance -= amount;

      if (debtor.netBalance < 0.01) i++;
      if (creditor.netBalance < 0.01) j++;
    }

    return transactions;
  }
}
