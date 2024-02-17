// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Load environment variables from .env file
  dotenv.config();

  // Get the port from the environment variable or use a default value (e.g., 3000)
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, { cors: true });

  // Configure the app to listen on the specified port
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
