import { Injectable } from '@angular/core';
import { ICharacter } from 'src/app/interfaces/ICharacter';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  currentPlayer!: ICharacter;
  gameState: any = [null, null, null, null, null, null, null, null, null];
  gameActive = true;

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

  constructor() {}

  checkWinner() {}

  handleClick(index: number): void {
    this.gameState[index] = this.currentPlayer;
  }
}
