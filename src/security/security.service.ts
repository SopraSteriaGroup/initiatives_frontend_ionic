import {Injectable} from '@angular/core';
import {LinkedinUser} from './linkedinUser.model';
import {Observable} from 'rxjs/Observable';
import {Platform} from 'ionic-angular';
import {appConst, linkedinConfig} from '../shared/constants';
import {TokenModel} from './token.model';
import {Storage} from '@ionic/storage';
import * as moment from 'moment';
import {Headers, Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {InAppBrowser} from 'ionic-native';


@Injectable()
export class SecurityService {

  private _linkedinUser: LinkedinUser;

  private currentPlatform: Platform;

  private tokenKey = 'ideas_oauth2_access';

  private token: TokenModel;

  private browser: InAppBrowser;

  constructor(private platform: Platform,
              public storage: Storage,
              private http: Http) {
    this.currentPlatform = platform;
  }


  getCurrentLinkedinUser(): LinkedinUser {
    return this._linkedinUser;
  }

  login(): Observable<LinkedinUser> {
    this.platform.ready().then(() => {
      this.browser = new InAppBrowser(linkedinConfig.authorizationUrl +
        '?client_id=' + linkedinConfig.client_id +
        '&redirect_uri=' + linkedinConfig.redirect_uri
        + '&response_type=code&access_type=offline', '_blank',
        {
          location: 'no',
          clearcache: 'yes',
          toolbar: 'no'
        });
      this.browser.on('loadstart').subscribe(
        (event) => {
          if ((event.url).startsWith(linkedinConfig.redirect_uri)) {
            const requestToken = (event.url).split('code=')[1];
            this.getAccessToken(requestToken);
          }
        },
        err => alert(err));
    });
    return Observable.of(null);
  }

  //TODO clear cache
  logout() {

  }

  getAccessToken(requestToken: string) {
    let headers = new Headers({'Host': 'www.linkedin.com', 'Content-Type': 'application/x-www-form-urlencoded'});
    const options: RequestOptionsArgs = new RequestOptions({headers: headers});
    let body = `grant_type=authorization_code&code=${requestToken}&redirect_uri=${linkedinConfig.redirect_uri}&client_id=${linkedinConfig.client_id}&client_secret=${linkedinConfig.client_secret}`;
    this.http.post(linkedinConfig.accessTokenUrl, body, options).map(res => res.json())
      .subscribe((data) => {
        this.accessToken(data.access_token);
      }, err => alert('err ' + err))
  }

  accessToken(access_token: string) {
    alert(access_token);
    this.browser.close();
    this.http.post(appConst.urls.baseUri + '/api/tokens', {'accessToken': access_token}).subscribe(res => {
      this.storeToken(res);
      this.browser.close();
    }, err => alert(err))
  }

  getToken(): TokenModel {
    Observable.fromPromise(this.storage.get(this.tokenKey)).subscribe((token) => {
      this.token = token;
    });
    return this.token;
  }

  findAccessTokenOrRedirect(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      // this.navCtrl.setRoot(LoginComponent);
    }
    if (this.isTokenStillValid(token)) {
      return Observable.of(token.access_token);
    }
    // this.navCtrl.setRoot(LoginComponent);
  }

  isTokenStillValid(token: TokenModel = this.getToken()): boolean {
    return token && token.expires_at && moment(token.expires_at).isAfter(moment());
  }

  private storeToken(res: Response): TokenModel {
    const token: TokenModel = res.json();
    token.expires_at = moment().add(token.expires_in, 's').toDate();
    if (!token.user_info) {
      token.user_info = token.access_token;
    }
    this.storage.set(this.tokenKey, JSON.stringify(token));
    return token;
  }

}
