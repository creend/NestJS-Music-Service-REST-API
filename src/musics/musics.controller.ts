import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
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
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import * as path from 'path';
import { FindMusicsResponse } from '../responses/musics.response';
import { CheckIdParamGuard } from '../guards/check-id-param.guard';
import { ParsePagePipe } from '../pipes/parse-page.pipe';
import { Music } from '../schemas/music.schema';
import { CreateMusicDto } from './dto/create-music.dto';
import { EditMusicDto } from './dto/edit-music.dto';
import { MusicsService } from './musics.service';
import { AuthGuard } from '@nestjs/passport';
import { CheckIdUserGuard } from '../guards/check-id-user.guard';
import { UserObj } from '../decorators/user-object.decorator';
import { LoginPayload } from '../interfaces/login-payload';
import {
  CreateMusicResponse,
  FindMusicResponse,
  DeleteMusicResponse,
  EditMusicResponse,
} from 'src/responses/musics.response';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import { ParseSortPipe } from 'src/pipes/parse-sort.pipe';
import { SortTypes } from 'src/interfaces/find-query';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
@Controller('/musics')
// @UseInterceptors(CacheInterceptor)
export class MusicsController {
  constructor(private readonly MusicsService: MusicsService) {}

  @Get('/')
  // @CacheKey('musics')
  // @CacheTTL(100)
  @HttpCode(HttpStatus.OK)
  async find(
    @Query('page', new ParsePagePipe(1)) page: number,
    @Query('per_page', new ParsePagePipe(2, 10)) perPage: number,
    @Query('sort', new ParseSortPipe(SortTypes.DESCENDING)) sort: SortTypes,
    @Query('title') title: string,
  ): Promise<FindMusicsResponse> {
    return await this.MusicsService.find({
      page,
      perPage,
      title,
      sort,
    });
  }

  @Get('/:id')
  @UseGuards(CheckIdParamGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<FindMusicResponse> {
    return await this.MusicsService.findOne(id);
  }

  @Get('/file/:id')
  @UseGuards(CheckIdParamGuard)
  @HttpCode(HttpStatus.OK)
  async findMusicFile(@Param('id') id: string, @Res() res: any): Promise<any> {
    return await this.MusicsService.findMusicFile(id, res);
  }

  @Get('/users/:id')
  @UseGuards(CheckIdParamGuard)
  @HttpCode(HttpStatus.OK)
  async findUsersMusics(
    @Param('id') id: string,
    @Query('page', new ParsePagePipe(1)) page: number,
    @Query('per_page', new ParsePagePipe(2, 10)) perPage: number,
    @Query('sort', new ParseSortPipe(SortTypes.ASCENDING)) sort: SortTypes,
    @Query('title') title: string,
  ): Promise<FindMusicsResponse> {
    return await this.MusicsService.find({ page, perPage, title, sort }, id);
  }
  @Get('/users/username/:username')
  @HttpCode(HttpStatus.OK)
  async findUsersMusicsByUsername(
    @Param('username') username: string,
    @Query('page', new ParsePagePipe(1)) page: number,
    @Query('per_page', new ParsePagePipe(2, 10)) perPage: number,
    @Query('sort', new ParseSortPipe(SortTypes.ASCENDING)) sort: SortTypes,
    @Query('title') title: string,
  ): Promise<FindMusicsResponse> {
    return await this.MusicsService.find(
      { page, perPage, title, sort },
      undefined,
      username,
    );
  }

  @Post('/')
  @UseGuards(JwtAuthGuard, CheckIdUserGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'musicFile',
          maxCount: 1,
        },
      ],
      { storage: multerStorage(path.join(storageDir(), 'musics'), 'mp3') },
    ),
  )
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() music: CreateMusicDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
    @UserObj() user: LoginPayload,
  ): Promise<CreateMusicResponse> {
    return await this.MusicsService.create(
      music,
      user.id,
      user.username,
      files,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), CheckIdParamGuard, CheckIdUserGuard)
  @HttpCode(200)
  async delete(
    @Param('id') id: string,
    @UserObj() user: LoginPayload,
  ): Promise<DeleteMusicResponse> {
    return await this.MusicsService.delete(id, user.id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), CheckIdParamGuard, CheckIdUserGuard)
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() music: EditMusicDto,
    @UserObj() user: LoginPayload,
  ): Promise<EditMusicResponse> {
    return await this.MusicsService.update(id, music, user.id);
  }
}
