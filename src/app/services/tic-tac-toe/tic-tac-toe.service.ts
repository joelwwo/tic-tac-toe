import { Injectable, Input } from '@angular/core';
import { ICharacter } from 'src/app/interfaces/ICharacter';
import { IResultOfThePlay } from 'src/app/interfaces/IResultOfThePlay';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  @Input() currentPlayer!: ICharacter;
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
}
