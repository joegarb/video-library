import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('videos')
export class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  thumbnail_url: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('int')
  duration: number;

  @Column('int')
  views: number;

  @Column('simple-array')
  tags: string[];
}
