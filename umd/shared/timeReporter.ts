export type Printer = (s: string) => void;

export class TimeReporter
{
    printer: Printer
    timerToken: number;

    constructor (printer: Printer)
    {
        this.printer = printer;
        this.printer(new Date().toUTCString());
    }

    start()
    {
        this.timerToken = setInterval(() => this.printer(new Date().toUTCString()), 500);
    }

    stop()
    {
        clearTimeout(this.timerToken);
    }
}
