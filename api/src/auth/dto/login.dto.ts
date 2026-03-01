import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'demo@mini.media' })
  email?: string;

  @ApiProperty({ example: 'password123' })
  password?: string;
}
