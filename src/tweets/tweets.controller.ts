import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() body: { content: string, recipients: string[] }) {
    const authorId = req.user.userId;
    return this.tweetsService.createTweet(authorId, body.content, body.recipients);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  async myTweets(@Request() req) {
    return this.tweetsService.getMyTweets(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('shared')
  async sharedWithMe(@Request() req) {
    return this.tweetsService.getSharedWithMe(req.user.userId);
  }
}