import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {SecurityService} from '../security.service';
import {MailConfirmComponent} from '../mail-confirm/mail-confirm.component';
import {HomePage} from '../../pages/home/home.page';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles: ['login.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _securityService: SecurityService, public navCtrl: NavController) {

  }

  ngOnInit() {

  }

  login() {
    this._securityService.login().subscribe(user => {
        this.navCtrl.push(HomePage);
      },
      err => {
        if (err.status === 401) {
          alert(err);
          alert('Aucun mail trouvé pour ce compte, merci d\'enregistrer votre mail');
          this.navCtrl.push(MailConfirmComponent);
        } else {
          alert('Une erreur server a été produite');
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
