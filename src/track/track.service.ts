import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Track } from './models/track.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private tracksArr: Track[] = [];

  getAll(): Track[] {
    return this.tracksArr;
  }

  getById(id: string): Track | null {
    return this.tracksArr.find(track => track.id === id) || null;
  }

  create(trackCreationData: CreateTrackDto): Track {
    const freshTrack: Track = {
      id: uuidv4(),
      ...trackCreationData,
    };
    this.tracksArr.push(freshTrack);
    return freshTrack;
  }

  update(id: string, trackUpdateData: UpdateTrackDto): Track | null {
    const index = this.tracksArr.findIndex(track => track.id === id);

    if (index === -1) return null;

    const amendedTrack = {
      ...this.tracksArr[index],
      ...trackUpdateData,
    };

    this.tracksArr[index] = amendedTrack;
    return amendedTrack;
  }

  delete(id: string): void {
    this.tracksArr = this.tracksArr.filter(track => track.id !== id);
  }

  clearArtistId(artistId: string): void {
    this.tracksArr = this.tracksArr.map(track =>
      track.artistId === artistId ? { ...track, artistId: null } : track,
    );
  }

  clearAlbumId(albumId: string): void {
    this.tracksArr = this.tracksArr.map(track =>
      track.albumId === albumId ? { ...track, albumId: null } : track,
    );
  }
}
