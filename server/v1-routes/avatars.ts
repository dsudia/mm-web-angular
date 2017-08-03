import { Router, Response, Request, NextFunction } from 'express';
import * as aws from 'aws-sdk';

export class AvatarsRouter {
  router: Router;
  s3: aws.S3;
  S3_BUCKET = 'mm-profile-pictures';

  constructor() {
    this.s3 = new aws.S3({
      signatureVersion: 'v4'
    });
    this.router = Router();
    this.init();
  }

  sign(req: Request, res: Response, next: NextFunction) {
    const options = {
      Bucket: this.S3_BUCKET,
      Key: `${req.user.id}.png`,
      Expires: 60,
      ContentType: 'image/png',
      ACL: 'public-read'
    };

    const self = this;

    this.s3.getSignedUrl('putObject', options, function(err, data) {
      if (err) {
        return res.send('Error with S3');
      }

      return res.json({
        fileName: `${req.user.id}.png`,
        signedRequest: data,
        url: `https://s3.amazonaws.com/${self.S3_BUCKET}/${req.user.id}.png`,
      })
    })
  }

  init() {
    this.router.get('/sign', this.sign.bind(this));
  }
}

export const avatarsRouter = new AvatarsRouter().router;
