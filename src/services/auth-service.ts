import { Router, NavigationInstruction } from 'aurelia-router'
import { Auth } from 'aws-amplify'
import { User } from 'aws-sdk/clients/iam'
import { inject, autoinject } from 'aurelia-framework'

@autoinject
export class AuthService {
  _user: User
  _isSigningIn: boolean = false
  _isSigningOut: boolean = false
  targetNavInstruction: NavigationInstruction

  constructor(private router: Router) {
    this._user = null
    Auth.currentAuthenticatedUser().then(user => { this._user = user })
      .catch(e => console.error())
  }

  async signIn(username: string, password: string, successCallback: Function = () => { }, errorCallback: Function = () => { }): Promise<void> {
    this._isSigningIn = true
    try {
      this._user = await Auth.signIn(username, password)
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
      successCallback(this._user)
    } catch (e) {
      errorCallback(e)
    } finally {
      this._isSigningIn = false
    }
  }

  async signOut(successCallback: Function = () => { }, errorCallback: Function = () => { }) {
    this._isSigningOut = true
    try {
      await Auth.signOut()
      this._user = null
      successCallback()
    } catch (e) {
      console.error(e.message)
    } finally {
      this._isSigningOut = false
    }
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
