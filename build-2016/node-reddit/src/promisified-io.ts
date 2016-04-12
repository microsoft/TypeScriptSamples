import * as fs from "fs";
import * as request from "request";

export function httpRequest(uri: string) {
    return new Promise<string>((resolve, reject) => {
        let options = {
            uri,
            headers: {
                "User-Agent": "Node Reddit Server v0.4"
            }
        };
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            }

            else if (response.statusCode !== 200) {
                reject(response.statusCode);
            }
            else {
                resolve(body);
            }
        });
    });
}

export function readFile(fileName: string) {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, data) => {
            error ? reject(error) : resolve(data);
        });
    });
}