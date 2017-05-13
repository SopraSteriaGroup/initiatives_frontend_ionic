import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SecurityService} from '../security.service';
import {HomePage} from '../../pages/home/home';
import {MailConfirmComponent} from '../mail-confirm/mail-confirm.component';
@Component({
  selector: 'page-code-confirm',
  templateUrl: 'code-confirm.html',
  styles: ['code-confirm.scss']
})
export class CodeConfirmComponent {


  constructor(private _securityService: SecurityService, public navCtrl: NavController) {

  }

  verify(code: string) {
    this.navCtrl.push(HomePage);
  }

  back() {
    this.navCtrl.push(MailConfirmComponent);
  }


}
