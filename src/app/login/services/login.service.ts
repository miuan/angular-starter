import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  Response,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs } from '@angular/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { LoaderM } from '../components/loader/';

@Injectable()
export class LoginService {
  constructor(private _configService: ConfigService, private _http: Http) {
  }

  public async doLogin(email: string, password: string) {
    try {
        const userInfoRes = await this._http.post('/api/login', {email, password}).toPromise();
        const userInfo = userInfoRes.json();

        this._configService.login(userInfo.token, userInfo.refreshToken);
    } catch (ex) {
      console.log(ex);
    }
  }

  public async doSignUp(email: string, password: string) {
    try {
        const userInfoRes = await this._http.post('/api/signup', {email, password}).toPromise();
        const userInfo = userInfoRes.json();

        this._configService.login(userInfo.token, userInfo.refreshToken);
    } catch (ex) {
      console.log(ex);
    }
  }

}
