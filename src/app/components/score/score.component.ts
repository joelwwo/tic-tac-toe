import { Component, Input } from '@angular/core';

import { ICharacter } from 'src/app/interfaces/ICharacter';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {
  @Input() userOne?: ICharacter;
  @Input() userTwo?: ICharacter;

  getURLimage(character?: ICharacter): string {
    if (!character) return 'assets/images/interrogation.png';
    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  }
}
