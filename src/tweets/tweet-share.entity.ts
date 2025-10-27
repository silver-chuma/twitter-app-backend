import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Tweet } from './tweet.entity';
import { User } from '../users/user.entity';

@Entity()
export class TweetShare {
  @PrimaryColumn()
  tweetId: string;

  @PrimaryColumn()
  recipientId: string;

  @ManyToOne(() => Tweet, (t) => t.shares, { onDelete: 'CASCADE' })
  tweet: Tweet;

  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  recipient: User;

  @CreateDateColumn()
  sharedAt: Date;
}