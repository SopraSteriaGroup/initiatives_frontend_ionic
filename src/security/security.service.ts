import {Injectable} from '@angular/core';
import {User} from './user.model';
import {Observable} from 'rxjs/Observable';
import {App, NavController, Platform} from 'ionic-angular';
import {appConst, linkedinConfig} from '../shared/constants';
import {TokenModel} from './token.model';
import {Storage} from '@ionic/storage';
import * as moment from 'moment';
import {Headers, Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {InAppBrowser} from 'ionic-native';

const jwtDecode = require('jwt-decode');

@Injectable()
export class SecurityService {

  private _currentUser: User;

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


  getCurrentUser(): User {
    return this._currentUser;
  }

  login(): Observable<Response> {
    this.browser = this.initBrowser();
    return this.browser.on('loadstart')
      .mergeMap(event => {
        if ((event.url).startsWith(linkedinConfig.redirect_uri)) {
          return this.findLinkedinAccessToken(this.getRequestToken(event));
        }
        return Observable.empty();
      });
  }

  getRequestToken(event: any) {
    const requestToken = (event.url).split('code=')[1];
    this.browser.close();
    return requestToken;
  }

  findLinkedinAccessToken(requestToken: string): Observable<Response> {
    let headers = new Headers({'Host': 'www.linkedin.com', 'Content-Type': 'application/x-www-form-urlencoded'});
    const options: RequestOptionsArgs = new RequestOptions({headers: headers});
    let body = `grant_type=authorization_code&code=${requestToken}&redirect_uri=${linkedinConfig.redirect_uri}&client_id=${linkedinConfig.client_id}&client_secret=${linkedinConfig.client_secret}`;
    return this.http.post(linkedinConfig.accessTokenUrl, body, options)
      .do(res => this.storeToken(res, this.linkedinTokenKey))
      .map(res => res.json())
      .mergeMap((token) => this.accessToken(token));
  }

  logout() {
    this.storage.remove(this.linkedinTokenKey);
    this.storage.remove(this.tokenKey);
    //TODO Redirect
  }

  accessToken(tokenLinkedin: TokenModel): Observable<Response> {
    let headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'});
    const options: RequestOptionsArgs = new RequestOptions({headers: headers});
    let body = `accessToken=${tokenLinkedin.access_token}`;
    return this.http.post(appConst.urls.baseUri + '/api/authentication/tokens', body, options)
      .do(res => this.storeToken(res, this.tokenKey))
      .map(res => res.json());
  }

  register(email: string): Observable<Response> {
    return this.getLinkedinToken()
      .mergeMap((token: TokenModel) => {
        let headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'});
        const options: RequestOptionsArgs = new RequestOptions({headers: headers});
        let body = `accessToken=${token.access_token}&email=${email}`;
        return this.http.post(appConst.urls.baseUri + '/api/authentication/subscribe', body, options);
      })
      .do(res => {
        this.storeToken(res, this.tokenKey)
      });
  }

  verifyActivationCode(uuid: string): Observable<Response> {
    return this.getToken()
      .mergeMap((token: TokenModel) => {
        let headers = new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token.access_token}`
        });
        const options: RequestOptionsArgs = new RequestOptions({headers: headers,});
        let body = `uuid=${uuid}`;
        return this.http.put(appConst.urls.baseUri + '/api/authentication/activate', body, options);
      });
  }

  getLinkedinToken(): Observable<TokenModel> {
    return Observable.fromPromise(this.storage.get(this.linkedinTokenKey));
  }

  getToken(): Observable<TokenModel> {
    return Observable.fromPromise(this.storage.get(this.tokenKey));
  }

  findAccessTokenOrRedirect(): Observable<string> {
    return Observable.fromPromise(this.storage.get(this.tokenKey)).mergeMap(token =>
      Observable.of(this.isTokenStillValid(token) ? token.access_token : Observable.empty()));
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

  isTokenStillValid(token: TokenModel): boolean {
    return token && token.expires_at && moment(token.expires_at).isAfter(moment());
  }

  private storeToken(res: Response, tokenKey: string): TokenModel {
    const token: TokenModel = res.json();
    token.expires_at = moment().add(token.expires_in, 's').toDate();
    if (!token.user_info) {
      token.user_info = token.access_token;
    }
    this.storage.set(tokenKey, token).then();
    return token;
  }


  private mapUser(userInfo: String): User {
    const plainToken = jwtDecode(userInfo);
    return new User(plainToken.user_name, plainToken.full_name, plainToken.authorities, plainToken.profile_picture, plainToken.emailAddress);
  }

}
