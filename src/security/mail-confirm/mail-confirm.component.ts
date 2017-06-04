import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {CodeConfirmComponent} from '../code-confirm/code-confirm.component';
import {SecurityService} from '../security.service';

@IonicPage()
@Component({
  selector: 'page-mail-confirm',
  templateUrl: 'mail-confirm.html',
  styles: ['mail-confirm.scss']
})
export class MailConfirmComponent implements OnInit {

  email: string;

  constructor(public securityService: SecurityService, public navCtrl: NavController) {

  }

  ngOnInit() {
  }

  send() {
    this.securityService.register(this.email).subscribe((res) => {
      this.navCtrl.push(CodeConfirmComponent);
    }, e => {
      alert('Ce compte existe déjà, merci de le valider');
      this.navCtrl.push(CodeConfirmComponent);
    });
  }

}
