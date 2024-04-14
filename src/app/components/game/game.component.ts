import { Component, Input, OnInit } from '@angular/core';
import { TSteps } from 'src/app/types/TSteps';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() step!: TSteps;

  constructor() {}

  ngOnInit(): void {}
}
