import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserClient } from '@database/entities/user-client.entity'
import { UserClientService } from './user-client.service'
import { UserClientController } from './user-client.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserClient])],
  controllers: [UserClientController],
  providers: [UserClientService],
  exports: [UserClientService]
})
export class UserClientModule {}
