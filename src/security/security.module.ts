import {NgModule} from '@angular/core';
import {SecurityService} from './security.service';
import {LoginComponent} from './login/login.component';
import {CodeConfirmComponent} from './code-confirm/code-confirm.component';
import {MailConfirmComponent} from './mail-confirm/mail-confirm.component';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from 'ionic-angular';
import {HttpModule} from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';
import {AuthHttp} from './auth.http';
import {MailConfirmModule} from './mail-confirm/mail-confirm.component.module';
import {LoginModule} from './login/login.component.module';
import {CodeConfirmModule} from './code-confirm/code-confirm.component.module';

@NgModule({
  imports: [BrowserModule,
    IonicModule.forRoot(LoginComponent),
    IonicModule.forRoot(MailConfirmComponent),
    IonicModule.forRoot(CodeConfirmComponent),
    IonicStorageModule.forRoot(),
    HttpModule, MailConfirmModule, LoginModule, CodeConfirmModule],
  providers: [SecurityService, AuthHttp],
  entryComponents: [
    LoginComponent,
    MailConfirmComponent
  ],
})
export class SecurityModule {

}
