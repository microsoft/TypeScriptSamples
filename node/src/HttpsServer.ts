/**
 * HTTPS server example.
 */
import { IncomingMessage, ServerResponse } from 'http';
import { createServer } from 'https';

const server = createServer({}, (_: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});

server.listen(1337, '127.0.0.1', () => console.log('Server running at http://127.0.0.1:1337/'));
