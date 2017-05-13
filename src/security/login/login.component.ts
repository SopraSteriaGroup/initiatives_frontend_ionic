import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SecurityService} from '../security.service';
import {MailConfirmComponent} from '../mail-confirm/mail-confirm.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles: ['login.scss']
})
export class LoginComponent {

  constructor(private _securityService: SecurityService, public navCtrl: NavController) {

  }

  login() {
    this._securityService.login().subscribe(user => {
      this.navCtrl.push(MailConfirmComponent);
    });
  }

  logout() {
    this._securityService.logout();
  }

}
