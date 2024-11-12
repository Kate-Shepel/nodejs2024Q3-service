import {
  Controller,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistService.getAll();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const artist = this.artistService.getById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} wasn't found`);
    }

    return artist;
  }

  @Post()
  createArtist(@Body() artistCreateData: CreateArtistDto) {
    return this.artistService.create(artistCreateData);
  }

  @Put(':id')
  updateArtist(
    @Param('id') id: string,
    @Body() artistUpdateData: UpdateArtistDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const amendedArtist = this.artistService.update(id, artistUpdateData);

    if (!amendedArtist) {
      throw new NotFoundException(`Artist with id ${id} wasn't found`);
    }

    return amendedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const artistToDelete = this.artistService.getById(id);

    if (!artistToDelete) {
      throw new NotFoundException(`Artist with id ${id} wasn't found`);
    }

    this.artistService.delete(id);
  }
}
