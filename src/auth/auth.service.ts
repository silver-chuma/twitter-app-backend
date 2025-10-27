import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  // Validate user credentials
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return null;
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new BadRequestException('Invalid credentials');
    const payload = { email: user.email, userId: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async register(email: string, password: string, fullName?: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new BadRequestException('Email already in use');
    const user = await this.usersService.create(email, password, fullName);
    return { id: user.id, email: user.email, fullName: user.fullName };
  }
}