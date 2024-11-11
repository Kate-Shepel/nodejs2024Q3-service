import {
  Controller,
  Get,
  Post,
  Delete,
  Param
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    this.favoritesService.addFavorite('tracks', id);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    this.favoritesService.addFavorite('artists', id);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    this.favoritesService.addFavorite('albums', id);
  }

  @Delete('track/:id')
  removeTrackFromFavorites(@Param('id') id: string) {
    this.favoritesService.removeFavorite('tracks', id);
  }

  @Delete('artist/:id')
  removeArtistFromFavorites(@Param('id') id: string) {
    this.favoritesService.removeFavorite('artists', id);
  }

  @Delete('album/:id')
  removeAlbumFromFavorites(@Param('id') id: string) {
    this.favoritesService.removeFavorite('albums', id);
  }

}
