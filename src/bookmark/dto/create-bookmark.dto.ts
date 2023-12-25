import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({
    example: 'Bookmark #1',
    description: 'Title is required for creating bookmark.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'In this bookmark, ...',
    description: 'Description is required for creating bookmark.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://guthib.com/',
    description: 'Link is required for creating bookmark.',
  })
  @IsString()
  @IsNotEmpty()
  link: string;
}
