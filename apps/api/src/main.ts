import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logging/logger.service';

async function bootstrap() {
  const logger = new CustomLoggerService();
  
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  
  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  
  logger.log(`Application is running on port ${port}`, 'Bootstrap');
}
bootstrap();
