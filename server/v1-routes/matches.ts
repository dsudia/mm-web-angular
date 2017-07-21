import { Router, Request, Response, NextFunction } from 'express';
import { SchoolMatchingProfilesQueries } from '../queries/schoolMatchProfiles';

export class SchoolsMatchingRouter {
  router: Router;
  q = new SchoolMatchingProfilesQueries();

  constructor() {
    this.router = Router();
    this.init();
  }

  insertSchoolMatchingProfile(req: Request, res: Response, next: NextFunction) {
    return this.q.insertProfile(req.user.id, req.body)
    .then((profile) => {
      res.status(201).json(profile);
    })
    .catch(error => console.log(error));
  }

  getSchoolMatchingProfile(req: Request, res: Response, next: NextFunction) {
    return this.q.getProfile(req.params.id)
    .then(profile => res.status(200).json(profile));
  }

  init() {
    this.router.post('/', this.insertSchoolMatchingProfile.bind(this));
    this.router.get('/:id', this.getSchoolMatchingProfile.bind(this));
  }

}

export const schoolsMatchingRouter = new SchoolsMatchingRouter().router
