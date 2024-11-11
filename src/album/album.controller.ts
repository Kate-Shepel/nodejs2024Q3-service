import { 
  Controller,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
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
  getAllAlbums() {
    return this.albumService.getAll();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const foundAlbum = this.albumService.getById(id);

    if (!foundAlbum) {
      throw new NotFoundException(`Album with id ${id} wasn't found`);
    }
    return foundAlbum;
  }

  @Post()
  createAlbum(@Body() albumCreateData: CreateAlbumDto) {
    return this.albumService.create(albumCreateData);
  }

  @Put(':id')
  updateAlbum(
    @Param('id') id: string,
    @Body() albumUpdateData: UpdateAlbumDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const amendedAlbum = this.albumService.update(id, albumUpdateData);

    if (!amendedAlbum) {
      throw new NotFoundException(`Album with id ${id} wasn't found`);
    }
    return amendedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const album = this.albumService.getById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} wasn't found`);
    }

    this.albumService.delete(id);
  }
}
