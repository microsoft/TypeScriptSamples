# Angular Seed TypeScript
This is based on https://github.com/angular/angular-seed.

## Running
The following are specific to TypeScript

Setup TypeScript:
```bash
npm install typescript -g
npm install tsd -g
```
Start the TypeScript compiler in watch mode (either in the `app` folder or in the `e2e-tests` folder) and **leave it running**: 

```bash
tsc --watch --p . 
```

That's it. You have typescript setup and ready to go. You can follow the steps of JavaScript ([README-JS](./README-JS.md)) from this point on in a new window starting at the install dependencies section.

**TIP**: *Abbriged the remaining JS steps for a quick start:*
```bash
npm install 
npm start
```
and visit : http://localhost:8000/app/

## Upgrading
The following is the list of modifications made to change the JS project to a TS Project: 
* Moved original README.md to README-JS.md and added this README.md
* Installed TypeScript typings for angular and related libs `tsd install angular jquery jasmine karma-jasmine angular-mocks angular-protractor selenium-webdriver --save`
* Added 2 `tsconfig.json` files, one for main and another for tests with contents:
```json
{
        "files": [
            list of files
        ]
}
```
* Renamed the `.js` files to `.ts`. 
* As a sample : Converted controller `View1` and `View2` *functions* to *classes* and added a type annotation to use these from tests in a type checked way.
* Minor modifications of definitions needed because of conflict in `jquery` vs. `protractor` : https://github.com/borisyankov/DefinitelyTyped/issues/2734. 
    * Remove `$` from `jquery.d.ts` in `e2e-tests`.
    * Remove `protractor` def from `app`.

You will notice that stuff like `angular`, `mocks` etc will light up with intellisence and you will get errors if you try to misuse these.