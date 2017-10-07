import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { TrainingProgramComponent } from './trainingprogram.component';

import { TrainingProgramService }  from './trainingprogram.service';

@NgModule({
  declarations: [
    AppComponent,
	TrainingProgramComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpModule
  ],
  providers: [TrainingProgramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
