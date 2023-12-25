import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsSemVer, IsString } from 'class-validator';

export class EditUserDto {
  @ApiProperty({
    example: 'name@example.com',
    description: 'Email can be edited',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'John',
    description: 'Firstname can be edited',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Lastname can be edited',
  })
  @IsString()
  @IsOptional()
  lastName?: string;
}
