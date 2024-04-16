import { TIdentifier } from '../types/TIdentifier';

interface IThumbnail {
  path: string;
  extension: string;
}

export interface ICharacter {
  id: number;
  identifier: TIdentifier;
  name: string;
  canPlay: boolean;
  points: number;
  thumbnail: IThumbnail;
}
