import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindQuery } from 'src/interfaces/find-query';
import { FindMusicsResponse } from 'src/responses/music.responses';
import { MusicSchema, Music } from 'src/schemas/music.schema';
import { CreateMusicDto } from './dto/create-music.dto';
import { EditMusicDto } from './dto/edit-music.dto';

@Injectable()
export class MusicService {
  constructor(@InjectModel(Music.name) private musicModel: Model<Music>) {}

  async find(queryParams: FindQuery): Promise<FindMusicsResponse> {
    const { perPage, page, title } = queryParams;
    const findRules = {
      title: new RegExp(`.*${title ? title : ''}.*`, 'i'),
    };
    const skip = (page - 1) * perPage;

    const foundMusics = await this.musicModel
      .find(findRules)
      .skip(skip)
      .limit(perPage)
      .exec();
    if (foundMusics.length === 0) {
      throw new NotFoundException(`Cannot find musics with ${title} phrase`);
    }
    const count = await this.musicModel.countDocuments(findRules).exec();
    return {
      musics: foundMusics,
      requiredPages: Math.ceil(count / perPage),
      count,
      page,
    };
  }

  async findOne(id: string): Promise<Music> {
    const foundMusic = await this.musicModel.findById(id).exec();
    if (!foundMusic) {
      throw new NotFoundException(`Cannot find music with ${id} id`);
    }
    return foundMusic;
  }

  async create(music: CreateMusicDto): Promise<Music> {
    try {
      const createdMusic = await this.musicModel.create(music);
      return await createdMusic.save();
    } catch (err) {
      throw new BadRequestException('Cannot create music');
    }
  }

  async delete(id: string): Promise<Music> {
    const musicExist = await this.musicModel.findById(id).exec();
    if (!musicExist) {
      throw new BadRequestException('Cannot find music to delete');
    }
    return await this.musicModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, music: EditMusicDto): Promise<Music> {
    const musicExist = await this.musicModel.findById(id).exec();
    if (!musicExist) {
      throw new NotFoundException('Cannot find music to edit');
    }
    try {
      await this.musicModel.findByIdAndUpdate(id, music).exec();
      const updatedMusic = await this.musicModel.findById(id).exec();
      return updatedMusic;
    } catch (err) {
      throw new BadRequestException('Cannot edit music');
    }
  }
}
