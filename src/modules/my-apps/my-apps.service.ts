import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Favorite } from '@database/entities/my_apps.entity'
import { AddMyAppDto } from './dto/add-my-app.dto'
import { AppsCatalogService } from '../apps-catalog/apps-catalog.service'

@Injectable()
export class MyAppsService {
  constructor(
    @InjectRepository(Favorite) private readonly repo: Repository<Favorite>,
    private readonly appsCatalog: AppsCatalogService
  ) {}

  async add(userId: string, dto: AddMyAppDto) {
    const created = this.repo.create({ userId, appId: dto.appId })
    const saved = await this.repo.save(created)
    const app = await this.appsCatalog.getAppById(dto.appId)
    return { id: saved.id, app, createdAt: saved.createdAt }
  }

  async list(userId: string) {
    const favs = await this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } })
    const items = await Promise.all(
      favs.map(async (f) => {
        const app = await this.appsCatalog.getAppById(f.appId)
        return { id: f.id, app, createdAt: f.createdAt }
      })
    )
    return items
  }

  async remove(userId: string, appId: string) {
    const fav = await this.repo.findOne({ where: { userId, appId } })
    if (!fav) throw new NotFoundException('Registro no encontrado')
    await this.repo.remove(fav)
    return { ok: true }
  }
}
