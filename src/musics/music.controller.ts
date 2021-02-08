import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FindMusicsResponse } from 'src/interfaces/music';
import { CheckIdParamGuard } from '../guards/check-id-param.guard';
import { ParsePagePipe } from 'src/pipes/parse-page.pipe';
import { Music } from 'src/schemas/music.schema';
import { CreateMusicDto } from './dto/create-music.dto';
import { EditMusicDto } from './dto/edit-music.dto';
import { MusicService } from './musics.service';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'express';
import { CheckIdUserGuard } from 'src/guards/check-id-user.guard';

@Controller('/musics')
export class MusicController {
  constructor(@Inject(MusicService) private musicService: MusicService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async find(
    @Query('page', new ParsePagePipe(1)) page: number,
    @Query('per_page', new ParsePagePipe(2)) perPage: number,
    @Query('title') title: string,
  ): Promise<FindMusicsResponse> {
    return await this.musicService.find({
      page,
      perPage,
      title,
    });
  }

  @Get('/:id')
  @UseGuards(CheckIdParamGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Music> {
    return await this.musicService.findOne(id);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), CheckIdUserGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() music: CreateMusicDto, @Req() request): Promise<Music> {
    return await this.musicService.create(music, request.user.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), CheckIdParamGuard)
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<Music> {
    return await this.musicService.delete(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), CheckIdParamGuard)
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() music: EditMusicDto,
  ): Promise<Music> {
    return await this.musicService.update(id, music);
  }
}
