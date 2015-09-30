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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var utils_1 = require("./utils");
var querystring = require("querystring");
var url = require("url");
var https = require("https");
const linkPattern = /(?:^|,\s*)<([^>]+)>; rel="([^"]+)"/g;
const noCachePattern = /(?:^|,)\s*no-cache\s*(?:=|,|$)/;
const noStorePattern = /(?:^|,)\s*no-store\s*(?:,|$)/;
const mustRevalidatePattern = /(?:^|,)\s*must-revalidate\s*(?:,|$)/;
class GitHubClient {
    constructor(options) {
        this.cache = new Map();
        if (options) {
            this.token = options.token;
        }
    }
    getRateLimit() {
        return __awaiter(this, void 0, Promise, function* () {
            return this.get(uri `/rate_limit`);
        });
    }
    listMyRepositories(options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/user/repos`, options);
        });
    }
    listUserRepositories(username, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/users/${username}/repos`, options);
        });
    }
    listOrganizationRepositories(org, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/orgs/${org}/repos`, options);
        });
    }
    listPublicRepositories(options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repositories`, options);
        });
    }
    getRepository(owner, repo) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.get(uri `/repos/${owner}/${repo}`);
        });
    }
    listContributors(owner, repo, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/contributors`, options);
        });
    }
    getLanguages(owner, repo) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.get(uri `/repos/${owner}/${repo}/languages`);
        });
    }
    listTeams(owner, repo, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/teams`, options);
        });
    }
    listTags(owner, repo, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/tags`, options);
        });
    }
    listBranches(owner, repo, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/branches`, options);
        });
    }
    getBranch(owner, repo, branch) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.get(uri `/repos/${owner}/${repo}/branches/${branch}`);
        });
    }
    listComments(owner, repo, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/comments`, options);
        });
    }
    listCommitComments(owner, repo, ref, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/commits/${ref}/comments`, options);
        });
    }
    getComment(owner, repo, id) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.get(uri `/repos/${owner}/${repo}/comments/${id}`);
        });
    }
    listCommits(owner, repo, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/commits`, options);
        });
    }
    getCommit(owner, repo, sha) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.get(uri `/repos/${owner}/${repo}/commits/${sha}`);
        });
    }
    compareCommits(owner, repo, base, head) {
        return __awaiter(this, void 0, Promise, function* () {
            let result = yield this.get(uri `/repos/${owner}/${repo}/compare/${base}...${head}`);
            return result;
        });
    }
    listPullRequests(owner, repo, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/pulls`, options);
        });
    }
    getPullRequest(owner, repo, number) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.get(uri `/repos/${owner}/${repo}/pulls/${number}`);
        });
    }
    listPullRequestCommits(owner, repo, number, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/pulls/${number}/commits`, options);
        });
    }
    listPullRequestFiles(owner, repo, number, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/pulls/${number}/files`, options);
        });
    }
    listPullRequestComments(owner, repo, number, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.list(uri `/repos/${owner}/${repo}/pulls/${number}/comments`, options);
        });
    }
    getPullRequestComment(owner, repo, id) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.get(uri `/repos/${owner}/${repo}/pulls/comments/${id}`);
        });
    }
    list(path, options) {
        return __awaiter(this, void 0, Promise, function* () {
            let responseMessage = yield this.sendAsync(this.prepareRequest("GET", path, options));
            let content = yield responseMessage.content;
            let result = JSON.parse(content);
            let link = responseMessage.headers.link;
            for (let match = linkPattern.exec(link); match; match = linkPattern.exec(link)) {
                let parsedUrl = url.parse(match[1], true);
                if (match[2] === "next") {
                    result.next = Object.assign({}, options, parsedUrl.query);
                }
                else if (match[2] === "last") {
                    result.last = Object.assign({}, options, parsedUrl.query);
                }
            }
            return result;
        });
    }
    get(path, options) {
        return __awaiter(this, void 0, Promise, function* () {
            let responseMessage = yield this.sendAsync(this.prepareRequest("GET", path, options));
            let content = yield responseMessage.content;
            let result = JSON.parse(content);
            return result;
        });
    }
    prepareRequest(method, requestUrl, query) {
        let parsedUrl = url.parse(url.resolve("https://api.github.com/", requestUrl), true);
        let hostname = "api.github.com";
        let headers = {
            "User-Agent": "github-api (NodeJS v4.0.0)",
            "Accept": "application/vnd.github.v3+json"
        };
        if (this.token) {
            headers["Authorization"] = `token ${this.token}`;
        }
        let pathname = parsedUrl.pathname;
        let search = querystring.stringify(Object.assign({}, parsedUrl.query, query));
        let path = search ? pathname + "?" + search : pathname;
        return { method, hostname, path, headers };
    }
    sendAsync(requestMessage) {
        return new Promise((resolve, reject) => {
            let requestNoCache = noCachePattern.test(requestMessage.headers["Cache-Control"]);
            let requestNoStore = noStorePattern.test(requestMessage.headers["Cache-Control"]);
            let cachedResponse;
            if (!requestNoCache && !requestNoStore) {
                cachedResponse = this.cache.get(requestMessage.path);
                if (cachedResponse) {
                    if (!mustRevalidatePattern.test(cachedResponse.headers["cache-control"]) &&
                        Date.parse(cachedResponse.headers["expires"]) > Date.now()) {
                        resolve(cachedResponse);
                        return;
                    }
                    if (cachedResponse.headers["etag"]) {
                        requestMessage.headers["If-None-Modified"] = cachedResponse.headers["etag"];
                    }
                    if (cachedResponse.headers["last-modified"]) {
                        requestMessage.headers["If-Modified-Since"] = cachedResponse.headers["last-modified"];
                    }
                }
            }
            let nodeRequest = https.request(requestMessage, nodeResponse => {
                if (nodeResponse.statusCode === 304 && cachedResponse) {
                    resolve(cachedResponse);
                    return;
                }
                let responseMessage = Object.freeze({
                    httpVersion: nodeResponse.httpVersion,
                    statusCode: nodeResponse.statusCode,
                    statusMessage: nodeResponse.statusMessage,
                    headers: nodeResponse.headers,
                    content: new utils_1.LazyPromise((resolve, reject) => {
                        if (nodeResponse.statusCode < 200 || nodeResponse.statusCode >= 300) {
                            throw new Error(`${nodeResponse.statusCode} ${nodeResponse.statusMessage}`);
                        }
                        let data = "";
                        nodeResponse.setEncoding("utf8");
                        nodeResponse.on("data", chunk => { data += chunk; });
                        nodeResponse.on("error", reject);
                        nodeResponse.on("end", () => { resolve(data); });
                    })
                });
                let responseNoCache = noCachePattern.test(nodeResponse.headers["cache-control"]);
                let responseNoStore = noStorePattern.test(nodeResponse.headers["cache-control"]);
                if (!requestNoCache && !requestNoStore && !responseNoCache && !responseNoStore &&
                    (responseMessage.headers["etag"] || responseMessage.headers["last-modified"] || responseMessage.headers["expires"])) {
                    this.cache.set(requestMessage.path, responseMessage);
                }
                else if (cachedResponse) {
                    this.cache.delete(requestMessage.path);
                }
                resolve(responseMessage);
            });
            nodeRequest.once("error", reject);
            nodeRequest.end();
        });
    }
}
exports.GitHubClient = GitHubClient;
function uri(template) {
    let text = template[0];
    for (let i = 1; i < template.length; i++) {
        text += encodeURIComponent(String(arguments[i]));
        text += template[i];
    }
    return text;
}

//# sourceMappingURL=github.js.map