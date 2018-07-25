import { PLATFORM } from 'aurelia-pal'

export const routes: any[] = [
  {
    route: [
      '',
      'home'
      ],
    name: 'home',
    moduleId: PLATFORM.moduleName('pages/home-page'),
    nav: true,
    title: 'Home',
    settings: {
      auth: true
    }
  }
]
