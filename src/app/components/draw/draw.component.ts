import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICharacter } from 'src/app/interfaces/ICharacter';
import { TSteps } from 'src/app/types/TSteps';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent implements OnInit {
  @Input() step!: TSteps;
  @Input() characters!: ICharacter[];
  @Output() drawnCharacter = new EventEmitter<ICharacter>();

  constructor() {}

  ngOnInit(): void {}

  drawCharacter() {
    const randomIndex = Math.floor(Math.random() * this.characters.length);
    const randomCharacter = this.characters[randomIndex];
    this.drawnCharacter.emit(randomCharacter);
  }
}
