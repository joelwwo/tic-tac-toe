import { Component, OnInit } from '@angular/core';
import { ICharacter } from './interfaces/ICharacter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userOne!: ICharacter;
  userTwo: ICharacter;

  constructor() {}

  ngOnInit() {}

  selectOpenent(user: ICharacter) {
    if (!this.userOne) {
      this.userOne = user;
    } else {
      this.userTwo = user;
    }
  }
}
