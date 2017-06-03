import {IonicPageModule} from 'ionic-angular';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    IonicPageModule.forChild(LoginComponent)
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class LoginModule {
}
