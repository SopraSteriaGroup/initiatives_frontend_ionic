import {Headers, Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {SecurityService} from './security.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/empty';

@Injectable()
export class AuthHttp {

  constructor(private securityService: SecurityService, private http: Http) {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.securityService.findAccessTokenOrRedirect()
      .mergeMap(token => this.http.get(url, this.addTokenToHeaders(token, options)));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.securityService.findAccessTokenOrRedirect()
      .mergeMap(token => this.http.post(url, body, this.addApplicationJsonContent(this.addTokenToHeaders(token, options))));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.securityService.findAccessTokenOrRedirect()
      .mergeMap(token => this.http.put(url, body, this.addApplicationJsonContent(this.addTokenToHeaders(token, options))));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.securityService.findAccessTokenOrRedirect()
      .mergeMap(token => this.http.delete(url, this.addTokenToHeaders(token, options)));
  }

  private addTokenToHeaders(accessToken, options: RequestOptionsArgs = new RequestOptions()): RequestOptionsArgs {
    if (!options.headers) {
      options.headers = new Headers();
    }
    options.headers.append('Authorization', `Bearer ${accessToken}`);
    return options;
  }

  private addApplicationJsonContent(options: RequestOptionsArgs = new RequestOptions()) {
    if (!options.headers) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    return options;
  }

}
