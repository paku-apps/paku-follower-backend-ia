import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserClient } from '@database/entities/user-client.entity'
import { CreateUserClientDto } from './dto/create-user-client.dto'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserClientService {
  constructor(
    @InjectRepository(UserClient) private readonly repo: Repository<UserClient>,
    private readonly config: ConfigService
  ) {}

  async create(dto: CreateUserClientDto) {
    const exists = await this.repo.findOne({ where: { email: dto.email } })
    if (exists) throw new ConflictException('Email ya registrado')
    const saltRounds = this.config.get<number>('security.saltRounds') || 10
    const passwordHash = await bcrypt.hash(dto.password, saltRounds)
    const entity = this.repo.create({
      name: dto.name,
      email: dto.email,
      passwordHash
    })
    const saved = await this.repo.save(entity)
    return {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt
    }
  }

  async findAll() {
    return await this.repo.find({ order: { createdAt: 'DESC' } })
  }

  async findByCredentials(email: string, password: string) {
    const user = await this.repo.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'passwordHash', 'createdAt', 'updatedAt']
    })
    if (!user) throw new NotFoundException('Usuario no encontrado')
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw new NotFoundException('Usuario no encontrado')
    const { passwordHash, ...safe } = user as any
    return safe
  }

  async getById(id: string) {
    const user = await this.repo.findOne({ where: { id } })
    if (!user) throw new NotFoundException('Usuario no encontrado')
    return user
  }
}
