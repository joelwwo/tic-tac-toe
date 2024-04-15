import { TicTacToeService } from './../../services/tic-tac-toe/tic-tac-toe.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICharacter } from 'src/app/interfaces/ICharacter';
import { IResultOfThePlay } from 'src/app/interfaces/IResultOfThePlay';
import { TSteps } from 'src/app/types/TSteps';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnChanges {
  @Input() step!: TSteps;
  @Input() currentPlayer?: ICharacter;
  @Output() onResetGame = new EventEmitter<boolean>();
  @Output() onResultOfThePlay = new EventEmitter<IResultOfThePlay>();

  constructor(public ticTacToeService: TicTacToeService) {}

  ngOnInit(): void {}

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
    this.ticTacToeService.handleClick(index);
    this.onResultOfThePlay.emit({
      championDefined: false,
    });
  }
}
