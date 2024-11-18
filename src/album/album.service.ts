import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';
import { AlbumEntity } from './models/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async getById(id: string): Promise<AlbumEntity | null> {
    return await this.albumRepository.findOneBy({ id });
  }

  async create(albumCreateData: CreateAlbumDto): Promise<AlbumEntity> {
    const freshAlbum = this.albumRepository.create(albumCreateData);
    return await this.albumRepository.save(freshAlbum);
  }

  async update(
    id: string,
    albumUpdateData: UpdateAlbumDto,
  ): Promise<AlbumEntity | null> {
    const existingAlbum = await this.getById(id);

    if (!existingAlbum) {
      return null;
    }

    const amendedAlbum = this.albumRepository.merge(
      existingAlbum,
      albumUpdateData,
    );

    return await this.albumRepository.save(amendedAlbum);
  }

  async delete(id: string): Promise<void> {
    await this.albumRepository.delete({ id });
    await this.trackService.clearAlbumId(id);
  }

  async clearArtistId(artistId: string): Promise<void> {
    await this.albumRepository.update(
      { artistId },
      { artistId: null },
    );
  }
}
