import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV,
  staticFilesPath: process.env.STATIC_FILES_PATH,
  prodUrl: process.env.PROD_URL,
  devUrl: process.env.DEV_URL,
  reactDevUrl: process.env.REACT_DEV_URL,
  validationPipe: {
    disableErrorMessages: false,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    forbidNonWhitelisted: false,
    whitelist: true,
    dismissDefaultMessages: false,
  },
}));
