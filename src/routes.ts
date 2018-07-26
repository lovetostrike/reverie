import { PLATFORM } from 'aurelia-pal'
import { RouteConfig } from 'aurelia-router';

export const routes: RouteConfig[] = [
  {
    route: [
      '',
      'home'
      ],
    name: 'home',
    moduleId: PLATFORM.moduleName('pages/home-page'),
    nav: true,
    title: 'Home'
  },
  {
    route: ['login', 'signin'],
    moduleId: PLATFORM.moduleName('pages/login-page'),
    nav: true,
    title: 'Login/Signin',
    settings: {
      auth: false
    }
  }
].map(route => ({
  settings: {
    auth: true
  },
  ...route
}))
