import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  // Create a new user with hashed password
  async create(email: string, password: string, fullName?: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ email, passwordHash: hash, fullName });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  // Return all users (used to populate recipients list)
  async findAll() {
    return this.usersRepo.find({ select: ['id','email','fullName'] });
  }

  // Change password after verifying existing password
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.findById(userId);
    if (!user) throw new Error('User not found');
    const ok = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!ok) throw new Error('Old password is incorrect');
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    return this.usersRepo.save(user);
  }
}