import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Tweet } from '../tweets/tweet.entity';

// User entity stores basic user info and hashed password.
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  fullName: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Tweet, (tweet) => tweet.author)
  tweets: Tweet[];
}