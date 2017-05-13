import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SecurityService} from '../security.service';
import {CodeConfirmComponent} from '../code-confirm/code-confirm.component';
@Component({
  selector: 'page-mail-confirm',
  templateUrl: 'mail-confirm.html',
  styles: ['mail-confirm.scss']
})
export class MailConfirmComponent {

  constructor(private _securityService: SecurityService, public navCtrl: NavController) {

  }

  send(email: string) {
    // Call API
    // When true redirect
    // alert('mail envoyé...');
    this.navCtrl.setRoot(CodeConfirmComponent);
  }

}
