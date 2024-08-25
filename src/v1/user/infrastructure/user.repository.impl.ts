import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';
import { UserDocument } from './user.schema';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async save(user: User): Promise<User> {
    const userDoc = new this.userModel(user);
    const result = await userDoc.save();
    return new User(
      result._id,
      result.username,
      result.password,
      result.todoLists,
    );
  }

  async findById(id: string): Promise<User> {
    const result = await this.userModel.findById(id).exec();
    if (!result) throw NotFoundException;
    return new User(
      result._id,
      result.username,
      result.password,
      result.todoLists,
    );
  }

  async findByUsername(username: string): Promise<User> {
    const result = await this.userModel.findOne({ username }).exec();
    if (!result) throw NotFoundException;
    return new User(
      result._id,
      result.username,
      result.password,
      result.todoLists,
    );
  }
}
