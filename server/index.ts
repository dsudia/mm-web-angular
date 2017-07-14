import * as http from 'http';
import * as debug from 'debug';

import App from './App';

debug('ts-express:server');

const httpPort = normalizePort(process.env.HTTP_PORT || 3000);
App.set('port', httpPort)

const server = http.createServer(App);
server.listen(httpPort);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number|string): number|string|boolean {
    const p = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(p)) {
        return val;
    } else if (p >= 0) {
        return p;
    } else {
        return false;
    }
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = (typeof httpPort === 'string') ? 'Pipe' + httpPort : 'Port ' + httpPort;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`); // tslint:disable-line
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`); // tslint:disable-line
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
