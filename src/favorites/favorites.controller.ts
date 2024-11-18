import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    await this.favoritesService.addFavorite('tracks', id);
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    await this.favoritesService.addFavorite('artists', id);
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    await this.favoritesService.addFavorite('albums', id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrackFromFavorites(@Param('id') id: string) {
    await this.favoritesService.removeFavorite('tracks', id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtistFromFavorites(@Param('id') id: string) {
    await this.favoritesService.removeFavorite('artists', id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbumFromFavorites(@Param('id') id: string) {
    await this.favoritesService.removeFavorite('albums', id);
  }
}
