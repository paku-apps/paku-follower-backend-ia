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
