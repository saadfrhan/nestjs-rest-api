import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { hash } from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const _hash = await hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: _hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const pwMatches = await verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Incorrect credentials');
    }

    return this.signToken(user.id, user.email);
  }

  signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt
      .signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
      })
      .then((token) => {
        return {
          access_token: token,
        };
      });
  }
}
