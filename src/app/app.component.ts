import { Component, OnInit } from '@angular/core';
import { MarvelService } from './services/marvel.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tic-tac-toe';
  resultFromSearch: any;
  search = new FormControl('');

  constructor(private marvelService: MarvelService) {}

  ngOnInit() {
    this.marvelService.getCharacters('w').subscribe((res: any) => {
      this.resultFromSearch = res.data;
    });
  }
}
