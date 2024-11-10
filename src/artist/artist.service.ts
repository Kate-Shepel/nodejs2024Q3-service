import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Artist } from './models/artist.model';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from '../track/track.service';
//import { AlbumService } from '../album/album.service';        TODO

@Injectable()
export class ArtistService {

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    //@Inject(forwardRef(() => AlbumService))
    //private readonly albumService: AlbumService,        TODO
  ) {}

  private artistsArr: Artist[] = [];

  getAll(): Artist[] {
    return this.artistsArr;
  }

  getById(id: string): Artist | null {
    return this.artistsArr.find(artist => artist.id === id) || null;
  }

  create(artistCreateData: CreateArtistDto): Artist {
    const freshArtist: Artist = {
      id: uuidv4(),
      ...artistCreateData,
    };
    this.artistsArr.push(freshArtist);
    return freshArtist;
  }

  update(id: string, artistUpdateData: UpdateArtistDto): Artist | null {
    const index = this.artistsArr.findIndex(artist => artist.id === id);

    if (index === -1) return null;

    const amendedArtist = {
      ...this.artistsArr[index],
      ...artistUpdateData,
    };

    this.artistsArr[index] = amendedArtist;
    return amendedArtist;
  }

  delete(id: string): void {
    this.artistsArr = this.artistsArr.filter(artist => artist.id !== id);
    this.trackService.clearArtistId(id);
  }
}
