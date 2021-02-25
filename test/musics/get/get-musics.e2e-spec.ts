import { HttpStatus } from '@nestjs/common';
import { ErrorResponse } from 'src/responses/error.response';
import {
  FindMusicResponse,
  FindMusicsResponse,
} from 'src/responses/musics.response';
import * as request from 'supertest';
import {
  errorCb,
  findMusicCb,
  findMusicsAscendingCb,
  findMusicsCb,
} from './get-musics-cbs';
const rootUrl = 'http://localhost:8000/api';

describe('GET /musics', () => {
  it('/musics (OK)', () => {
    return request(rootUrl)
      .get('/musics')
      .expect(HttpStatus.OK)
      .expect(findMusicsCb);
  });

  it('/musics?sort=asc (OK)', () => {
    return request(rootUrl)
      .get('/musics?sort=asc')
      .expect(HttpStatus.OK)
      .expect(findMusicsAscendingCb);
  });

  it('/musics?title=cafe (OK)', () => {
    return request(rootUrl)
      .get('/musics?title=cafe')
      .expect(HttpStatus.OK)
      .expect(findMusicsCb);
  });

  it('/musics?page=5 (Page doesnt have musics)', () => {
    return request(rootUrl)
      .get('/musics?page=5')
      .expect(HttpStatus.NOT_FOUND)
      .expect(errorCb);
  });

  it('/musics?page=1&per_page=3 (OK)', () => {
    return request(rootUrl)
      .get('/musics?page=1&per_page=3')
      .expect(HttpStatus.OK)
      .expect(findMusicsCb);
  });

  it('/musics?per_page=11 (per_page cannot be bigger than 10)', () => {
    return request(rootUrl)
      .get('/musics?per_page=11')
      .expect(HttpStatus.BAD_REQUEST)
      .expect(errorCb);
  });

  it('/musics?page=0&per_page=-2 (Auto change -2 to 1)', () => {
    return request(rootUrl)
      .get('/musics?page=0&per_page=-2')
      .expect(HttpStatus.OK)
      .expect(findMusicsCb);
  });

  it('/musics?page=3&per_page=1 (OK)', () => {
    return request(rootUrl)
      .get('/musics?page=3&per_page=1')
      .expect(HttpStatus.OK)
      .expect(findMusicsCb);
  });
});

describe('GET /musics/:id', () => {
  it('/musics/:id (Correct ID)', () => {
    return request(rootUrl)
      .get('/musics/603124831f807e26d81a4b5e')
      .expect(HttpStatus.OK)
      .expect(findMusicCb);
  });
  it('/musics/:id (Bad ID)', () => {
    return request(rootUrl)
      .get('/musics/603124831f807e26d81a4b5e3')
      .expect(HttpStatus.BAD_REQUEST)
      .expect(errorCb);
  });

  it('/musics/:id (Not found music)', () => {
    return request(rootUrl)
      .get('/musics/603124831f807e26d81a4b5f')
      .expect(HttpStatus.NOT_FOUND)
      .expect(errorCb);
  });
});

describe('GET /musics/users/:id', () => {
  it('/musics/:id (Correct ID)', () => {
    return request(rootUrl)
      .get('/musics/users/60216cea45451b065cc0c47b')
      .expect(HttpStatus.OK)
      .expect(findMusicsCb);
  });
  it('/musics/:id (Bad ID)', () => {
    return request(rootUrl)
      .get('/musics/users/60216cea45451b065cc0c47bd')
      .expect(HttpStatus.BAD_REQUEST)
      .expect(errorCb);
  });

  it('/musics/:id (Not Found User)', () => {
    return request(rootUrl)
      .get('/musics/users/60216cea45451b065cc0c47a')
      .expect(HttpStatus.NOT_FOUND)
      .expect(errorCb);
  });

  it('/musics/:id (User hasnt musics)', () => {
    return request(rootUrl)
      .get('/musics/users/60216a28122a011ef47c1c27')
      .expect(HttpStatus.NOT_FOUND)
      .expect(errorCb);
  });
});

describe('GET /musics/file/:id', () => {
  it('/musics/file/:id (Correct ID)', () => {
    return request(rootUrl)
      .get('/musics/file/603124941f807e26d81a4b5f')
      .expect(HttpStatus.OK);
  });

  it('/musics/file/:id (Music which hasnt mp3 file)', () => {
    return request(rootUrl)
      .get('/musics/file/603124831f807e26d81a4b5e')
      .expect(HttpStatus.NOT_FOUND)
      .expect(errorCb);
  });

  it('/musics/file/:id (Bad ID)', () => {
    return request(rootUrl)
      .get('/musics/file/603124831f807e26d81a4b5ee')
      .expect(HttpStatus.BAD_REQUEST)
      .expect(errorCb);
  });

  it('/musics/file/:id (Not Found Music)', () => {
    return request(rootUrl)
      .get('/musics/file/603124831f807e26d81a4b5a')
      .expect(HttpStatus.NOT_FOUND)
      .expect(errorCb);
  });
});
