import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;
}
