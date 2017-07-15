import { Router, Request, Response, NextFunction } from 'express';
import { Educator } from '../interfaces'
import { EducatorsQuerier } from '../queries/educators';
import { FindEducatorFailure } from './errors';

export class EducatorsRouter {
  router: Router;
  q = new EducatorsQuerier();

  constructor() {
    this.router = Router();
    this.init();
  }

  updateProfile(req: Request, res: Response, next: NextFunction) {
    return this.q.insertOrUpdateEducator(req.user.id, req.body)
    .then((profile: Educator) => {
      res.status(201).json(profile);
    })
  }

  getProfile(req: Request, res: Response, next: NextFunction) {
    return this.q.getEducator(req.user.id)
    .then(([profile]: [Educator]) => {
      if (profile) {
        return res.status(200).json(profile);
      }
      return res.status(404).send(FindEducatorFailure);
    })
    .catch(() => {
      res.status(400).json(FindEducatorFailure)
    })
  }

  init() {
    this.router.post('/me', this.updateProfile.bind(this));
    this.router.put('/me', this.updateProfile.bind(this));
    this.router.patch('/me', this.updateProfile.bind(this));
    this.router.get('/me', this.getProfile.bind(this));
  }

}

export const educatorsRouter = new EducatorsRouter().router;
