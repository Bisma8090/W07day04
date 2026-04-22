import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();
let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return expressApp;

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.init();
  isInitialized = true;
  return expressApp;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(async () => {
    const port = process.env.PORT ?? 4000;
    expressApp.listen(port, () => {
      console.log(`🚀 Backend running on http://localhost:${port}`);
    });
  });
}

// Vercel serverless handler
export default async (req: any, res: any) => {
  const app = await bootstrap();
  app(req, res);
};
