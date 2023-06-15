import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) { }

  // fetch all Users
  async getAllUser(): Promise<User[]> {
    const Users = await this.UserModel.find().exec();
    return Users;
  }

  // Get a single User
  async getUser(email): Promise<User> {
    const User = await this.UserModel.findOne({ email }).exec();
    return User;
  }

  // post a single User
  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = new this.UserModel(createUserDTO);
    return newUser.save();
  }

  // Edit User details
  async updateOrUserByEmailOrCreate(
    email,
    createUserDTO: CreateUserDTO,
  ): Promise<User> {
    const updatedUser = await this.UserModel.findOneAndUpdate(
      { email: email },
      createUserDTO,
      { new: true, upsert: true },
    );
    return updatedUser;
  }

  // Delete a User
  async deleteUser(UserID): Promise<any> {
    const deletedUser = await this.UserModel.findByIdAndRemove(UserID);
    return deletedUser;
  }
}
