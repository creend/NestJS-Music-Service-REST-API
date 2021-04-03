import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindQuery } from '../interfaces/find-query';
import {
  CreateMusicResponse,
  DeleteMusicResponse,
  FindMusicResponse,
  EditMusicResponse,
  FindMusicsResponse,
} from '../responses/musics.response';
import { MusicSchema, Music } from '../schemas/music.schema';
import { CreateMusicDto } from './dto/create-music.dto';
import { EditMusicDto } from './dto/edit-music.dto';
import { FindRules } from '../interfaces/find-rules';
import { MailService } from '../mail/mail.service';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import { storageDir } from '../utils/storage';
import { validate } from 'class-validator';
import { MusicInterface } from '../interfaces/music';
import { UsersService } from 'src/users/users.service';
import { FindUserBy } from 'src/enums/find-user-by';
import { Cache } from 'cache-manager';
@Injectable()
export class MusicsService {
  constructor(
    @InjectModel(Music.name) private musicModel: Model<Music>,
    // @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
    private readonly mailSercice: MailService,
    private readonly usersService: UsersService,
  ) {}

  filter(music: any): MusicInterface {
    const {
      title,
      length,
      author,
      genre,
      _id,
      username,
      userId,
      createdAt,
      updatedAt,
    } = music;
    return {
      title,
      length,
      author,
      genre,
      _id,
      userId,
      createdAt,
      updatedAt,
      username,
    };
  }

  async find(
    queryParams: FindQuery,
    userId?: string,
    username?: string,
  ): Promise<FindMusicsResponse> {
    const { perPage, page, title, sort } = queryParams;
    const findRules: FindRules = {
      title: new RegExp(`.*${title ? title : ''}.*`, 'i'),
    };
    if (userId) {
      findRules.userId = (userId as unknown) as mongoose.Schema.Types.ObjectId;
    }
    if (username) {
      findRules.username = username;
    }
    const skip = (page - 1) * perPage;

    const foundMusics = await this.musicModel
      .find(findRules)
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: sort })
      .exec();
    if (foundMusics.length === 0) {
      throw new NotFoundException(`Cannot find musics`);
    }
    const count = await this.musicModel.countDocuments(findRules).exec();

    return {
      musics: foundMusics.map((music: Music) => this.filter(music)),
      requiredPages: Math.ceil(count / perPage),
      count,
      page,
    };
  }

  async findOne(id: string): Promise<FindMusicResponse> {
    const foundMusic = await this.musicModel.findById(id).exec();
    if (!foundMusic) {
      throw new NotFoundException(`Cannot find music with ${id} id`);
    }
    return this.filter(foundMusic);
  }

  async findMusicFile(id: string, res: any): Promise<any> {
    const music = await this.musicModel.findById(id);
    if (!music) {
      throw new NotFoundException('Cannot find music');
    }
    if (!music.musicFileName) {
      throw new NotFoundException('This music hasnt mp3');
    }
    res.sendFile(music.musicFileName, {
      root: path.join(storageDir(), 'musics'),
    });
  }

  async create(
    music: CreateMusicDto,
    userId: string,
    username: string,
    files: MulterDiskUploadedFiles,
  ): Promise<CreateMusicResponse> {
    const mp3 = files?.musicFile?.[0] ?? null;
    if (!mp3) {
      throw new BadRequestException('Music file is not given');
    }
    try {
      const createdMusic = await this.musicModel.create({
        ...music,
        userId,
        username,
        musicFileName: mp3?.filename,
      });
      return this.filter(await createdMusic.save());
    } catch (error) {
      if (mp3) {
        fs.unlink(path.join(storageDir(), 'musics', mp3.filename), (err) => {
          throw err;
        });
      }
      throw error;
    }
  }

  async delete(
    id: string,
    deletingUserId: string,
  ): Promise<DeleteMusicResponse> {
    const music = await this.musicModel.findById(id).exec();
    if (!music) {
      throw new BadRequestException('Cannot find music to delete');
    }
    if (
      music.userId !=
      ((deletingUserId as unknown) as mongoose.Schema.Types.ObjectId)
    ) {
      throw new ForbiddenException(`You cannot delete other user's music`);
    }
    if (music.musicFileName) {
      this.deleteMusicFile(music.musicFileName);
    }
    return this.filter(await this.musicModel.findByIdAndDelete(id).exec());
  }

  async deleteMusicFile(filename: string) {
    fs.unlink(path.resolve(storageDir(), 'musics', filename), (err) => {
      if (err) {
        throw new InternalServerErrorException(err.message);
      }
    });
  }

  async update(
    id: string,
    music: EditMusicDto,
    editingUserId: string,
  ): Promise<EditMusicResponse> {
    const foundMusic = await this.musicModel.findById(id).exec();
    if (!foundMusic) {
      throw new NotFoundException('Cannot find music to edit');
    }
    if (
      foundMusic.userId !=
      ((editingUserId as unknown) as mongoose.Schema.Types.ObjectId)
    ) {
      throw new ForbiddenException(`You cannot edit other user's music`);
    }
    await this.musicModel.findByIdAndUpdate(id, music).exec();
    const updatedMusic = await this.musicModel.findById(id).exec();
    return this.filter(updatedMusic);
  }
}
