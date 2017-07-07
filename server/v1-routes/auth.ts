import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { Registrant, SecureRequest } from '../interfaces';
import { AuthQuerier } from '../queries/auth';
import {
    BadLogin,
    InsertMemberFailure,
    InvalidParameters,
    MissingParameters,
    UpdatePasswordFailure
} from './errors';
import { lowercaseEmail } from './helpers';
import * as jwt from 'jsonwebtoken';
import * as validator from 'validator';

const passValidator = require('password-validator');

const schema = new passValidator();
schema.is().min(8)
    .is().max(50)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

export class AuthRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    newUser(req: Request, res: Response, next?: NextFunction, q: AuthQuerier = new AuthQuerier()) {
        const user: Registrant = req.body;
        user.memberType = (<number> user.memberType);
        if (!user.email || !user.password || !user.memberType) {
            return res.status(400).json(MissingParameters);
        }
        if (!validator.isEmail(user.email)) {
            return res.status(400).json(InvalidParameters);
        }
        if (!schema.validate(user.password)) {
            return res.status(400).json(InvalidParameters);
        }
        return q.insertNewUser(user)
        .then((id: string) => {
            const authToken = this.makeToken(id, user.memberType);
            res.status(201).send({authToken, memberType: user.memberType});
            return;
        })
        .catch((err: string) => {
            console.error(err);
            return res.status(500).json(InsertMemberFailure);
        });
    }

    login(req: Request, res: Response, next?: NextFunction, q: AuthQuerier = new AuthQuerier()) {
        if (!req.query.email || !req.query.password) {
            res.status(400).json(MissingParameters);
            return;
        }
        if (!validator.isEmail(req.query.email)) {
            return res.status(400).json(InvalidParameters);
        }
        if (!schema.validate(req.query.password)) {
            return res.status(400).json(InvalidParameters);
        }
        const loginDetails = lowercaseEmail(req.query);
        return q.findMemberByEmail(loginDetails.email)
        .then((member: Registrant) => {
            const valid = bcrypt.compareSync(loginDetails.password, member.password);
            if (!valid) {
                return res.status(401).json(BadLogin);
            }
            const authToken = this.makeToken((<string> member.id), member.memberType);
            return res.status(200).send({authToken, memberType: member.memberType});
        })
        .catch((err: string) => {
            console.error(err);
            return res.status(401).json(BadLogin);
        });
    }

    changePassword(req: SecureRequest, res: Response, next?: NextFunction, q: AuthQuerier = new AuthQuerier()) {
        if (!req.body.oldPassword || !req.body.newPassword) {
            return res.status(400).json(MissingParameters);
        }
        return q.findMemberPasswordById(req.user.id)
        .then((password: string) => {
            const valid = bcrypt.compareSync(req.body.oldPassword, password);
            if (!valid) {
                return res.status(401).json(BadLogin);
            }
            return q.updatePassword(req.user.id, req.body.newPassword)
            .then(() => {
                return res.status(204);
            });
        })
        .catch((err: string) => {
            console.error(err);
            return res.status(500).json(UpdatePasswordFailure);
        });
    }

    makeToken(id: string, memberType: number): string {
        const payload = Object.assign({}, {
            id: id,
            memberType: memberType
        });
        const authToken = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'shhhh',
            { expiresIn: '1 day' }
        );
        return authToken;
    }

    init() {
        this.router.post('/', this.newUser.bind(this));
        this.router.get('/', this.login.bind(this));
        this.router.put('/', this.changePassword.bind(this));
    }
}

export const authRouter = new AuthRouter().router;
