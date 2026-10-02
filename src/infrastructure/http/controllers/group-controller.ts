import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../database/prisma-client';
import { CalculateGroupBalanceUseCase } from '../../../application/use-cases/calculate-group-balance-use-case';

export class GroupController {
  static async createGroup(req: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
      name: z.string(),
      currency: z.string().default('BRL'),
    });

    const { name, currency } = schema.parse(req.body);
    const group = await prisma.group.create({ data: { name, currency } });
    return reply.status(201).send(group);
  }

  static async addMember(req: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ groupId: z.string().uuid() });
    const bodySchema = z.object({ name: z.string() });

    const { groupId } = paramsSchema.parse(req.params);
    const { name } = bodySchema.parse(req.body);

    const member = await prisma.member.create({ data: { name, groupId } });
    return reply.status(201).send(member);
  }

  static async addExpense(req: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ groupId: z.string().uuid() });
    const bodySchema = z.object({
      description: z.string(),
      amount: z.number().positive(),
      currency: z.string().length(3), // Ex: USD, BRL, EUR
      payerId: z.string().uuid(),
    });

    const { groupId } = paramsSchema.parse(req.params);
    const { description, amount, currency, payerId } = bodySchema.parse(req.body);

    const expense = await prisma.expense.create({
      data: { description, amount, currency, payerId, groupId },
    });

    return reply.status(201).send(expense);
  }

  static async getBalance(req: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({ groupId: z.string().uuid() });
    const { groupId } = schema.parse(req.params);

    try {
      const balance = await CalculateGroupBalanceUseCase.execute(groupId);
      return reply.send(balance);
    } catch (error) {
      return reply.status(400).send({ error: (error as Error).message });
    }
  }
}
