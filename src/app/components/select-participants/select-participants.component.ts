import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ICharacter } from 'src/app/interfaces/ICharacter';
import { MarvelService } from 'src/app/services/marvel/marvel.service';
import { TSteps } from 'src/app/types/TSteps';

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
  @Input() step!: TSteps;

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

            this.filterDuplicatedResults(response);
          });
      });
  }

  chooseCharacter() {
    const {
      name,
      id,
      thumbnail,
      canPlay = false,
      points = 0,
      identifier = 'o',
    } = this.resultSelected as ICharacter;
    this.selectedCharacter.emit({
      name,
      id,
      thumbnail,
      canPlay,
      points,
      identifier,
    });
    this.filterDuplicatedResults(this.characters);
  }

  selectCharacter(character: ICharacter) {
    this.resultSelected = character;
  }

  filterDuplicatedResults(resultsApi: ICharacter[]) {
    if (this.resultSelected?.id !== undefined)
      this.characters = resultsApi.filter(
        (character) => character.id !== this.resultSelected?.id
      );
    else this.characters = resultsApi;
  }
}
