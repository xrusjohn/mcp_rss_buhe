import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Feed } from './Feed';

export enum ArticleStatus {
  UNREAD = 'unread',
  READ = 'read',
  FAVORITE = 'favorite'
}

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @Column()
  link!: string;

  @Column()
  pubDate!: string;

  @Column()
  fetchDate!: string;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.UNREAD
  })
  status!: ArticleStatus;

  @ManyToOne(() => Feed, feed => feed.articles)
  feed!: Feed;
}