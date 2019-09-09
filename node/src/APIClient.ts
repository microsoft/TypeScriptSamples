/**
 * API client example.
 */
import { IncomingMessage, request } from 'http';

const handleResponse = (resolve: (data: string) => void, reject: (data: Error) => void, response: IncomingMessage): void => {
    let chunk = '';
    const { statusCode } = response;

    if (statusCode !== 200) {
        reject(new Error('Server error'));
    }

    response.setEncoding('utf8')
            .on('error', reject)
            .on('uncaughtException', reject)
            .on('data', (data: string) => chunk += data)
            .on('end', () => { resolve(chunk); });
};

const ping = async (): Promise<string> => new Promise((resolve: (data: string) => void, reject: (data: Error) => void) => {
    const post = request({
        path: '/',
        port: 8080,
        method: 'GET',
        hostname: 'localhost',
        headers: {
            'Content-Type': 'text/plain'
        }
    });
    const curriedHandleResponse = ((response: IncomingMessage) => { handleResponse(resolve, reject, response); });

    post.write('ping');
    post.on('response', curriedHandleResponse);
    post.on('error', () => { reject(new Error('Request error')); });
    post.end();
});

ping().then(console.log).catch(console.error);
