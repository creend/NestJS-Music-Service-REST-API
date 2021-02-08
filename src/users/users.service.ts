import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ValidUser } from 'src/interfaces/valid-user';
import { User, UserType } from 'src/schemas/user.schema';
import { Music } from 'src/schemas/music.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Music.name) private musicModel: Model<Music>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<ValidUser> {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException(`Cannot find user with id ${id}`);
    }
    return {
      username: user.username,
      userType: user.userType,
      email: user.email,
    };
  }

  async findUsersMusics(id: string): Promise<Music[]> {
    const musics = await this.musicModel
      .find({
        userId: (id as unknown) as mongoose.Schema.Types.ObjectId,
      })
      .exec();
    if (!musics.length) {
      throw new BadRequestException('This user hasnt musics');
    }
    return musics;
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
