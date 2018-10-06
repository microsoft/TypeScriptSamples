/**
 * TCP server example.
 */
import { createServer, Socket } from 'net';

const server = createServer((socket: Socket) => {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});

server.listen(1337, '127.0.0.1', () => console.log('Server running at http://127.0.0.1:1337/'));
