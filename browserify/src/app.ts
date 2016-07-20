import { TimeReporter, Printer } from './timeReporter'
import { EOL } from 'os';


export function start(printer: Printer) {
    let timeReporter = new TimeReporter(printer);
    timeReporter.start();
}