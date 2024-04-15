import { Component, OnInit } from '@angular/core';
import { ICharacter } from './interfaces/ICharacter';
import { TSteps } from './types/TSteps';
import { IResultOfThePlay } from './interfaces/IResultOfThePlay';
import { MChatacters } from './Mocks/MCharacters';

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

  constructor() {
    this.userOne = MChatacters[0];
    this.userTwo = MChatacters[1];
    this.defineCharacterThatStartsTheGame(this.userOne);
    this.setStep('to-play');
  }

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
    this.currentPlayer = character;
    if (!this.userOne?.id || !this.userTwo?.id) return;
    this.userOne.canPlay = this.userTwo.canPlay = false;
    character.canPlay = true;
    this.setStep('to-play');
  }

  toggleCurrentPlayerAndCheckWinner(onResultOfThePlay: IResultOfThePlay) {
    console.log(onResultOfThePlay);
    // debugger;
    if (!this.userOne?.id || !this.userTwo?.id) return;
    if (onResultOfThePlay.result === 'winner-defined') {
      this.currentPlayer.points++;
      this.currentPlayer.canPlay = false;
    } else if (onResultOfThePlay.result === 'draw') {
      this.userOne.canPlay = this.userTwo.canPlay = false;
    } else if (onResultOfThePlay.result === 'in-progress') {
      this.userOne.canPlay = !this.userOne.canPlay;
      this.userTwo.canPlay = !this.userTwo.canPlay;
      this.currentPlayer = this.userOne.canPlay ? this.userOne : this.userTwo;
    }
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
