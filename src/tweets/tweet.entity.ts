import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { TweetShare } from './tweet-share.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.tweets, { eager: true })
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TweetShare, (ts) => ts.tweet)
  shares: TweetShare[];
}