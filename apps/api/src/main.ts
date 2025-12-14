import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logging/logger.service';

async function bootstrap() {
  const logger = new CustomLoggerService();
  
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Employee Management API')
    .setDescription('API for managing employees and organizational structure')
    .setVersion('1.0')
    .addTag('Employees', 'Employee management endpoints')
    .addTag('Events', 'Event logging and tracking')
    .addTag('Health', 'Health check endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  
  logger.log(`Application is running on port ${port}`, 'Bootstrap');
  logger.log(`Swagger documentation available at http://localhost:${port}/api/docs`, 'Bootstrap');
}
bootstrap();
