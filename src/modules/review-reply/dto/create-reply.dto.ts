import { IsDefined, IsIn, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class AppContextDto {
  @ApiProperty()
  @IsString()
  appName!: string

  @ApiProperty({ minimum: 0, maximum: 5, type: Number })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating!: number

  @ApiProperty()
  @IsString()
  description!: string

  @ApiProperty()
  @IsString()
  category!: string

  @ApiProperty()
  @IsString()
  ageRating!: string
}

export class CreateReplyDto {
  @ApiProperty()
  @IsString()
  reviewText!: string

  @ApiProperty({ type: () => AppContextDto })
  @IsDefined()
  @ValidateNested()
  @Type(() => AppContextDto)
  app!: AppContextDto

  @ApiPropertyOptional({ description: 'Idioma de respuesta', default: 'es' })
  @IsOptional()
  @IsString()
  language?: string

  @ApiPropertyOptional({ enum: ['neutral', 'friendly', 'formal'] })
  @IsOptional()
  @IsIn(['neutral', 'friendly', 'formal'])
  tone?: 'neutral' | 'friendly' | 'formal'
}
