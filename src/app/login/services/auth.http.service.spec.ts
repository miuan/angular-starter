import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend,
  RequestMethod
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LoginService } from './login.service';
import { ConfigService } from './config.service';
import { AuthHttpService } from './auth.http.service';

describe('AuthService', () => {

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

  describe('Use refesh token', () => {
    it('Refresh token after is expired',
      // tslint:disable-next-line:max-line-length
      inject([LoginService, ConfigService, XHRBackend, AuthHttpService], async (loginService, configService, mockBackend, authHttpService) => {

        const mockResponse = {
          userId: 'userId',
          token: 'token',
          refreshToken: 'refreshToken'
        };

        mockBackend.connections.subscribe((connection) => {
          // tslint:disable-next-line:max-line-length
          if (connection.request.url.endsWith('/api/login') && connection.request.method === RequestMethod.Post) {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })));
            return;
          }

          if (connection.request.url.endsWith('/api/user/current')) {
            if (configService.token === 'token1') {
              connection.mockError(new Error('Token already expired'));
              return ;
            }

            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify({
                userId: mockResponse.userId,
                fullname: 'Frank Sinatra'
              })
            })));
          }
        });

        const loginInfo = await loginService.doLogin('test@example.com', 'test');
        const userInfo = await authHttpService.get('/api/user/current');
        console.log(userInfo);
      })
    );
  });
});
