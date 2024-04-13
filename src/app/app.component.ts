import { Component, OnInit } from '@angular/core';
import { MarvelService } from './services/marvel.service';
import { ICharacters } from './interfaces/ICharacters';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  filter = new FormControl<string>('');
  messageErro = '';
  results: ICharacters[] = [];

  constructor(private marvelService: MarvelService) {}

  ngOnInit() {
    this.filter.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: any) => {
        this.marvelService.getCharactersByName(value).subscribe((res) => {
          this.messageErro = '';
          if (!res.length && value)
            this.messageErro = 'Não foi encontrado nenhum personagem!';

          this.results = res;
        });
      });
  }
}
