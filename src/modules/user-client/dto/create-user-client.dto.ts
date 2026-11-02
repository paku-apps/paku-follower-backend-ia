import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserClientDto {
  @ApiProperty()
  @IsString()
  @MaxLength(160)
  name!: string

  @ApiProperty()
  @IsEmail()
  @MaxLength(180)
  email!: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string

}
