import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';

import { Favorites } from './models/favorites.model';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  getAllFavorites() {
    return {
      artists: this.favorites.artists
        .map((id) => this.artistService.getById(id))
        .filter((artist) => artist !== null),
      albums: this.favorites.albums
        .map((id) => this.albumService.getById(id))
        .filter((album) => album !== null),
      tracks: this.favorites.tracks
        .map((id) => this.trackService.getById(id))
        .filter((track) => track !== null),
    };
  }

  addFavorite(type: 'artists' | 'albums' | 'tracks', id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException(`Invalid UUID for ${type}`);
    }

    let favExists;
    switch (type) {
      case 'artists':
        favExists = this.artistService.getById(id);
        break;
      case 'albums':
        favExists = this.albumService.getById(id);
        break;
      case 'tracks':
        favExists = this.trackService.getById(id);
        break;
    }

    if (!favExists) {
      throw new UnprocessableEntityException(
        `${type.slice(0, -1)} with id ${id} does not exist`,
      );
    }

    if (!this.favorites[type].includes(id)) {
      this.favorites[type].push(id);
    }
  }

  removeFavorite(type: 'artists' | 'albums' | 'tracks', id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException(`Invalid UUID for ${type}`);
    }

    const index = this.favorites[type].indexOf(id);

    if (index === -1) {
      throw new NotFoundException(
        `${type.slice(0, -1)} with id ${id} is not in favorites`,
      );
    }

    this.favorites[type].splice(index, 1);
  }
}
