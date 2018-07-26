import { AuthService } from 'services/auth-service';
import { NavigationInstruction, Next, Redirect, RedirectToRoute } from 'aurelia-router'
import { autoinject } from 'aurelia-framework'

@autoinject
export class AuthorizeStep {
  constructor(private authService: AuthService) {}

  run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
    const isLoggedIn = this.authService.user
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      if (!isLoggedIn) {
        this.authService.targetNavInstruction = navigationInstruction
        return next.cancel(new Redirect('login'))
      }
    }

    if (navigationInstruction.config.name === 'login' && isLoggedIn) {
      return next.cancel(new Redirect('home'))
    }

    return next()
  }
}
