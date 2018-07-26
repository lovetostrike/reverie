export default {
  app: {
    name: 'Reverie'
  },
  debug: false,
  testing: false,
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Fpse1x3ur",
    APP_CLIENT_ID: "5ijk8k1jjb6homiiqae1lskqrs",
    IDENTITY_POOL_ID: "us-east-1:201580ad-7ab7-470b-ae3a-58e84287afcc"
  },
  oauth: {
    domain: 'reverie-dev.auth.us-east-1.amazoncognito.com',
    scope: ['email'],
    redirectSignIn: 'https://localhost:8080/login',
    redirectSignOut: 'https://localhost:8080/login',
    // 'code' for Authorization code grant, 
    // 'token' for Implicit grant
    responseType: 'code'
  }
}
