/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
"use strict";
class LazyPromise extends Promise {
    constructor(executor) {
        let resolver;
        let rejecter;
        super((resolve, reject) => { resolver = resolve; rejecter = reject; });
        this._resolve = resolver;
        this._reject = rejecter;
        this._executor = executor;
    }
    then(onfulfilled, onrejected) {
        this._lazyExecute();
        return super.then(onfulfilled, onrejected);
    }
    _lazyExecute() {
        if (this._executor) {
            let executor = this._executor, resolve = this._resolve, reject = this._reject;
            delete this._executor;
            delete this._resolve;
            delete this._reject;
            try {
                executor(resolve, reject);
            }
            catch (e) {
                reject(e);
            }
        }
    }
}
LazyPromise[Symbol.species] = Promise;
exports.LazyPromise = LazyPromise;
function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
exports.sleep = sleep;
function formatMessage(text, firstLineWidth, remainingLinesWidth) {
    if (remainingLinesWidth === undefined)
        remainingLinesWidth = firstLineWidth;
    let pattern = /(\r\n?|\n)|(\s)|(\S+)/g;
    let match;
    let lines = [];
    let line = "";
    let leadingWhiteSpace = "";
    let width = firstLineWidth;
    while (match = pattern.exec(text)) {
        if (match[1]) {
            lines.push(line);
            width = remainingLinesWidth;
            line = "";
            leadingWhiteSpace = "";
        }
        else if (match[2]) {
            leadingWhiteSpace += match[2];
        }
        else if (match[3]) {
            let token = match[3];
            let lineLengthWithWhitespace = line.length + leadingWhiteSpace.length;
            let lineLengthWithText = lineLengthWithWhitespace + token.length;
            if (token.length > width) {
                // If there is room, append the first chunk of the long line to the 
                // current line.
                let offset = 0;
                if (lineLengthWithWhitespace < width) {
                    let chunk = token.substr(offset, width - lineLengthWithWhitespace);
                    line += leadingWhiteSpace + chunk;
                    offset += chunk.length;
                }
                // Push the current line.
                if (line) {
                    lines.push(line);
                    width = remainingLinesWidth;
                    line = "";
                }
                leadingWhiteSpace = "";
                // Append lines for each chunk longer than one line.
                while (token.length - offset > width) {
                    lines.push(token.substr(offset, width));
                    width = remainingLinesWidth;
                    offset += width;
                }
                // Append the remaining text to the current line.
                if (token.length - offset > 0) {
                    line = token.substr(offset);
                }
                else {
                    line = "";
                }
            }
            else if (lineLengthWithText > width) {
                lines.push(line);
                width = remainingLinesWidth;
                line = token;
                leadingWhiteSpace = "";
            }
            else {
                line += leadingWhiteSpace + token;
                leadingWhiteSpace = "";
            }
        }
    }
    if (line) {
        lines.push(line);
    }
    return lines;
}
exports.formatMessage = formatMessage;

//# sourceMappingURL=utils.js.map