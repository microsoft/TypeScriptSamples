import {format} from "util";

export type Printer = (s: string) => void;

export class TimeReporter
{
    timerToken: number;

    constructor (private printer: Printer)
    {
        this.reportDate();
    }

    start()
    {
        this.timerToken = setInterval(() => this.reportDate(), 500);
    }

    stop()
    {
        clearTimeout(this.timerToken);
    }

    reportDate() {
        this.printer(format("Date is %s", new Date().toUTCString()));
    }
}
