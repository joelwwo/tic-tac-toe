interface IThumbnail {
  path: string;
  extension: string;
}

export interface ICharacters {
  id: number;
  description: string;
  modified: string;
  name: string;
  resourceURI: string;
  thumbnail: IThumbnail;
}
