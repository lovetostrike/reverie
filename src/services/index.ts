import { FrameworkConfiguration } from 'aurelia-framework'
import Amplify from 'aws-amplify'

export function configure(config: FrameworkConfiguration, options: any) {
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: options.cognito.REGION,
      userPoolId: options.cognito.USER_POOL_ID,
      identityPoolId: options.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: options.cognito.APP_CLIENT_ID
    },
    Analytics: {
      disabled: true
    }
  })
}
