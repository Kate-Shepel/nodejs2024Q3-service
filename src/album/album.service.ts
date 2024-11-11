import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './models/album.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAll(): Album[] {
    return this.albums;
  }

  getById(id: string): Album | null {
    return this.albums.find(album => album.id === id) || null;
  }

  create(albumCreateData: CreateAlbumDto): Album {
    const freshAlbum: Album = {
      id: uuidv4(),
      ...albumCreateData,
    };

    this.albums.push(freshAlbum);
    return freshAlbum;
  }

  update(id: string, albumUpdateData: UpdateAlbumDto): Album | null {
    const index = this.albums.findIndex(album => album.id === id);

    if (index === -1) return null;

    const amendedAlbum = {
      ...this.albums[index],
      ...albumUpdateData,
    };

    this.albums[index] = amendedAlbum;
    return amendedAlbum;
  }

  delete(id: string): void {
    this.albums = this.albums.filter(album => album.id !== id);
  }
}
