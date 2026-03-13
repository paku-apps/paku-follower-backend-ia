import { GenerateParams, GenerateResult } from './ai.types'

export interface AiProvider {
  generate(params: GenerateParams): Promise<GenerateResult>
}

export const AI_PROVIDER = 'AI_PROVIDER'
