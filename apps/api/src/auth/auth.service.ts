import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { configService } from '../config.service';

export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
}

interface ValidatedUser {
  id: string;
  username: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ValidatedUser | null> {
    const adminUsername = configService.getAdminUsername();
    const adminPasswordHash = configService.getAdminPasswordHash();

    if (username === adminUsername) {
      const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
      if (isPasswordValid) {
        return { id: 'admin', username: adminUsername, role: 'admin' };
      }
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  validateToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
