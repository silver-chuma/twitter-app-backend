import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { Tweet } from './tweet.entity';
import { TweetShare } from './tweet-share.entity';
import { User } from '../users/user.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, TweetShare, User]), EmailModule],
  providers: [TweetsService],
  controllers: [TweetsController],
})
export class TweetsModule {}