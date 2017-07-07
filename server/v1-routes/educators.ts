import { Router, Request, Response, NextFunction } from 'express';
import { Educator } from '../interfaces'
import { EducatorsQuerier } from '../queries/educators';
import { FindEducatorFailure } from './errors';

export class EducatorsRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  insertProfile(req: Request, res: Response, next: NextFunction, q: EducatorsQuerier = new EducatorsQuerier()) {
    return q.insertEducator(req.user.id, req.body)
    .then((profile: Educator) => {
      res.status(201).json(profile);
    })
  }

  getProfile(req: Request, res: Response, next: NextFunction, q: EducatorsQuerier = new EducatorsQuerier()) {
    return q.getEducator(req.user.id)
    .then((profile: Educator) => {
      res.status(200).json(profile);
    })
    .catch(() => {
      res.status(400).json(FindEducatorFailure)
    })
  }

  init() {
    this.router.post('/me', this.insertProfile.bind(this));
    this.router.get('/me', this.getProfile.bind(this));
  }

}

export const educatorsRouter = new EducatorsRouter().router
