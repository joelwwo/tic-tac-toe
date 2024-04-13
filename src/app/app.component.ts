import { Component, OnInit } from '@angular/core';
import { MarvelService } from './services/marvel.service';
import { FormControl } from '@angular/forms';
import { ICharacters } from './interfaces/ICharacters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tic-tac-toe';
  resultFromSearch: ICharacters[] = [];
  search = new FormControl('');
  messageErro = '';

  constructor(private marvelService: MarvelService) {}

  ngOnInit() {
    this.marvelService.getCharactersByName('w').subscribe((res) => {
      this.resultFromSearch = res;
      this.messageErro = '';
      if (!this.resultFromSearch.length)
        this.messageErro = 'Não foi encontrado nenhum personagem!';
    });
  }
}
