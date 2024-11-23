import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { FavoritesEntity } from './models/favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
