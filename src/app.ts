import { autoinject } from "aurelia-framework"
import {Router, RouterConfiguration} from 'aurelia-router'

@autoinject
export class App {
  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Reverie'
    // config.addAuthorizeStep(AuthorizeStep)
    config.mapUnknownRoutes(({ route: 'not-found-page', redirect: '/not-found-page' }))
    // config.map(routes)
    config.options.pushState = true
  }
}
