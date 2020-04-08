import Server from './server/server';

let server: Server = new Server(3000, 'localhost');
server.init();
