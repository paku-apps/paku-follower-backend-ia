import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { envValidation } from './config/env.validation'
import { ReviewReplyModule } from './modules/review-reply/review-reply.module'
import { AiModule } from './modules/ai/ai.module'
import { HealthModule } from './modules/health/health.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: envValidation
    }),
    AiModule,
    ReviewReplyModule,
    HealthModule
  ]
})
export class AppModule {}
