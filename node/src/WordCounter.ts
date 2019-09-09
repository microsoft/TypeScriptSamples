/**
 * Reads file then shows how many matching occurrences of a word is found
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const path = join(__dirname, '../lorem.txt');
const ipsum = readFileSync(path, { encoding: 'utf8' });
const word = 'ut';
const re = new RegExp(word, 'gm');
const matching = <RegExpMatchArray> ipsum.match(re);

console.log(`Number of occurrences of the \"${word}\" word is: ${matching.length}`);
