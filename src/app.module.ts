import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { envValidation } from './config/env.validation'
import { ReviewReplyModule } from './modules/review-reply/review-reply.module'
import { AiModule } from './modules/ai/ai.module'
import { HealthModule } from './modules/health/health.module'
import { DatabaseModule } from './database/database.module'
import { UserClientModule } from './modules/user-client/user-client.module'
import { MyAppsModule } from './modules/my-apps/my-apps.module'
import { AppsCatalogModule } from './modules/apps-catalog/apps-catalog.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: envValidation
    }),
    DatabaseModule,
    AppsCatalogModule,
    AiModule,
    ReviewReplyModule,
    HealthModule,
    UserClientModule,
    MyAppsModule
  ]
})
export class AppModule {}
