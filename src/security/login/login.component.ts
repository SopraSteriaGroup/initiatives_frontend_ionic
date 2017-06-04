import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {SecurityService} from '../security.service';
import {MailConfirmComponent} from '../mail-confirm/mail-confirm.component';

@IonicPage()
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
        alert(user);
      },
      err => {
        if (err.status === 401) {
          alert('Aucun mail trouvé pour ce compte, merci d\'enregistrer votre mail');
          this.navCtrl.push(MailConfirmComponent);
        }
      });
  }

  register() {
    this.navCtrl.push(MailConfirmComponent);
  }

  logout() {
    this._securityService.logout();
  }
}
