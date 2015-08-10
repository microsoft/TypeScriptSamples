declare module "os" {
    export var EOL: string;
}

declare module "util" {
    export function format(format: string, ...args: any[]): string;
}
