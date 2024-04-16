import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { TicTacToeService } from './../../services/tic-tac-toe/tic-tac-toe.service';
import { ICharacter } from 'src/app/interfaces/ICharacter';
import { IResultOfThePlay } from 'src/app/interfaces/IResultOfThePlay';
import { TSteps } from 'src/app/types/TSteps';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnChanges {
  @Input() step!: TSteps;
  @Input() currentPlayer?: ICharacter;
  @Output() onResetGame = new EventEmitter<boolean>();
  @Output() onResultOfThePlay = new EventEmitter<IResultOfThePlay>();

  constructor(public ticTacToeService: TicTacToeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['currentPlayer'] &&
      changes['currentPlayer']?.currentValue?.id
    ) {
      this.ticTacToeService.currentPlayer =
        changes['currentPlayer'].currentValue;
    }
  }

  onClick(index: number): void {
    if (this.ticTacToeService.checkWinner().result !== 'in-progress') return;
    this.ticTacToeService.handleClick(index);
    this.onResultOfThePlay.emit(this.ticTacToeService.checkWinner());
  }

  resetGame(): void {
    this.ticTacToeService.resetGameState();
    this.onResetGame.emit(true);
  }
}
