import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HomePage} from '../../pages/home/home';
import {SecurityService} from '../security.service';

@IonicPage()
@Component({
  selector: 'page-code-confirm',
  templateUrl: 'code-confirm.html',
  styles: ['code-confirm.scss']
})
export class CodeConfirmComponent {


  constructor(private securityService: SecurityService, public navCtrl: NavController) {

  }

  verify(code: string) {
    this.securityService.verifyActivationCode(code).subscribe(res => {
      alert(res);
      this.navCtrl.push(HomePage);
    }, error => {
      alert(error);
    });
  }

  back() {
    this.navCtrl.push('MailConfirmComponent');
  }


}
