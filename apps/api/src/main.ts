import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logging/logger.service';
import { SanitizePipe } from './common/pipes/sanitize.pipe';
import { configService } from './config.service';

async function bootstrap() {
  const logger = new CustomLoggerService();

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // Security: Helmet middleware for HTTP headers protection
  app.use(
    helmet({
      contentSecurityPolicy: configService.isProduction() ? undefined : false,
    }),
  );

  // Global pipes: Sanitization (XSS protection) + Validation
  app.useGlobalPipes(
    new SanitizePipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS configuration from environment
  app.enableCors({
    origin: configService.getCorsOrigins(),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Swagger configuration with Bearer auth
  const config = new DocumentBuilder()
    .setTitle('Employee Management API')
    .setDescription('API for managing employees and organizational structure')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'User authentication endpoints')
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
  logger.log(
    `Swagger documentation available at http://localhost:${port}/api/docs`,
    'Bootstrap',
  );
}
void bootstrap();
