import { Router } from 'express';

export interface BaseRouter {
  initRouter(): Router;
}
