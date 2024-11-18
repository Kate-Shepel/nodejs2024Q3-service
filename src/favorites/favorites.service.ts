import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUuid } from 'uuid';

import { FavoritesEntity } from './models/favorites.entity';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  async getAllFavorites(): Promise<FavoritesEntity> {
    let favs = await this.favoritesRepository.findOne({
      where: {},
    });

    if (!favs) {
      favs = this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.favoritesRepository.save(favs);
    }

    return favs;
  }

  async addFavorite(type: 'artists' | 'albums' | 'tracks', id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException(`Invalid UUID for ${type}`);
    }

    const favs = await this.getAllFavorites();

    let entityExists;

    switch (type) {
      case 'artists':
        entityExists = await this.artistService.getById(id);
        if (!entityExists) {
          throw new UnprocessableEntityException(`Artist with id ${id} does not exist`);
        }
        favs.artists.push(entityExists);
        break;

      case 'albums':
        entityExists = await this.albumService.getById(id);
        if (!entityExists) {
          throw new UnprocessableEntityException(`Album with id ${id} does not exist`);
        }
        favs.albums.push(entityExists);
        break;

      case 'tracks':
        entityExists = await this.trackService.getById(id);
        if (!entityExists) {
          throw new UnprocessableEntityException(`Track with id ${id} does not exist`);
        }
        favs.tracks.push(entityExists);
        break;
    }

    await this.favoritesRepository.save(favs);
  }

  async removeFavorite(type: 'artists' | 'albums' | 'tracks', id: string) {
    const favs = await this.getAllFavorites();

    if (!isUuid(id)) {
      throw new BadRequestException(`Invalid UUID for ${type}`);
    }

    switch (type) {
      case 'artists':
        favs.artists = favs.artists.filter((artist) => artist.id !== id);
        break;

      case 'albums':
        favs.albums = favs.albums.filter((album) => album.id !== id);
        break;

      case 'tracks':
        favs.tracks = favs.tracks.filter((track) => track.id !== id);
        break;

        default:
          throw new BadRequestException(`Unknown type ${type}`);
    }

    await this.favoritesRepository.save(favs);
  }
}
