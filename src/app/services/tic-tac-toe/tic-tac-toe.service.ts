import { Injectable, Input } from '@angular/core';
import { MChatacters } from 'src/app/Mocks/MCharacters';
import { ICharacter } from 'src/app/interfaces/ICharacter';
import { IResultOfThePlay } from 'src/app/interfaces/IResultOfThePlay';
import { TSteps } from 'src/app/types/TSteps';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  // teste
  private userOne: ICharacter = MChatacters[0];
  userTwo: ICharacter = MChatacters[1];
  step: TSteps = 'select-participants';
  currentPlayer!: ICharacter;
  initWithMocks = false;
  // fim teste

  gameState: any = ['', '', '', '', '', '', '', '', ''];

  winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  resetGameState(): void {
    this.gameState = ['', '', '', '', '', '', '', '', ''];
  }

  checkWinner(): IResultOfThePlay {
    const gameState = this.gameState as ICharacter[];
    const incompleteTable = this.gameState.includes('');

    for (let condition of this.winningConditions) {
      const [a, b, c] = condition;
      if (
        gameState[a].identifier === this.currentPlayer.identifier &&
        gameState[a].identifier === gameState[b].identifier &&
        gameState[a].identifier === gameState[c].identifier
      ) {
        return {
          result: 'winner-defined',
        };
      }
    }

    if (incompleteTable) return { result: 'in-progress' };

    return {
      result: 'draw',
    };
  }

  handleClick(index: number): void {
    if (this.gameState[index] || this.currentPlayer.canPlay === false) return;
    this.gameState[index] = this.currentPlayer;
  }

  setStep(step: TSteps) {
    this.step = step;
  }

  selectOpponents(chosenCharacter: ICharacter) {
    if (!this.userOne.id) {
      this.userOne = chosenCharacter;
      return;
    }

    this.userTwo = chosenCharacter;
    this.setStep('draw');
  }

  defineCharacterThatStartsTheGame(character: ICharacter) {
    character.identifier = 'x';
    this.currentPlayer = character;
    if (!this.userOne.id || !this.userTwo.id) return;
    this.userOne.canPlay = this.userTwo.canPlay = false;
    character.canPlay = true;
    this.setStep('to-play');
  }

  toggleCurrentPlayerAndCheckWinner({ result }: IResultOfThePlay) {
    const resultActions = {
      'in-progress': () => {
        this.toggleCurrentPlayer();
      },
      'winner-defined': () => {
        this.currentPlayer.points++;
      },
      draw: () => {
        alert('Empate!');
      },
    };

    resultActions[result]();
  }

  toggleCurrentPlayer() {
    this.setUserOne({ canPlay: !this.userOne.canPlay });
    this.setUserTwo({ canPlay: !this.userTwo.canPlay });

    this.currentPlayer = this.userOne.canPlay ? this.userOne : this.userTwo;
  }

  setMockValues() {
    if (this.initWithMocks) {
      this.setUserOne({ ...MChatacters[0] });
      this.setUserTwo({ ...MChatacters[1] });

      this.defineCharacterThatStartsTheGame(this.userOne);
      this.setStep('to-play');
    }
  }

  restartGame() {
    this.setMockValues();
    this.currentPlayer.canPlay = true;
  }

  get getCurrentPlayer() {
    return this.currentPlayer;
  }

  get getUserOne() {
    return this.userOne;
  }

  get getUserTwo() {
    return this.userTwo;
  }

  setUserOne(character: Partial<ICharacter>) {
    this.userOne = { ...this.userOne, ...character };
  }

  setUserTwo(character: Partial<ICharacter>) {
    this.userTwo = { ...this.userTwo, ...character };
  }
}
