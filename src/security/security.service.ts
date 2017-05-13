import {Injectable} from '@angular/core';
import {LinkedinUser} from './linkedinUser.model';
import {Auth, User} from '@ionic/cloud-angular';
import {Observable} from 'rxjs/Observable';
import {Platform} from 'ionic-angular';
import {Http} from '@angular/http';

@Injectable()
export class SecurityService {

  private _linkedinUser: LinkedinUser;

  private platform: Platform;

  constructor(public auth: Auth, public user: User, platform: Platform, private http: Http) {
    this.platform = platform;
  }


  getCurrentLinkedinUser(): LinkedinUser {
    if (this.auth.isAuthenticated) {
      return this._linkedinUser;
    }
  }

  login(): Observable<LinkedinUser> {
    const linkedinLogin$ = Observable.fromPromise(this.auth.login('linkedin'));
    return linkedinLogin$.mergeMap(() => {
      return Observable.of(new LinkedinUser(
        this.user.social.linkedin.access_token,
        this.user.social.linkedin.data.username,
        this.user.social.linkedin.data.full_name,
        this.user.social.linkedin.data.profile_picture,
        this.user.social.linkedin.data.email))
        .do(user => this._linkedinUser = user);
    });

  }

  logout() {
    this.auth.logout();
  }


  sendActivationCode() {

  }

  verifyCode() {

  }

}
