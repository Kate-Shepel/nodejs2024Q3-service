import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    const favorites = await this.getAllFavorites();

    if (!id) {
      throw new BadRequestException(`Invalid UUID for ${type}`);
    }

    let entityExists;

    switch (type) {
      case 'artists':
        entityExists = await this.artistService.getById(id);
        if (!entityExists) {
          throw new UnprocessableEntityException(`Artist with id ${id} does not exist`);
        }
        favorites.artists.push(entityExists);
        break;

      case 'albums':
        entityExists = await this.albumService.getById(id);
        if (!entityExists) {
          throw new UnprocessableEntityException(`Album with id ${id} does not exist`);
        }
        favorites.albums.push(entityExists);
        break;

      case 'tracks':
        entityExists = await this.trackService.getById(id);
        if (!entityExists) {
          throw new UnprocessableEntityException(`Track with id ${id} does not exist`);
        }
        favorites.tracks.push(entityExists);
        break;
    }

    await this.favoritesRepository.save(favorites);
  }

  async removeFavorite(type: 'artists' | 'albums' | 'tracks', id: string) {
    const favorites = await this.getAllFavorites();

    if (!id) {
      throw new BadRequestException(`Invalid UUID for ${type}`);
    }

    switch (type) {
      case 'artists':
        favorites.artists = favorites.artists.filter((artist) => artist.id !== id);
        break;

      case 'albums':
        favorites.albums = favorites.albums.filter((album) => album.id !== id);
        break;

      case 'tracks':
        favorites.tracks = favorites.tracks.filter((track) => track.id !== id);
        break;
    }

    await this.favoritesRepository.save(favorites);
  }
}
