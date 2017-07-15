import { Router, Response, NextFunction } from 'express';
import * as S3 from 'aws-sdk/clients/s3';
const fileup: any = require('express-fileupload');
import { Educator, School, UploadRequest } from '../interfaces'
import { InvalidToken, S3Error } from './errors';
import { EducatorsQuerier } from '../queries/educators';
import { SchoolsQuerier } from '../queries/schools';

export class AvatarsRouter {
  router: Router;
  eq = new EducatorsQuerier();
  sq = new SchoolsQuerier();
  s3 = new S3();

  constructor() {
    this.router = Router();
    this.init();
  }

  addAvatar(req: UploadRequest, res: Response, next: NextFunction, eq = this.eq, sq = this.sq) {
    console.log(req.files);
    if (!req.files || !req.files.avatar) {
      return res.status(400).send('No files were uploaded.');
    }
    const time = new Date().getTime();
    const params = {
      Body: req.files.avatar.data,
      ACL: 'public-read',
      Bucket: 'montessori-match-profile-pictures',
      Key: `${req.user.id}.png`,
      ServerSideEncryption: 'AES256',
      Tagging: `dateCreated=${time}&memberId=${req.user.id}`
    };

    return this.s3.putObject(params).promise()
    .then(() => {
      const avatarUrl = `https://s3.amazonaws.com/montessori-match-profile-pictures/${req.user.id}.jpeg`;
      if (Number(req.user.memberType) === 1) {
        return eq.insertAvatarUrl(req.user.id, avatarUrl)
        .then((profile: Educator) => {
          return res.status(201).json(profile)
        })
      } else if (Number(req.user.memberType) === 2) {
        return sq.insertAvatarUrl(req.user.id, avatarUrl)
        .then((profile: School) => {
          return res.status(201).json(profile)
        })
      } else {
        return res.status(400).json(InvalidToken)
      }
    })
      .catch(error => {
        console.log(error);
        return res.status(200).json(S3Error);
      });
  }

  init() {
    this.router.post('/', fileup(), this.addAvatar.bind(this))
  }
}

export const avatarsRouter = new AvatarsRouter().router;
