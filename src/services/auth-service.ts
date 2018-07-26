import { Router, NavigationInstruction } from 'aurelia-router'
import Amplify, { Auth } from 'aws-amplify'
import { User } from 'aws-sdk/clients/iam'
import { inject, autoinject, FrameworkConfiguration } from 'aurelia-framework'

let authUrl;

export function configure(config: FrameworkConfiguration, options: any) {
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: options.cognito.REGION,
      userPoolId: options.cognito.USER_POOL_ID,
      identityPoolId: options.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: options.cognito.APP_CLIENT_ID,
      oauth: options.oauth
    },
    Analytics: {
      disabled: true
    }
  })
  const {
    domain,
    redirectSignIn,
    redirectSignOut,
    responseType
  } = options.oauth
  const clientId = options.cognito.APP_CLIENT_ID
  authUrl = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId 
}

@autoinject
export class AuthService {
  _user: User
  _isSigningIn: boolean = false
  _isSigningOut: boolean = false
  targetNavInstruction: NavigationInstruction

  constructor(private router: Router) {
    this._user = null
    Auth.currentAuthenticatedUser().then(user => {
      this._user = user
      if (this.targetNavInstruction) {
        const targetUrl = this.targetNavInstruction.router.generate(
          this.targetNavInstruction.config.name,
          Object.assign(this.targetNavInstruction.params, this.targetNavInstruction.queryParams),
          { replace: true }
        )
        this.targetNavInstruction = null
        this.router.navigate(targetUrl)
      } else {
        this.router.navigateToRoute('home')
      }
    })
      .catch(e => console.error())
  }

  renderForm() {
    Auth.currentAuthenticatedUser().then(user => {
      if (!user) {
        window.location.assign(authUrl)
      } else {
        this.router.navigateToRoute('home')
      }  
    })
  }

  get user(): User {
    return this._user
  }

  get isSigningIn(): boolean {
    return this._isSigningIn
  }

  get isSigningOut(): boolean {
    return this._isSigningOut
  }
}
