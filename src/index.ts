import { createServer } from 'http';
import 'dotenv/config';
import { app } from './app.js';
import createDebug from 'debug';
import { exit } from 'process';

const debug = createDebug('W7E:Index');
debug('Started');
const PORT = process.env.PORT || 3000;

const server = createServer(app);

server.listen(PORT);

server.on('listening', () => {
  const addressInfo = server.address();
  if (addressInfo === null) {
    server.emit('error', new Error('Invalid network address'));
    return;
  }

  let bind: string;
  if (typeof addressInfo === 'string') {
    bind = 'pipe ' + addressInfo;
  } else {
    bind =
      addressInfo.address === '::'
        ? `http://localhost:${addressInfo?.port}`
        : `port ${addressInfo?.port}`;
  }

  console.log(`Listening on ${bind}`);
});

server.on('error', (error) => {
  debug(`Error ${error.message}`);
  exit(-1);
});
