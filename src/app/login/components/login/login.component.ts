import {
  Component,
  OnInit
} from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'login',  // <home></home>
  providers: [],
  styleUrls: [ './login.component.css' ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);

  /**
   * keep form-group just for tracking
   * if all parts are valid all
   */
  public loginForm = new FormGroup({
    email: this.email,
    password : new FormControl('', [Validators.required])
  });

  /**
   * TypeScript public modifiers
   */
  constructor(
    private loginService: LoginService
  ) {}

  public getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  public ngOnInit() {
    console.log('hello `Login` component');
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

  public async onLogin() {
    await this.loginService.doLogin(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
    );
  }
}
