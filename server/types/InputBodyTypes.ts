import { IUserMongo } from './TypesMongoose';

export interface IBodyUser extends IUserMongo {
    _id?: unknown
}

export interface IBodyChangeDataUser extends IUserMongo {
    _id?: unknown
}

export interface IBodyLogin extends IUserMongo {
    username: string,
    password: string,
}