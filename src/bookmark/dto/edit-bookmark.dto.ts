import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkDto {
  @ApiProperty({
    example: 'Bookmark #1',
    description: 'Title can be provided for updation.',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    example: 'In this bookmark, ....',
    description: 'Description can be provided for updation.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://guthib.com/',
    description: 'Link can be provided for updation.',
  })
  @IsString()
  @IsOptional()
  link: string;
}
