import { prisma } from '../../infrastructure/database/prisma-client';
import { ExchangeRateService } from '../../infrastructure/external/exchange-rate-service';
import { DebtSimplificationService, BalanceSheet } from '../../domain/services/debt-simplification-service';

export class CalculateGroupBalanceUseCase {
  static async execute(groupId: string) {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { members: true, expenses: true },
    });

    if (!group) {
      throw new Error('Grupo não encontrado');
    }

    const targetCurrency = group.currency;
    const balancesMap: { [key: string]: { name: string; paid: number; shouldPay: number } } = {};

    group.members.forEach((member) => {
      balancesMap[member.id] = { name: member.name, paid: 0, shouldPay: 0 };
    });

    // 1. Converter todas as despesas para a moeda padrão do grupo e somar o que cada um pagou
    let totalExpenseAmount = 0;

    for (const expense of group.expenses) {
      const convertedAmount = await ExchangeRateService.convert(
        expense.amount,
        expense.currency,
        targetCurrency
      );

      totalExpenseAmount += convertedAmount;
      if (balancesMap[expense.payerId]) {
        balancesMap[expense.payerId].paid += convertedAmount;
      }
    }

    // 2. Calcular o quanto cada membro deveria pagar de forma igualitária
    const memberCount = group.members.length;
    const sharePerMember = memberCount > 0 ? totalExpenseAmount / memberCount : 0;

    const sheet: BalanceSheet[] = Object.keys(balancesMap).map((memberId) => {
      const data = balancesMap[memberId];
      const netBalance = data.paid - sharePerMember; // Saldo líquido
      return {
        memberId,
        memberName: data.name,
        netBalance: Math.round(netBalance * 100) / 100,
      };
    });

    // 3. Otimizar as transações
    const optimizedTransactions = DebtSimplificationService.optimize(sheet);

    return {
      groupId: group.id,
      groupName: group.name,
      currency: targetCurrency,
      totalSpent: Math.round(totalExpenseAmount * 100) / 100,
      memberBalances: sheet,
      suggestedTransactions: optimizedTransactions,
    };
  }
}
