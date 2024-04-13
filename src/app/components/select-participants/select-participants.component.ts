import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ICharacter } from 'src/app/interfaces/ICharacter';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-select-participants',
  templateUrl: './select-participants.component.html',
  styleUrls: ['./select-participants.component.scss'],
})
export class SelectParticipantsComponent implements OnInit {
  filter = new FormControl<string>('');
  messageErro = '';
  characters: ICharacter[] = [];
  resultSelected?: ICharacter;
  @Output() selectedCharacter = new EventEmitter<ICharacter>();

  constructor(private marvelService: MarvelService) {}

  ngOnInit() {
    this.filter.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((informedFilter: any) => {
        this.resultSelected = undefined;
        this.marvelService
          .getCharactersByName(informedFilter)
          .subscribe((response) => {
            this.messageErro = '';
            if (!response.length && informedFilter)
              this.messageErro = 'Não foi encontrado nenhum personagem!';

            this.characters = response;
          });
      });
  }

  chooseCharacter() {
    this.selectedCharacter.emit(this.resultSelected);
  }

  selectCharacter(character: ICharacter) {
    this.resultSelected = character;
  }
}
