import { plainToInstance } from 'class-transformer'
import { IsIn, IsOptional, IsString, validateSync } from 'class-validator'

class EnvVars {
  @IsOptional()
  @IsString()
  PORT?: string

  @IsOptional()
  @IsIn(['ollama'])
  AI_PROVIDER?: string

  @IsOptional()
  @IsString()
  OLLAMA_HOST?: string

  @IsOptional()
  @IsString()
  OLLAMA_MODEL?: string

  @IsOptional()
  @IsString()
  DB_TYPE?: string

  @IsOptional()
  @IsString()
  DB_HOST?: string

  @IsOptional()
  @IsString()
  DB_PORT?: string

  @IsOptional()
  @IsString()
  DB_USER?: string

  @IsOptional()
  @IsString()
  DB_PASS?: string

  @IsOptional()
  @IsString()
  DB_NAME?: string

  @IsOptional()
  @IsString()
  TYPEORM_SYNC?: string

  @IsOptional()
  @IsString()
  PASSWORD_SALT_ROUNDS?: string

  @IsOptional()
  @IsString()
  APPS_API_BASE_URL?: string
}

export function envValidation(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvVars, config, {
    enableImplicitConversion: true
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })
  if (errors.length) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
