interface IThumbnail {
  path: string;
  extension: string;
}

export interface ICharacter {
  id: number;
  description: string;
  modified: string;
  name: string;
  resourceURI: string;
  thumbnail: IThumbnail;
}
