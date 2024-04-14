import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { SelectParticipantsComponent } from './components/select-participants/select-participants.component';
import { ScoreComponent } from './components/score/score.component';

@NgModule({
  declarations: [AppComponent, FilterComponent, SelectParticipantsComponent, ScoreComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
