import { ICharacter } from 'src/app/interfaces/ICharacter';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  @Input() userOne?: ICharacter;
  @Input() userTwo?: ICharacter;

  constructor() {}

  ngOnInit(): void {}
}
