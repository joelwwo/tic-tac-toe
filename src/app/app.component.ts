import { Component } from '@angular/core';

import { TicTacToeService } from './services/tic-tac-toe/tic-tac-toe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(protected ticTacToeService: TicTacToeService) {}
}
