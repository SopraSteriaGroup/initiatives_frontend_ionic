import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HomePage} from '../../pages/home/home.page';
import {SecurityService} from '../security.service';

@IonicPage()
@Component({
  selector: 'page-code-confirm',
  templateUrl: 'code-confirm.html',
  styles: ['code-confirm.scss']
})
export class CodeConfirmComponent {

  uuid: string;

  constructor(private securityService: SecurityService, public navCtrl: NavController) {

  }

  verifyActivationCode() {
    this.securityService.verifyActivationCode(this.uuid).subscribe(res => {
      this.navCtrl.push(HomePage);
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  back() {
    this.navCtrl.push('MailConfirmComponent');
  }


}
