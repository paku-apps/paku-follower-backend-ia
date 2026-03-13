import { Module } from '@nestjs/common'
import { ReviewReplyService } from './review-reply.service'
import { ReviewReplyController } from './review-reply.controller'
import { AiModule } from '../ai/ai.module'

@Module({
  imports: [AiModule],
  controllers: [ReviewReplyController],
  providers: [ReviewReplyService]
})
export class ReviewReplyModule {}
