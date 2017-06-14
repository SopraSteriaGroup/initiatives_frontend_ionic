import {NgModule} from '@angular/core';
import {IdeaComponent} from './idea/idea.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {IonicModule} from 'ionic-angular';

@NgModule({
  declarations: [IdeaComponent],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(IdeaComponent)],
  exports: [IdeaComponent],
  providers: [],
  entryComponents: [
    IdeaComponent
  ],
})
export class SharedModule {

}
