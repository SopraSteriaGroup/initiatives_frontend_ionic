import {NgModule} from '@angular/core';
import {SecurityService} from './security.service';
import {LoginComponent} from './login/login.component';
import {CodeConfirmComponent} from './code-confirm/code-confirm.component';
import {MailConfirmComponent} from './mail-confirm/mail-confirm.component';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from 'ionic-angular';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [BrowserModule,
    IonicModule.forRoot(LoginComponent),
    IonicModule.forRoot(MailConfirmComponent),
    IonicModule.forRoot(CodeConfirmComponent), HttpModule],
  declarations: [LoginComponent, MailConfirmComponent, CodeConfirmComponent],
  providers: [SecurityService],
  entryComponents: [
    LoginComponent
  ],
})
export class SecurityModule {

}
