import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArtistEntity } from './models/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async getAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getById(id: string): Promise<ArtistEntity | null> {
    return await this.artistRepository.findOneBy({ id });
  }

  async create(artistCreateData: CreateArtistDto): Promise<ArtistEntity> {
    const freshArtist = this.artistRepository.create(artistCreateData);
    return await this.artistRepository.save(freshArtist);
  }

  async update(
    id: string,
    artistUpdateData: UpdateArtistDto,
  ): Promise<ArtistEntity | null> {
    const existingArtist = await this.getById(id);

    if (!existingArtist) {
      return null;
    }

    const amendedArtist = this.artistRepository.merge(
      existingArtist,
      artistUpdateData,
    );

    return await this.artistRepository.save(amendedArtist);
  }

  async delete(id: string): Promise<void> {
    await this.artistRepository.delete({ id });
    this.trackService.clearArtistId(id);
  }
}
