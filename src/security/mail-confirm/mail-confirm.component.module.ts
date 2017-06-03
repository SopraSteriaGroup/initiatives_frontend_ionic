import {IonicPageModule} from 'ionic-angular';
import {NgModule} from '@angular/core';
import {MailConfirmComponent} from './mail-confirm.component';

@NgModule({
  declarations: [
    MailConfirmComponent
  ],
  imports: [
    IonicPageModule.forChild(MailConfirmComponent)
  ],
  entryComponents: [
    MailConfirmComponent
  ]
})
export class MailConfirmModule {
}
