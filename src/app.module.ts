import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TweetsModule } from './tweets/tweets.module';
import { EmailModule } from './email/email.module';
import { User } from './users/user.entity';
import { Tweet } from './tweets/tweet.entity';
import { TweetShare } from './tweets/tweet-share.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) || 'sqlite',
      database: process.env.DB_NAME || 'database.sqlite',
      entities: [User, Tweet, TweetShare],
      synchronize: true,
    }),
    
    UserModule,
    AuthModule,
    TweetsModule,
    EmailModule,
  ],
})
export class AppModule {}
