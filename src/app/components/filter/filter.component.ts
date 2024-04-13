import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filter!: FormControl<string | null>;
  @Input() messageErro = '';

  constructor() {}

  ngOnInit(): void {}
}
