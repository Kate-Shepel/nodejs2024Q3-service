import {
  Controller,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const track = this.trackService.getById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} wasn't found`);
    }

    return track;
  }

  @Post()
  createTrack(@Body() trackCreationData: CreateTrackDto) {
    return this.trackService.create(trackCreationData);
  }

  @Put(':id')
  updateTrack(
    @Param('id') id: string,
    @Body() trackUpdateData: UpdateTrackDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const amendedTrack = this.trackService.update(id, trackUpdateData);

    if (!amendedTrack) {
      throw new NotFoundException(`Track with id ${id} wasn't found`);
    }

    return amendedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const trackToDelete = this.trackService.getById(id);

    if (!trackToDelete) {
      throw new NotFoundException(`Track with id ${id} wasn't found`);
    }

    this.trackService.delete(id);
  }
}
