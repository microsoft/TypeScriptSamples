/**
 * HTTPS server example.
 */
import { createServer, IncomingMessage, ServerResponse } from 'http';

const host = 'localhost';
const port = 1337;

const server = createServer((_: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});

server.listen(port, host, () => { console.log(`Server running at ${host}:${port}`); });
