import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class AddMyAppDto {
  @ApiProperty({ description: 'UUID de la App externa' })
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  appId!: string
}
