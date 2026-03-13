import { Module, Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AI_PROVIDER, AiProvider } from '@core/ai/ai-provider.interface'
import { OllamaProvider } from './providers/ollama.provider'

const aiProviderFactory: Provider = {
  provide: AI_PROVIDER,
  inject: [ConfigService],
  useFactory: (config: ConfigService): AiProvider => {
    const provider = config.get<string>('ai.provider')
    if (provider === 'ollama') {
      const host = config.get<string>('ai.ollama.host')!
      const model = config.get<string>('ai.ollama.model')!
      return new OllamaProvider(host, model)
    }
    throw new Error('AI provider no soportado')
  }
}

@Module({
  providers: [aiProviderFactory],
  exports: [AI_PROVIDER]
})
export class AiModule {}
