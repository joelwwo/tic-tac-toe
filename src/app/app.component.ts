import { Component, OnInit } from '@angular/core';
import { MarvelService } from './services/marvel.service';
import { ICharacters } from './interfaces/ICharacters';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tic-tac-toe';
  resultFromSearch$!: Observable<ICharacters[]>;

  private searchTerms = new Subject<string>();

  messageErro = '';

  constructor(private marvelService: MarvelService) {}

  ngOnInit() {
    this.resultFromSearch$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => {
        const result = this.marvelService.getCharactersByName(term);
        // result.subscribe((res) => {
        //   // this.messageErro = '';
        //   // if (!res.length)
        //   //   this.messageErro = 'Não foi encontrado nenhum personagem!';
        // });

        return result;
      })
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
