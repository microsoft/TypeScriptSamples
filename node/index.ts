/**
 * Just running the command line program.
 */
import { ChildProcess, exec } from 'child_process';

const main: Function = (): ChildProcess => {
    let command: string = `ts-node ./src/${process.argv[3]}.ts`;

    if (process.argv[2] === 'js') {
        exec('tsc');

        command = `node ./dist/${process.argv[3]}.js`;
    }

    return exec(command);
};

main();
