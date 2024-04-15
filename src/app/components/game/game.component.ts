import { TicTacToeService } from './../../services/tic-tac-toe/tic-tac-toe.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICharacter } from 'src/app/interfaces/ICharacter';
import { TSteps } from 'src/app/types/TSteps';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() step!: TSteps;
  @Input() currentPlayer!: ICharacter;
  @Output() onResetGame = new EventEmitter<boolean>();

  constructor(public ticTacToeService: TicTacToeService) {
    this.ticTacToeService.currentPlayer = this.currentPlayer;
  }

  ngOnInit(): void {}
}
