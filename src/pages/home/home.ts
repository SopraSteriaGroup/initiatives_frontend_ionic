import {Component} from '@angular/core';
import {SecurityService} from '../../security/security.service';
import {LinkedinUser} from '../../security/linkedinUser.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentLinkedinUser: LinkedinUser;

  constructor(private _securityService: SecurityService) {
    this.currentLinkedinUser = this._securityService.getCurrentLinkedinUser();
  }

}
