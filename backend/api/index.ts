import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { Request, Response } from 'express';

const server = express();
let app: any;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    });
    await app.init();
  }
  return server;
}

export default async function handler(req: Request, res: Response) {
  const srv = await bootstrap();
  srv(req, res);
}
