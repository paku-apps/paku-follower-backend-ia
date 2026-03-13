import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { HealthService } from './health.service'

@ApiTags('health')
@Controller({ path: 'v1/health' })
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get('live')
  @ApiOperation({ summary: 'Liveness check' })
  @ApiResponse({ status: 200, description: 'Servicio vivo' })
  live() {
    return this.service.live()
  }

  @Get('ready')
  @ApiOperation({ summary: 'Readiness check contra Ollama y modelo' })
  @ApiResponse({ status: 200, description: 'Servicio listo' })
  @ApiResponse({ status: 503, description: 'Dependencias no disponibles' })
  ready() {
    return this.service.ready()
  }
}
