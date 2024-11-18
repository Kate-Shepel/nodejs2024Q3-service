import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrackEntity } from './models/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async getById(id: string): Promise<TrackEntity | null> {
    return await this.trackRepository.findOneBy({ id });
  }

  async create(trackCreationData: CreateTrackDto): Promise<TrackEntity> {
    const freshTrack = this.trackRepository.create(trackCreationData);
    return await this.trackRepository.save(freshTrack);
  }

  async update(
    id: string,
    trackUpdateData: UpdateTrackDto,
  ): Promise<TrackEntity | null> {
    const existingTrack = await this.getById(id);

    if (!existingTrack) {
      return null;
    }

    const amendedTrack = this.trackRepository.merge(
      existingTrack,
      trackUpdateData,
    );

    return await this.trackRepository.save(amendedTrack);
  }

  async delete(id: string): Promise<void> {
    await this.trackRepository.delete({ id });
  }

  async clearArtistId(artistId: string): Promise<void> {
    await this.trackRepository.update({ artistId }, { artistId: null });
  }

  async clearAlbumId(albumId: string): Promise<void> {
    await this.trackRepository.update({ albumId }, { albumId: null });
  }
}
