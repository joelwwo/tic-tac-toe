import { Component, OnInit } from '@angular/core';
import { ICharacter } from './interfaces/ICharacter';
import { TSteps } from './types/TSteps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userOne!: ICharacter;
  userTwo!: ICharacter;
  step: TSteps = 'select-participants';

  constructor() {}

  ngOnInit() {}

  setStep(step: TSteps) {
    this.step = step;
  }

  selectOpponent(character: ICharacter) {
    const hasUserOne = this.userOne?.id;
    if (hasUserOne) {
      this.userTwo = character;
      this.userOne.canPlay = this.userTwo.canPlay = false;
      this.setStep('draw');
    } else this.userOne = character;
  }

  defineCharacterThatStartsTheGame(character: ICharacter) {
    this.defineCharacterWhoPlaysInTurn(character);
    this.setStep('to-play');
  }

  defineCharacterWhoPlaysInTurn(character: ICharacter) {
    this.userOne.canPlay = this.userTwo.canPlay = false;
    character.canPlay = true;
  }
}
