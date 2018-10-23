/**
 * Searches Wikipedia database
 */
import { IncomingMessage } from 'http';
import { request } from 'https';

const response = (res: IncomingMessage) => {
    const { statusCode } = res;
    let chunk = '';

    if (statusCode !== 200) {
        console.error(new Error(`[Request status ${statusCode}] Not accepted`));
    } else {
        res.on('error', console.error)
           .on('uncaughtException', console.error)
           .on('data', (data: string) => chunk += data)
           .on('end', () => {
               const result = JSON.parse(chunk);

               console.log(result);
           });
    }
};

const search = 'microsoft';
const query = `action=query&format=json&list=search&srsearch=${encodeURI(search)}`;
const path = `/w/api.php?${query}`;
const options = {
    path,
    method: 'GET',
    hostname: 'en.wikipedia.org',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'text/html'
    }
};
const wikipedia = request(options);

wikipedia.on('error', console.error)
         .on('response', response)
         .end();
