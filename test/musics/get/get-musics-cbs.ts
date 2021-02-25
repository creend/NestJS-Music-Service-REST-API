import { ErrorResponse } from 'src/responses/error.response';
import {
  FindMusicResponse,
  FindMusicsResponse,
} from 'src/responses/musics.response';

export const errorCb = ({ body }: { body: ErrorResponse }) => {
  if (!(body.message && body.status)) {
    throw new Error('Bad Response');
  }
};

export const findMusicsCb = ({ body }: { body: FindMusicsResponse }) => {
  if (
    !(
      body.count &&
      body.page &&
      body.requiredPages &&
      body.musics &&
      body.musics?.[0]?.title &&
      body.musics?.[0]?.author &&
      body.musics?.[0]?.createdAt &&
      body.musics?.[0]?.updatedAt &&
      body.musics?.[0]?.userId &&
      body.musics?.[0]?.genre &&
      body.musics?.[0]?._id &&
      body.musics?.[0]?.length
    )
  ) {
    console.log(body);
    throw new Error('Bad Response');
  }
};

export const findMusicsAscendingCb = ({
  body,
}: {
  body: FindMusicsResponse;
}) => {
  if (
    !(
      body.count &&
      body.page &&
      body.requiredPages &&
      body.musics &&
      body.musics?.[0]?.title &&
      body.musics?.[0]?.author &&
      body.musics?.[0]?.createdAt &&
      body.musics?.[0]?.updatedAt &&
      body.musics?.[0]?.userId &&
      body.musics?.[0]?.genre &&
      body.musics?.[0]?._id &&
      body.musics?.[0]?.length
    )
  ) {
    console.log(body);
    throw new Error('Bad Response');
  }
  if (body.musics.length > 1) {
    if (body.musics[0].updatedAt > body.musics[1].updatedAt) {
      throw new Error('Sorting Error');
    }
  }
};

export const findMusicCb = ({ body }: { body: FindMusicResponse }) => {
  if (
    !(
      body.title &&
      body.author &&
      body.createdAt &&
      body.updatedAt &&
      body.userId &&
      body.genre &&
      body._id &&
      body.length
    )
  ) {
    console.log(body);
    throw new Error('Bad Response');
  }
};
