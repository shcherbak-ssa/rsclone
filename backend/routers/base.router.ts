import { Router } from "express";

export interface BaseRouter {
  router: Router;
  pathRegExp?: RegExp;
  initRouter(): void;
}
