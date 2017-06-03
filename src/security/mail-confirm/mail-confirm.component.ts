import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {CodeConfirmComponent} from '../code-confirm/code-confirm.component';
import {SecurityService} from '../security.service';

@IonicPage()
@Component({
  selector: 'page-mail-confirm',
  templateUrl: 'mail-confirm.html',
  styles: ['mail-confirm.scss']
})
export class MailConfirmComponent {

  email: string;

  constructor(public securityService: SecurityService, public navCtrl: NavController) {

  }

  send() {
    this.securityService.register(this.email).subscribe((res) => {
      this.navCtrl.push(CodeConfirmComponent);
    }, function (err) {
      alert(err);
    });
  }

}
