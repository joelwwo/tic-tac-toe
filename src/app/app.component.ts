import { Component, OnInit } from '@angular/core';
import { ICharacter } from './interfaces/ICharacter';
import { TSteps } from './types/TSteps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userOne?: ICharacter;
  userTwo?: ICharacter;
  step: TSteps = 'select-participants';
  currentPlayer!: ICharacter;

  constructor() {}

  ngOnInit() {}

  setStep(step: TSteps) {
    this.step = step;
  }

  selectOpponent(chosenCharacter: ICharacter) {
    chosenCharacter.identifier = 'o';
    if (!this.userOne) {
      this.userOne = chosenCharacter;
      return;
    }

    this.userTwo = chosenCharacter;
    this.resetPlayers();
    this.setStep('draw');
  }

  defineCharacterThatStartsTheGame(character: ICharacter) {
    character.identifier = 'x';
    this.defineCharacterWhoPlaysInTurn(character);
    this.setStep('to-play');
  }

  defineCharacterWhoPlaysInTurn(character: ICharacter) {
    if (!this.userOne?.id || !this.userTwo?.id) return;
    this.userOne.canPlay = this.userTwo.canPlay = false;
    character.canPlay = true;
    this.currentPlayer = character;
  }

  resetPlayers(resetAll = false) {
    if (!this.userOne?.id || !this.userTwo?.id) return;
    if (resetAll) this.userOne = this.userTwo = undefined;
    else {
      this.userOne.points = this.userTwo.points = 0;
      this.userOne.canPlay = this.userTwo.canPlay = false;
    }
  }

  resetGame() {
    this.setStep('select-participants');
    this.resetPlayers(true);
  }
}
