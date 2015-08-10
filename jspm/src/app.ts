import { Greeter } from 'greeter'

export function main(el: HTMLElement): void {
    let greeter = new Greeter(el);
    greeter.start();
}