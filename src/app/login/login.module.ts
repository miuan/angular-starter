import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  HttpModule,
  Http,
  XHRBackend,
  Headers,
  Response,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs
} from '@angular/http';

import { ConfigService } from './services/config.service';
import { AuthHttpService } from './services/auth.http.service';
import { LoginService } from './services/login.service';

import { routes } from './login.routes';
import { LoaderComponent } from './components/loader';
import { LoginComponent } from './components/login';
import { SignUpComponent } from './components/signup';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    LoaderComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    RouterModule.forChild(routes),
  ],
  providers : [
    ConfigService,
    AuthHttpService,
    LoginService,
  ]
})
export class LoginModule {
  public static routes = routes;
}
