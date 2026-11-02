import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class AppsCatalogService {
  private readonly baseUrl: string
  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.config.get<string>('appsCatalog.baseUrl')!
  }

  async getAppById(id: string) {
    try {
      const res = await axios.get(`${this.baseUrl}/apps/${id}`, { timeout: 5000 })
      return res.data
    } catch (e: any) {
      throw new ServiceUnavailableException('Apps catalog no disponible: ' + (e?.message ?? 'error'))
    }
  }
}
