import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'name@example.com',
    description: 'Email required for both `/auth/signup` and `/auth/signin`.',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12345678',
    description:
      'Password required for both `/auth/signup` and `/auth/signin`.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
