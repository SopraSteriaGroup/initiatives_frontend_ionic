import {IonicPageModule} from 'ionic-angular';
import {CodeConfirmComponent} from './code-confirm.component';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [
    CodeConfirmComponent
  ],
  imports: [
    IonicPageModule.forChild(CodeConfirmComponent)
  ],
  entryComponents: [
    CodeConfirmComponent
  ]
})
export class CodeConfirmModule {
}
