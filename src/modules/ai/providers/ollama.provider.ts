import axios from 'axios'
import { AiProvider } from '@core/ai/ai-provider.interface'
import { GenerateParams, GenerateResult } from '@core/ai/ai.types'

export class OllamaProvider implements AiProvider {
  constructor(private readonly host: string, private readonly model: string) {}

  async generate(params: GenerateParams): Promise<GenerateResult> {
    const url = `${this.host}/api/generate`
    try {
      const response = await axios.post(url, {
        model: this.model,
        prompt: params.prompt,
        stream: false,
        options: {
          temperature: params.temperature ?? 0.7
        }
      })
      const data = response.data
      return {
        text: data.response ?? data.text ?? ''
      }
    } catch (err: any) {
      const status = err?.response?.status
      const detail = err?.response?.data?.error ?? err?.message ?? 'error'
      if (status === 404) {
        throw new Error(`modelo no encontrado (${this.model}): ${detail}`)
      }
      throw new Error(detail)
    }
  }
}
