import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Favorite } from '@database/entities/my_apps.entity'
import { MyAppsService } from './my-apps.service'
import { MyAppsController } from './my-apps.controller'
import { AppsCatalogModule } from '../apps-catalog/apps-catalog.module'

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), AppsCatalogModule],
  controllers: [MyAppsController],
  providers: [MyAppsService]
})
export class MyAppsModule {}
