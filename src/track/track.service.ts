import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Track } from './models/track.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  getAll(): Track[] {
    return this.tracks;
  }

  getById(id: string): Track | null {
    return this.tracks.find(track => track.id === id) || null;
  }

  create(trackCreationData: CreateTrackDto): Track {
    const freshTrack: Track = {
      id: uuidv4(),
      ...trackCreationData,
    };
    this.tracks.push(freshTrack);
    return freshTrack;
  }

  update(id: string, trackUpdateData: UpdateTrackDto): Track | null {
    const index = this.tracks.findIndex(track => track.id === id);

    if (index === -1) return null;

    const amendedTrack = {
      ...this.tracks[index],
      ...trackUpdateData,
    };

    this.tracks[index] = amendedTrack;
    return amendedTrack;
  }

  delete(id: string): void {
    this.tracks = this.tracks.filter(track => track.id !== id);
  }

  clearArtistId(artistId: string): void {
    this.tracks = this.tracks.map(track =>
      track.artistId === artistId ? { ...track, artistId: null } : track,
    );
  }
}
