import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ReviewReplyService } from './review-reply.service'
import { CreateReplyDto } from './dto/create-reply.dto'

@ApiTags('review-replies')
@Controller({ path: 'v1/review-replies' })
export class ReviewReplyController {
  constructor(private readonly service: ReviewReplyService) {}

  @Post()
  @ApiOperation({ summary: 'Generar respuesta a un review con IA (Ollama)' })
  @ApiBody({ type: CreateReplyDto })
  @ApiResponse({
    status: 200,
    description: 'Respuesta generada correctamente'
  })
  create(@Body() dto: CreateReplyDto) {
    return this.service.createReply(dto)
  }
}
