import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
  @ApiProperty({ example: '8e7c1f5d-21a2-4d1b-b4cd-8c89f9671c2a' })
  id!: string;

  @ApiProperty({ example: 'demo@mini.media' })
  email!: string;

  @ApiProperty({ example: 'Demo User', nullable: true })
  name!: string | null;

  @ApiProperty({ example: 'FAYL', nullable: true })
  surname!: string | null;

  @ApiProperty({
    example: '1999-12-31T00:00:00.000Z',
    nullable: true,
    description: 'Birth date in ISO-8601 (DateTime)',
  })
  birthDate!: Date | null;

  @ApiProperty({
    example: '2026-04-10T14:07:32.123Z',
    description: 'Account creation date (ISO-8601 DateTime)',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-04-10T14:07:32.123Z',
    description: 'Last login date (ISO-8601 DateTime)',
  })
  lastLoginAt!: Date;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'ZGVtb0BtaW5pLm1lZGlhOjE3MTI3NTc4MDAwMDA=' })
  accessToken!: string;

  @ApiProperty({ example: 'Bearer' })
  tokenType!: 'Bearer';

  @ApiProperty({ type: PublicUserDto })
  user!: PublicUserDto;
}

export class SignUpResponseDto {
  @ApiProperty({ type: PublicUserDto })
  user!: PublicUserDto;
}
