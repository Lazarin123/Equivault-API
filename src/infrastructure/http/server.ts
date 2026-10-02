import Fastify from 'fastify';
import cors from '@fastify/cors';
import { groupRoutes } from './routes/group-routes';

const app = Fastify({ logger: true });

app.register(cors, { origin: '*' });
app.register(groupRoutes);

const start = async () => {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3333;
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Servidor rodando na porta ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
