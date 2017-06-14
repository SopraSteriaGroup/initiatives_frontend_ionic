import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from 'ionic-angular';
import {HomePage} from './home.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [HomePage],
  imports: [BrowserModule,
    SharedModule,
    IonicModule.forRoot(HomePage)],
  providers: [],
  entryComponents: [
    HomePage
  ],
})
export class HomeModule {

}
