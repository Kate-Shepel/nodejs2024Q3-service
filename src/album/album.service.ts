import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './models/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  private albumsArr: Album[] = [];

  getAll(): Album[] {
    return this.albumsArr;
  }

  getById(id: string): Album | null {
    return this.albumsArr.find((album) => album.id === id) || null;
  }

  create(albumCreateData: CreateAlbumDto): Album {
    const freshAlbum: Album = {
      id: uuidv4(),
      ...albumCreateData,
    };

    this.albumsArr.push(freshAlbum);
    return freshAlbum;
  }

  update(id: string, albumUpdateData: UpdateAlbumDto): Album | null {
    const index = this.albumsArr.findIndex((album) => album.id === id);

    if (index === -1) return null;

    const amendedAlbum = {
      ...this.albumsArr[index],
      ...albumUpdateData,
    };

    this.albumsArr[index] = amendedAlbum;
    return amendedAlbum;
  }

  delete(id: string): void {
    this.albumsArr = this.albumsArr.filter((album) => album.id !== id);

    this.trackService.clearAlbumId(id);
  }

  clearArtistId(artistId: string): void {
    this.albumsArr = this.albumsArr.map((album) =>
      album.artistId === artistId ? { ...album, artistId: null } : album,
    );
  }
}
