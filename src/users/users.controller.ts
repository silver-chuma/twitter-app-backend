import { Controller, Get, Body, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Public: list users (id/email/fullName) so the frontend can select recipients
  @Get()
  async listUsers() {
    return this.usersService.findAll();
  }

  // Protected: change password
  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(@Request() req, @Body() body: { oldPassword: string, newPassword: string }) {
    const userId = req.user.userId;
    await this.usersService.changePassword(userId, body.oldPassword, body.newPassword);
    return { ok: true, message: 'Password changed' };
  }
}