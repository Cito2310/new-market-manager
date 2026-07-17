import { Types } from 'mongoose';
import { IUserMongo } from './TypesMongoose';

export interface IUser extends IUserMongo {
    _id: Types.ObjectId
}