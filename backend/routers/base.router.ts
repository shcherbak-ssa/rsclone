import { Router } from "express";

export interface BaseRouter {
  router: Router;
  initRouter(): void;
}
