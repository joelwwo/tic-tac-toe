import { Injectable, Input } from '@angular/core';
import { ICharacter } from 'src/app/interfaces/ICharacter';
import { IResultOfThePlay } from 'src/app/interfaces/IResultOfThePlay';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  @Input() currentPlayer!: ICharacter;
  gameState: any = ['', '', '', '', '', '', '', '', ''];
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

  // const checkWinner = () => {
  //   for (let condition of winningConditions) {
  //     const [a, b, c] = condition;
  //     if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
  //       gameActive = false;
  //       return gameState[a];
  //     }
  //   }
  //   if (!gameState.includes('')) {
  //     gameActive = false;
  //     return 'draw';
  //   }
  //   return null;
  // };

  checkWinner(): IResultOfThePlay {
    for (let condition of this.winningConditions) {
      const [a, b, c] = condition;
      if (
        this.gameState[a] &&
        this.gameState[a] === this.gameState[b] &&
        this.gameState[a] === this.gameState[c]
      ) {
        this.gameActive = false;
        return {
          result: 'winner-defined',
        };
      }
    }
    if (this.gameState.includes('')) {
      this.gameActive = false;
      return { result: 'in-progress' };
    }
    return {
      result: 'draw',
    };
  }

  handleClick(index: number): void {
    if (this.gameState[index] || !this.gameActive) return;
    this.gameState[index] = this.currentPlayer;
  }
}
