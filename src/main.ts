import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  const config = new DocumentBuilder()
    .setTitle('Review Reply AI')
    .setDescription('API para generar respuestas a reviews con IA (Ollama)')
    .setVersion('1.0')
    .addTag('review-replies')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  const port = process.env.PORT ? Number(process.env.PORT) : 3000
  await app.listen(port)
}

bootstrap()
