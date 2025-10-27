import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { TweetShare } from './tweet-share.entity';
import { User } from '../users/user.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet) private tweetRepo: Repository<Tweet>,
    @InjectRepository(TweetShare) private tweetShareRepo: Repository<TweetShare>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private emailService: EmailService,
  ) {}

  // Create a tweet and create shares for each recipient
  async createTweet(authorId: string, content: string, recipientIds: string[]) {
    const author = await this.userRepo.findOne({ where: { id: authorId } });
    const tweet = this.tweetRepo.create({ content, author });
    const saved = await this.tweetRepo.save(tweet);

    for (const rid of recipientIds || []) {
      const recipient = await this.userRepo.findOne({ where: { id: rid } });
      if (!recipient) continue;
      const share = this.tweetShareRepo.create({ tweetId: saved.id, recipientId: recipient.id, tweet: saved, recipient });
      await this.tweetShareRepo.save(share);
      // Call email stub
      await this.emailService.sendEmail(recipient.email, 'A tweet was shared with you', `${author.fullName || author.email} shared: ${content}`);
    }

    return saved;
  }

  // Get tweets authored by a user
  async getMyTweets(userId: string) {
    return this.tweetRepo.find({ where: { author: { id: userId } }, order: { createdAt: 'DESC' } });
  }

  // Get tweets shared with the user
  async getSharedWithMe(userId: string) {
  return this.tweetShareRepo.find({
    where: { recipientId: userId },
    relations: ['tweet', 'tweet.author', 'recipient'], // add tweet.author
    order: { sharedAt: 'DESC' },
  });
}
}