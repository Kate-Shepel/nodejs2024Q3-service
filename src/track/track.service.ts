import { Injectable } from '@nestjs/common';
import { Track } from './models/track.model';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];
}