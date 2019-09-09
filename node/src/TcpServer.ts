/**
 * TCP server example.
 */
import { createServer, Socket } from 'net';

const host = 'localhost';
const port = 1337;

const server = createServer((socket: Socket) => {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});

server.listen(port, host, () => { console.log(`Server running at ${host}:${port}`); });
