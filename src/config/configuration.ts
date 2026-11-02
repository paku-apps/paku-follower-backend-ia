export default () => ({
  app: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000
  },
  database: {
    type: (process.env.DB_TYPE || 'mysql') as 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    name: process.env.DB_NAME || 'paku_follow_ia_bd',
    synchronize: process.env.TYPEORM_SYNC ? process.env.TYPEORM_SYNC === 'true' : true
  },
  security: {
    saltRounds: process.env.PASSWORD_SALT_ROUNDS ? Number(process.env.PASSWORD_SALT_ROUNDS) : 10
  },
  appsCatalog: {
    baseUrl: process.env.APPS_API_BASE_URL || 'http://localhost:3333'
  },
  ai: {
    provider: process.env.AI_PROVIDER || 'ollama',
    ollama: {
      host: process.env.OLLAMA_HOST || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL || 'llama3:latest'
    }
  }
})
