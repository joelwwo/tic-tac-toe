import { TIdentifier } from '../types/TIdentifier';

interface IThumbnail {
  path: string;
  extension: string;
}

export interface ICharacter {
  id: number;
  description: string;
  identifier: TIdentifier;
  modified: string;
  name: string;
  canPlay: boolean;
  points: number;
  resourceURI: string;
  thumbnail: IThumbnail;
}
