import { Router, Request, Response, NextFunction } from 'express';
import { MatchingProfilesQueries } from '../queries/matchProfiles';

export class MatchingRouter {
  router: Router;
  q = new MatchingProfilesQueries();

  constructor() {
    this.router = Router();
    this.init();
  }

  insertMatchingProfile(req: Request, res: Response, next: NextFunction) {
    return this.q.insertProfile(req.user.id, req.body)
    .then((profile) => {
      res.status(201).json(profile);
    })
    .catch(error => console.log(error));
  }

  getMatchingProfile(req: Request, res: Response, next: NextFunction) {
    return this.q.getProfile(req.params.id)
    .then(profile => res.status(200).json(profile));
  }

  deleteMatchingProfile(req: Request, res: Response, next: NextFunction) {
    return this.q.removeProfile(req.params.id)
    .then(() => res.status(200).send('OK'));
  }

  getKey(req: Request, res: Response, next: NextFunction) {
    return this.q.getKeyValues()
    .then(keyValues => res.status(200).json(keyValues));
  }

  getMyMatchingProfiles(req: Request, res: Response, next: NextFunction) {
    return this.q.getMyProfiles(req.user.id)
    .then(profiles => res.status(200).json(profiles));
  }

  init() {
    this.router.post('/', this.insertMatchingProfile.bind(this));
    this.router.get('/keyValues', this.getKey.bind(this));
    this.router.get('/', this.getMyMatchingProfiles.bind(this));
    this.router.get('/:id', this.getMatchingProfile.bind(this));
    this.router.delete('/:id', this.deleteMatchingProfile.bind(this));
  }

}

export const matchingRouter = new MatchingRouter().router
