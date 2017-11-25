import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { LoginService } from '../../services/login.service';

const MatchPasswordValidator = (passwordControl: AbstractControl): ValidatorFn => {
  return (confirmPasswordControl: AbstractControl): {[key: string]: any} => {
    return passwordControl.value !== confirmPasswordControl.value ? {matchError: true} : null;
  };
};

const PasswordHaveAllRules = (passwordControl: AbstractControl) => {
  let ruleError = null;

  let password = passwordControl.value;

  if (password.length < 5) {
    if (!ruleError) {
      ruleError = {mustContain: ''};
    }

    ruleError.mustContain += 'Password must be longer than 4 letters. ';
  }

  if (!password.match(/\d/)) {
    if (!ruleError) {
      ruleError = {mustContain: ''};
    }

    ruleError.mustContain += 'Password must contain at least one number. ';
  }

  if (!password.match(/[a-z]/)) {
    if (!ruleError) {
      ruleError = {mustContain: ''};
    }

    ruleError.mustContain += 'Password must contain at least one letter lower case. ';
  }

  if (!password.match(/[A-Z]/)) {
    if (!ruleError) {
      ruleError = {mustContain: ''};
    }

    ruleError.mustContain += 'Password must contain at least one letter upper case. ';
  }

  if (password.match(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/)) {
    if (!ruleError) {
      ruleError = {mustContain: ''};
    }

    // tslint:disable-next-line:max-line-length
    ruleError.mustContain += 'Password have not allowed character, supported characters:!@#$%*\_+.,;:';
  }

  return ruleError;
};

const PasswordsAreEqual = (group: FormGroup) : any => {
  const password = group.controls.password;
  const confirmPassword = group.controls.confirmPassword;
  let matchError = null;

  if (password.value !== confirmPassword.value) {
    matchError = {};
    if (confirmPassword.dirty) {
      matchError = {
        matchError: true
      };
    }
  }

  confirmPassword.setErrors(matchError);
  return matchError;
};

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'signup',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './signup.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, PasswordHaveAllRules]);
  public confirmPassword = new FormControl('', [Validators.required]);

  public passwords = new FormGroup({
    password : this.password,
    confirmPassword: this.confirmPassword
  }, PasswordsAreEqual);

  /**
   * keep form-group just for tracking
   * if all parts are valid all
   */
  public loginForm = new FormGroup({
    email: this.email,
    passwords: this.passwords
  });
  /**
   * TypeScript public modifiers
   */
  // tslint:disable-next-line:no-empty
  constructor(private loginService: LoginService) {}

  public ngOnInit() {
    console.log('hello `SignUp` component');
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

  public getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  public getPasswordErrorMessage() {

    const errorMessage =  this.password.hasError('required') ? 'You must enter a value' :
    this.password.hasError('mustContain') ? this.password.errors.mustContain :
        '';
    console.log(this.password.errors, errorMessage);
    return errorMessage;
  }

  public getConfirmPasswordErrorMessage() {

    const errorMessage =  this.confirmPassword.hasError('required') ? 'You must enter a value' :
    this.passwords.hasError('matchError') ? 'The passwords are not matching' :
        '';
    // console.log(this.passwords.errors, this.confirmPassword.errors, errorMessage);
    return errorMessage;
  }

  public async onSignUp() {
    await this.loginService.doSignUp('', '');
  }

}
