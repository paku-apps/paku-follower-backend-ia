import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common'
import { AI_PROVIDER, AiProvider } from '@core/ai/ai-provider.interface'
import { CreateReplyDto } from './dto/create-reply.dto'

@Injectable()
export class ReviewReplyService {
  constructor(@Inject(AI_PROVIDER) private readonly ai: AiProvider) {}

  async createReply(input: CreateReplyDto) {
    const tone = input.tone ?? 'neutral'
    const lang = input.language ?? 'es'
    const prompt = this.buildPrompt(input, tone, lang)
    let result
    try {
      result = await this.ai.generate({
        prompt,
        temperature: tone === 'formal' ? 0.6 : 0.8
      })
    } catch (e: any) {
      const detail = e?.response?.data?.error ?? e?.message ?? 'error'
      throw new ServiceUnavailableException('AI provider no disponible: ' + detail)
    }
    return {
      reply: result.text.trim()
    }
  }

  private buildPrompt(input: CreateReplyDto, tone: string, lang: string) {
    const a = input.app
    const style =
      tone === 'friendly'
        ? 'un tono cercano y empático'
        : tone === 'formal'
        ? 'un tono profesional y conciso'
        : 'un tono neutral y respetuoso'
    return [
      `Eres un asistente experto en atención al cliente de aplicaciones.`,
      `Genera una respuesta breve y clara al siguiente review.`,
      `Responde en ${lang} con ${style}.`,
      `Contexto de la app:`,
      `Nombre: ${a.appName}`,
      `Rating promedio: ${a.rating}/5`,
      `Descripción: ${a.description}`,
      `Categoría: ${a.category}`,
      `Clasificación por edades: ${a.ageRating}`,
      `Review del usuario:`,
      `"${input.reviewText}"`,
      `Incluye agradecimiento, aborda el punto principal, ofrece ayuda, evita promesas.`,
      `No inventes información y mantén máximo 120 palabras.`
    ].join('\n')
  }
}
