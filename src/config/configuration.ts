export default () => ({
  app: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000
  },
  ai: {
    provider: process.env.AI_PROVIDER || 'ollama',
    ollama: {
      host: process.env.OLLAMA_HOST || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL || 'llama3:latest'
    }
  }
})
