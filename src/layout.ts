import environment from "environment"
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class Layout {
  private appName: string = environment.app.name

  constructor(private router: Router) {}
}
