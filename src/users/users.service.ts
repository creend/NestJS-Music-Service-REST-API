import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User, UserType } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findOne(email: string): Promise<User> {
    // const user = this.userModel.findOne({ email });
    // if (!user) {
    //   throw new NotFoundException('User is not found');
    // }
    // return user;
    return this.userModel.findOne({ email });
  }
  async registerUser(user: CreateUserDto): Promise<User> {
    const { username, email, password, retypedPassword } = user;
    const emailExist = await this.userModel.findOne({ email }).exec();
    const usernameExist = await this.userModel.findOne({ username }).exec();

    if (password !== retypedPassword) {
      throw new BadRequestException('Passwords are not identical');
    }

    if (emailExist) {
      throw new BadRequestException('Account with this email alredy exist');
    }
    if (usernameExist) {
      throw new BadRequestException('Account with this username alredy exist');
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const createdUser = await this.userModel.create({
      username,
      userType: UserType.Normal,
      passwordHash,
      email,
    });
    await createdUser.save();
    return createdUser;
  }
}
