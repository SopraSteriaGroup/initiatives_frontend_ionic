import {Injectable} from '@angular/core';
import {LinkedinUser} from './linkedinUser.model';
import {Observable} from 'rxjs/Observable';
import {App, NavController, Platform} from 'ionic-angular';
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

  private linkedinTokenKey = 'linkedin_access';

  private tokenKey = 'ideas_oauth2_access';

  private token: TokenModel;

  private browser: InAppBrowser;

  private nav: NavController;

  constructor(private platform: Platform,
              public storage: Storage,
              private http: Http,
              private app: App) {
    this.nav = app.getActiveNav();
    this.currentPlatform = platform;
  }


  getCurrentLinkedinUser(): LinkedinUser {
    return this._linkedinUser;
  }

  login(): Observable<Response> {
    this.browser = this.initBrowser();
    return this.browser.on('loadstart')
      .mergeMap(event => {
        if ((event.url).startsWith(linkedinConfig.redirect_uri)) {
          return this.getLinkedinAccessToken(this.getRequestToken(event));
        }
        return Observable.empty();
      });
  }

  getRequestToken(event: any) {
    const requestToken = (event.url).split('code=')[1];
    this.browser.close();
    return requestToken;
  }

  getLinkedinAccessToken(requestToken: string): Observable<Response> {
    let headers = new Headers({'Host': 'www.linkedin.com', 'Content-Type': 'application/x-www-form-urlencoded'});
    const options: RequestOptionsArgs = new RequestOptions({headers: headers});
    let body = `grant_type=authorization_code&code=${requestToken}&redirect_uri=${linkedinConfig.redirect_uri}&client_id=${linkedinConfig.client_id}&client_secret=${linkedinConfig.client_secret}`;
    return this.http.post(linkedinConfig.accessTokenUrl, body, options)
      .do(res => this.storeToken(res, this.linkedinTokenKey))
      .map(res => res.json())
      .mergeMap((access_token) => this.accessToken(access_token));
  }

  //TODO clear cache
  logout() {

  }

  accessToken(access_token: string): Observable<Response> {
    return this.http.post(appConst.urls.baseUri + '/api/authentication/tokens', {'accessToken': access_token})
      .map(res => res.json());
  }

  register(email: string): Observable<Response> {
    return this.getLinkedinToken()
      .mergeMap(token => {
        alert('Register: ' + email);
        alert('Linkedin AccessToken: ' + token);
        return this.http.post(appConst.urls.baseUri + '/api/authentication/subscribe', {
          'email': email,
          'accessToken': token.access_token
        })
      })
      .do(res => {
        alert('RES' + res);
        this.storeToken(res, this.tokenKey)
      })
      .catch(err => {
        alert(err);
        return Observable.empty();
      });
  }

  getLinkedinToken(): Observable<TokenModel> {
    return Observable.fromPromise(this.storage.get(this.linkedinTokenKey));
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
      // redirect;
    }
    if (this.isTokenStillValid(token)) {
      return Observable.of(token.access_token);
    }
  }

  private initBrowser() {
    return new InAppBrowser(linkedinConfig.authorizationUrl +
      '?client_id=' + linkedinConfig.client_id +
      '&redirect_uri=' + linkedinConfig.redirect_uri
      + '&response_type=code&access_type=offline', '_blank',
      {
        location: 'no',
        clearcache: 'yes',
        toolbar: 'no'
      });
  }

  isTokenStillValid(token: TokenModel = this.getToken()): boolean {
    return token && token.expires_at && moment(token.expires_at).isAfter(moment());
  }

  private storeToken(res: Response, tokenKey: string): TokenModel {
    const token: TokenModel = res.json();
    token.expires_at = moment().add(token.expires_in, 's').toDate();
    if (!token.user_info) {
      token.user_info = token.access_token;
    }
    this.storage.set(tokenKey, JSON.stringify(token)).then();
    return token;
  }

}
