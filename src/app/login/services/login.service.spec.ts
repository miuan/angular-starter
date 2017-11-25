import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LoginService } from './login.service';
import { ConfigService } from './config.service';
import { AuthHttpService } from './auth.http.service';

describe('LoginService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
       // { provide: VIMEO_API_URL, useValue: 'http://example.com' },
        ConfigService,
        AuthHttpService,
        LoginService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('login()', () => {

    it('login will register token in config service',
        // tslint:disable-next-line:max-line-length
        inject([LoginService, ConfigService, XHRBackend], async (loginService, configService, mockBackend) => {

        const mockResponse = {
          userId: 'userId',
          token: 'token',
          refreshToken: 'refreshToken'
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        const loginInfo = await loginService.doLogin('test@example.com', 'test');
        console.log(loginInfo);
        expect(configService.token).toEqual('token');
        expect(configService.refreshToken).toEqual('refreshToken');
    }));

    it('SigUp will register token in config service',
      // tslint:disable-next-line:max-line-length
      inject([LoginService, ConfigService, XHRBackend], async (loginService, configService, mockBackend) => {

      const mockResponse = {
        userId: 'userId',
        token: 'token',
        refreshToken: 'refreshToken'
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      const loginInfo = await loginService.doSignUp('test@example.com', 'test');
      console.log(loginInfo);
      expect(configService.token).toEqual('token');
      expect(configService.refreshToken).toEqual('refreshToken');
  }));
  });
});
