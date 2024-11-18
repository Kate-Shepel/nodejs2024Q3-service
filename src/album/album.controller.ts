import {
  Controller,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate as isUuid } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return await this.albumService.getAll();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const foundAlbum = await this.albumService.getById(id);

    if (!foundAlbum) {
      throw new NotFoundException(`Album with id ${id} wasn't found`);
    }
    return foundAlbum;
  }

  @Post()
  async createAlbum(@Body() albumCreateData: CreateAlbumDto) {
    return await this.albumService.create(albumCreateData);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() albumUpdateData: UpdateAlbumDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const amendedAlbum = await this.albumService.update(id, albumUpdateData);

    if (!amendedAlbum) {
      throw new NotFoundException(`Album with id ${id} wasn't found`);
    }

    return amendedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const album = await this.albumService.getById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} wasn't found`);
    }

    await this.albumService.delete(id);
  }
}
