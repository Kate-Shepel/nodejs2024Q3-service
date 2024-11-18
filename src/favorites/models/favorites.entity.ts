import { Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { TrackEntity } from 'src/track/models/track.entity';
import { AlbumEntity } from 'src/album/models/album.entity';
import { ArtistEntity } from 'src/artist/models/artist.entity';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, { eager: true })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { eager: true })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { eager: true })
  @JoinTable()
  tracks: TrackEntity[];
}
