import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserClientDto } from './dto/create-user-client.dto'
import { UserClientService } from './user-client.service'
import { SearchUserClientDto } from './dto/search-user-client.dto'

@ApiTags('user-clients')
@Controller({ path: 'v1/user-clients' })
export class UserClientController {
  constructor(private readonly service: UserClientService) {}

  @Post()
  @ApiOperation({ summary: 'Crear usuario cliente' })
  @ApiBody({ type: CreateUserClientDto })
  @ApiResponse({ status: 201, description: 'Creado' })
  create(@Body() dto: CreateUserClientDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuarios cliente' })
  list() {
    return this.service.findAll()
  }

  @Post('search')
  @ApiOperation({ summary: 'Buscar por correo y contraseña' })
  @ApiBody({ type: SearchUserClientDto })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  search(@Body() dto: SearchUserClientDto) {
    return this.service.findByCredentials(dto.email, dto.password)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por id' })
  @ApiParam({ name: 'id', required: true })
  getById(@Param('id') id: string) {
    return this.service.getById(id)
  }
}
