import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Habilitando validacion con Class Vailadtor
  app.useGlobalPipes(new ValidationPipe());

  //habilitando (DOCS API) con Swagger
  const config = new DocumentBuilder()
    .setTitle('Proyecto Backen Inventario')
    .setDescription('Este proyecto es el backend de un sistema de inventarios')
    .setVersion('1.0')
    .addTag('Backend Nest')
    //agregamos config para autenticacion:
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
