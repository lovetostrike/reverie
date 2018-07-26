import { AuthService } from 'services/auth-service';
import { autoinject } from "aurelia-framework";

@autoinject
export class LoginContainer {
  constructor(private authService: AuthService) {}

  attached() {
    this.authService.renderForm()  
  }
}
