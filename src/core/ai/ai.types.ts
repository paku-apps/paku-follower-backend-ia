export type AiProviderName = 'ollama'

export type GenerateParams = {
  prompt: string
  temperature?: number
  maxTokens?: number
}

export type GenerateResult = {
  text: string
  usage?: {
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
  }
}
