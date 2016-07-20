The following is the list of modifications made to change the JS project to a TS Project: 
* Moved original README.md to README-JS.md and added this README.md and CONVERSION.md
* Installed TypeScript typings for angular and related libs `tsd install angular jquery jasmine karma-jasmine angular-mocks angular-protractor selenium-webdriver --save`
* Added 2 `tsconfig.json` files, one for `app` and another for `e2e-tests`. Two files are needed because of different typings for each.
* Renamed the `.js` files to `.ts`. 
* As a sample : Converted controller `View1` and `View2` *functions* to *classes* and added a type annotation to use these from tests in a type checked way.
* Minor modifications of typings needed because of conflict in `jquery` vs. `protractor` : https://github.com/borisyankov/DefinitelyTyped/issues/2734. 
    * Remove `$` from `jquery.d.ts` in `e2e-tests`.
    * Remove `protractor` def from `app`.

You will notice that stuff like `angular`, `mocks` etc will light up with IntelliSense and you will get errors if you try to misuse these.
