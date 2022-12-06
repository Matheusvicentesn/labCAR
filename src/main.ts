import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('labCar')
    .setDescription('labCar - Solicitation Trips')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Pipe Validations
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  const PORT = process.env.PORT || 3030
  await app.listen(PORT);
  console.log(`app runing on ${PORT}. Open http://localhost:${PORT} to see results`)
  
}
bootstrap();
