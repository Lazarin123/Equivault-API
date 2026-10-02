import { FastifyInstance } from 'fastify';
import { GroupController } from '../controllers/group-controller';

export async function groupRoutes(app: FastifyInstance) {
  app.post('/groups', GroupController.createGroup);
  app.post('/groups/:groupId/members', GroupController.addMember);
  app.post('/groups/:groupId/expenses', GroupController.addExpense);
  app.get('/groups/:groupId/balance', GroupController.getBalance);
}
