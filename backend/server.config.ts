import { join } from 'path';

export const serverConfig = {
  port: 8080,
  hostname: 'localhost',
  publicDirname: join(process.cwd(), 'public'),
};
