import { Module } from '@nestjs/common'
import { AppsCatalogService } from './apps-catalog.service'

@Module({
  providers: [AppsCatalogService],
  exports: [AppsCatalogService]
})
export class AppsCatalogModule {}
