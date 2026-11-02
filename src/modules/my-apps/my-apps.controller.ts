import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MyAppsService } from './my-apps.service'
import { AddMyAppDto } from './dto/add-my-app.dto'

@ApiTags('my-apps')
@Controller({ path: 'v1/user-clients/:userId/my-apps' })
export class MyAppsController {
  constructor(private readonly service: MyAppsService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar app a Mis Apps' })
  @ApiParam({ name: 'userId', required: true })
  @ApiBody({ type: AddMyAppDto })
  @ApiResponse({ status: 201, description: 'Agregado' })
  add(@Param('userId') userId: string, @Body() dto: AddMyAppDto) {
    return this.service.add(userId, dto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar Mis Apps del usuario' })
  @ApiParam({ name: 'userId', required: true })
  list(@Param('userId') userId: string) {
    return this.service.list(userId)
  }

  @Delete(':appId')
  @ApiOperation({ summary: 'Eliminar de Mis Apps' })
  @ApiParam({ name: 'userId', required: true })
  @ApiParam({ name: 'appId', required: true })
  remove(@Param('userId') userId: string, @Param('appId') appId: string) {
    return this.service.remove(userId, appId)
  }
}
