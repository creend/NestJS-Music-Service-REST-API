import { HttpStatus } from '@nestjs/common';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';
import { MusicGenre } from '../../src/schemas/music.schema';
import * as request from 'supertest';
const rootUrl = 'http://localhost:8000/api';

describe('POST /musics', () => {
  it('/musics (Valid dto)', () => {
    const data: CreateMusicDto = {
      author: 'Olsza',
      genre: MusicGenre.HipHop,
      length: 140,
      title: 'Psy coś tam',
    };
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtyaW5kbyIsImlkIjoiNjAyMTZjZWE0NTQ1MWIwNjVjYzBjNDdiIiwiaWF0IjoxNjEzOTIyNDU2fQ.__eZoz0YS1UgdZwW28eJfcfvbetUUWFh2yrtyh28BA8';
    return request(rootUrl)
      .post('/musics')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(HttpStatus.CREATED);
  });

  it('/musics (Bad Genre)', () => {
    const data = {
      author: 'Olsza',
      genre: 'essa',
      length: 140,
      title: 'Psy coś tam',
    };
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtyaW5kbyIsImlkIjoiNjAyMTZjZWE0NTQ1MWIwNjVjYzBjNDdiIiwiaWF0IjoxNjEzOTIyNDU2fQ.__eZoz0YS1UgdZwW28eJfcfvbetUUWFh2yrtyh28BA8';
    return request(rootUrl)
      .post('/musics')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/musics (Empty title)', () => {
    const data = {
      author: 'Olsza',
      genre: 'HipHop',
      length: 140,
      title: '',
    };
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtyaW5kbyIsImlkIjoiNjAyMTZjZWE0NTQ1MWIwNjVjYzBjNDdiIiwiaWF0IjoxNjEzOTIyNDU2fQ.__eZoz0YS1UgdZwW28eJfcfvbetUUWFh2yrtyh28BA8';
    return request(rootUrl)
      .post('/musics')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/musics (Empty Auth token)', () => {
    const data = {
      author: 'Olsza',
      genre: 'HipHop',
      length: 140,
      title: 'psy coś tam',
    };

    return request(rootUrl)
      .post('/musics')
      .send(data)
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
