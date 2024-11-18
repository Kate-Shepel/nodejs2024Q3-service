import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/models/user.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistEntity } from './artist/models/artist.entity';
import { AlbumEntity } from './album/models/album.entity';
import { TrackEntity } from './track/models/track.entity';
import { FavoritesEntity } from './favorites/models/favorites.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, ArtistEntity, AlbumEntity, TrackEntity, FavoritesEntity],
      synchronize: true, // для разработки, в продакшене выключить
    }),
    UserModule,
    FavoritesModule,
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
