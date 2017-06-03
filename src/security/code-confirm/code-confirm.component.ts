import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HomePage} from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-code-confirm',
  templateUrl: 'code-confirm.html',
  styles: ['code-confirm.scss']
})
export class CodeConfirmComponent {


  constructor(public navCtrl: NavController) {

  }

  verify(code: string) {
    this.navCtrl.push(HomePage);
  }

  back() {
    this.navCtrl.push('MailConfirmComponent');
  }


}
