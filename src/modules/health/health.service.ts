import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class HealthService {
  constructor(private readonly config: ConfigService) {}

  async live() {
    return { status: 'ok' }
  }

  async ready() {
    const host = this.config.get<string>('ai.ollama.host')!
    const model = this.config.get<string>('ai.ollama.model')!
    try {
      const versionRes = await axios.get(`${host}/api/version`)
      const tagsRes = await axios.get(`${host}/api/tags`)
      const models: Array<{ name: string }> = tagsRes.data?.models ?? []
      const exists = models.some(m => m.name === model)
      if (!exists) {
        throw new ServiceUnavailableException(`Modelo no disponible: ${model}`)
      }
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        ollama: {
          host,
          version: versionRes.data?.version ?? null
        },
        model: {
          name: model,
          exists
        }
      }
    } catch (e: any) {
      const detail = e?.response?.data?.error ?? e?.message ?? 'error'
      throw new ServiceUnavailableException(`Ollama no disponible: ${detail}`)
    }
  }
}
