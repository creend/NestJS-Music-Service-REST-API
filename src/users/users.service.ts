import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ValidUser } from '../interfaces/valid-user';
import { User, UserType } from '../schemas/user.schema';
import { EditUserDto } from './dto/edit-user.dto';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import {
  DeleteUserResponse,
  EditUserResponse,
  RegisterResponse,
  FindUserResponse,
} from 'src/responses/users.response';
import { DeleteUserDto } from './dto/delete-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(MailService) private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  filter(user: any): ValidUser {
    const { username, email, userType, createdAt, updatedAt, _id } = user;
    return { username, email, userType, createdAt, updatedAt, id: _id };
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<FindUserResponse> {
    const user: any = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Cannot find user with id ${id}`);
    }
    return this.filter(user);
  }

  async verifyUser(token: string): Promise<string> {
    const { id } = this.jwtService.verify(token);
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('Cannot find user');
    }
    await this.userModel.findByIdAndUpdate(id, { verified: true });
    return 'Succesfuelly verified user';
  }

  async registerUser(user: CreateUserDto): Promise<RegisterResponse> {
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
    const token = this.jwtService.sign({ username, id: createdUser._id });

    await this.mailService.sendMail(
      email,
      'Confirm your registration',
      this.mailService.renederHtml('confirm-registration', { username, token }),
    );
    return this.filter(createdUser);
  }

  async deleteAccount(
    userDto: DeleteUserDto,
    userToDeleteId: string,
    deletingUserId: string,
  ): Promise<DeleteUserResponse> {
    const { password, retypedPassword } = userDto;
    if (password !== retypedPassword) {
      throw new BadRequestException('Passwords are not identical');
    }
    const userToDelete = await this.userModel.findById(userToDeleteId);
    if (!userToDelete) {
      throw new NotFoundException(`Cannot find user with id ${userToDeleteId}`);
    }
    if (userToDeleteId !== deletingUserId) {
      throw new ForbiddenException('You cannot to delete others account');
    }
    if (!(await bcrypt.compare(password, userToDelete.passwordHash))) {
      throw new BadRequestException('Password is incorrect');
    }
    return this.filter(await this.userModel.findByIdAndDelete(userToDeleteId));
  }

  async editAccount(
    userToEditId: string,
    editingUserId: string,
    user: EditUserDto,
  ): Promise<EditUserResponse> {
    const userToEdit = await this.userModel.findById(userToEditId);
    if (!userToEdit) {
      throw new NotFoundException(`Cannot find user with id ${userToEdit}`);
    }
    if (userToEditId !== editingUserId) {
      throw new ForbiddenException('You cannot to edit others account');
    }
    await this.userModel.findByIdAndUpdate(userToEdit, user);
    return this.filter(this.userModel.findById(userToEditId));
  }
}
