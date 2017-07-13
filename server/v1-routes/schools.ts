import { Router, Request, Response, NextFunction } from 'express';
import { School } from '../interfaces'
import { SchoolsQuerier } from '../queries/schools';
import { FindSchoolFailure } from './errors';

export class SchoolsRouter {
  router: Router;
  q = new SchoolsQuerier()

  constructor() {
    this.router = Router();
    this.init();
  }

  updateProfile(req: Request, res: Response, next: NextFunction) {
    return this.q.insertOrUpdateSchool(req.user.id, req.body)
    .then((profile: School) => {
      res.status(201).json(profile);
    })
  }

  getProfile(req: Request, res: Response, next: NextFunction) {
    return this.q.getSchool(req.user.id)
    .then(([profile]: [School]) => {
      if (profile) {
        return res.status(200).json(profile);
      }
      return res.status(404).send(FindSchoolFailure);
    })
    .catch(() => {
      res.status(400).json(FindSchoolFailure)
    })
  }

  init() {
    this.router.post('/me', this.updateProfile.bind(this));
    this.router.put('/me', this.updateProfile.bind(this));
    this.router.patch('/me', this.updateProfile.bind(this));
    this.router.get('/me', this.getProfile.bind(this));
  }

}

export const schoolsRouter = new SchoolsRouter().router
