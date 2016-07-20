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

import { LazyPromise } from "./utils"; 
import * as querystring from "querystring";
import * as url from "url";
import * as http from "http";
import * as https from "https";

const linkPattern = /(?:^|,\s*)<([^>]+)>; rel="([^"]+)"/g;
const noCachePattern = /(?:^|,)\s*no-cache\s*(?:=|,|$)/;
const noStorePattern = /(?:^|,)\s*no-store\s*(?:,|$)/;
const mustRevalidatePattern = /(?:^|,)\s*must-revalidate\s*(?:,|$)/;

export class GitHubClient {
    private cache = new Map<string, ResponseMessage>();
    private token: string;
    
    constructor(options?: { token?: string; }) {
        if (options) {
            this.token = options.token;
        }
    }
    
    public async getRateLimit() {
        return this.get<RateLimit>(uri`/rate_limit`);
    }
    
    public async listMyRepositories(options?: { visibility?: string; affiliation?: string; type?: string; } & SortOrder & Pagination) {
        return this.list<Repository, typeof options>(uri`/user/repos`, options);
    }

    public async listUserRepositories(username: string, options?: { type?: string; } & SortOrder & Pagination) {
        return this.list<Repository, typeof options>(uri`/users/${username}/repos`, options);
    }

    public async listOrganizationRepositories(org: string, options?: { type?: string; } & Pagination) {
        return this.list<Repository, typeof options>(uri`/orgs/${org}/repos`, options);
    }

    public async listPublicRepositories(options?: { since?: number; }) {
        return this.list<Repository, typeof options>(uri`/repositories`, options);
    }
    
    public async getRepository(owner: string, repo: string) {
        return this.get<Repository>(uri`/repos/${owner}/${repo}`);
    }
    
    public async listContributors(owner: string, repo: string, options?: { anon?: boolean; } & Pagination) {
        return this.list<Person, typeof options>(uri`/repos/${owner}/${repo}/contributors`, options);
    }

    public async getLanguages(owner: string, repo: string) {
        return this.get(uri`/repos/${owner}/${repo}/languages`);
    }
    
    public async listTeams(owner: string, repo: string, options?: Pagination) {
        return this.list<Team, typeof options>(uri`/repos/${owner}/${repo}/teams`, options);
    }
    
    public async listTags(owner: string, repo: string, options?: Pagination) {
        return this.list<Tag, typeof options>(uri`/repos/${owner}/${repo}/tags`, options);
    }
    
    public async listBranches(owner: string, repo: string, options?: Pagination) {
        return this.list<BranchSummary, typeof options>(uri`/repos/${owner}/${repo}/branches`, options);
    }
    
    public async getBranch(owner: string, repo: string, branch: string) {
        return this.get<Branch>(uri`/repos/${owner}/${repo}/branches/${branch}`);
    }
    
    public async listComments(owner: string, repo: string, options?: Pagination) {
        return this.list<Comment, typeof options>(uri`/repos/${owner}/${repo}/comments`, options);
    }

    public async listCommitComments(owner: string, repo: string, ref: string, options?: Pagination) {
        return this.list<Comment, typeof options>(uri`/repos/${owner}/${repo}/commits/${ref}/comments`, options);
    }
    
    public async getComment(owner: string, repo: string, id: number) {
        return this.get<Comment>(uri`/repos/${owner}/${repo}/comments/${id}`);
    }
    
    public async listCommits(owner: string, repo: string, options?: { sha?: string; path?: string; author?: string; since?: string; until?: string; } & Pagination) {
        return this.list<CommitSummary, typeof options>(uri`/repos/${owner}/${repo}/commits`, options);
    }
    
    public async getCommit(owner: string, repo: string, sha: string) {
        return this.get<Commit>(uri`/repos/${owner}/${repo}/commits/${sha}`);
    }
    
    public async compareCommits(owner: string, repo: string, base: string, head: string) {
        let result = await this.get<CommitDiff>(uri`/repos/${owner}/${repo}/compare/${base}...${head}`);
        return result;
    }
    
    public async listPullRequests(owner: string, repo: string, options?: { state?: string; head?: string; base?: string; } & SortOrder & Pagination) {
        return this.list<PullRequestSummary, typeof options>(uri`/repos/${owner}/${repo}/pulls`, options);
    }
    
    public async getPullRequest(owner: string, repo: string, number: number) {
        return this.get<PullRequest>(uri`/repos/${owner}/${repo}/pulls/${number}`);
    }
    
    public async listPullRequestCommits(owner: string, repo: string, number: number, options?: { sha?: string; path?: string; author?: string; since?: string; until?: string; } & Pagination) {
        return this.list<Commit, typeof options>(uri`/repos/${owner}/${repo}/pulls/${number}/commits`, options);
    }
    
    public async listPullRequestFiles(owner: string, repo: string, number: number, options?: Pagination) {
        return this.list<File, typeof options>(uri`/repos/${owner}/${repo}/pulls/${number}/files`, options);
    }
    
    public async listPullRequestComments(owner: string, repo: string, number: number, options?: Pagination) {
        return this.list<Comment, typeof options>(uri`/repos/${owner}/${repo}/pulls/${number}/comments`, options);
    }
    
    public async getPullRequestComment(owner: string, repo: string, id: number) {
        return this.get<Comment>(uri`/repos/${owner}/${repo}/pulls/comments/${id}`);
    }
    
    private async list<T, TOptions>(path: string, options: TOptions): Promise<Page<T, TOptions>> {
        let responseMessage = await this.sendAsync(this.prepareRequest("GET", path, options));
        let content = await responseMessage.content;
        let result = <Page<T, TOptions>>JSON.parse(content);
        let link = responseMessage.headers.link;
        for (let match = linkPattern.exec(link); match; match = linkPattern.exec(link)) {
            let parsedUrl = url.parse(match[1], true);
            if (match[2] === "next") {
                result.next = Object.assign({ }, options, parsedUrl.query);
            }
            else if (match[2] === "last") {
                result.last = Object.assign({ }, options, parsedUrl.query);
            }
        }
        
        return result;
    }

    private async get<T>(path: string, options?: any) {
        let responseMessage = await this.sendAsync(this.prepareRequest("GET", path, options));
        let content = await responseMessage.content;
        let result = <T>JSON.parse(content);
        return result;
    }
    
    private prepareRequest(method: string, requestUrl: string, query: any) {
        let parsedUrl = url.parse(url.resolve("https://api.github.com/", requestUrl), true);
        let hostname = "api.github.com";
        let headers: any = { 
            "User-Agent": "github-api (NodeJS v4.0.0)", 
            "Accept": "application/vnd.github.v3+json" 
        };
        if (this.token) {
            headers["Authorization"] = `token ${this.token}`;
        }

        let pathname = parsedUrl.pathname;
        let search = querystring.stringify(Object.assign({ }, parsedUrl.query, query));
        let path = search ? pathname + "?" + search : pathname;
        return { method, hostname, path, headers };
    }

    private sendAsync(requestMessage: https.RequestOptions) {
        return new Promise<ResponseMessage>((resolve, reject) => {
            let requestNoCache = noCachePattern.test(requestMessage.headers["Cache-Control"]);
            let requestNoStore = noStorePattern.test(requestMessage.headers["Cache-Control"]);
            let cachedResponse: ResponseMessage;
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
                    content: new LazyPromise((resolve, reject) => {
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

function uri(template: TemplateStringsArray, ...args: any[]): string;
function uri(template: TemplateStringsArray) {
    let text = template[0];
    for (let i = 1; i < template.length; i++) {
        text += encodeURIComponent(String(arguments[i]));
        text += template[i];
    }
    return text;
}

interface ResponseMessage {
    httpVersion: string;
    statusCode: number;
    statusMessage: string;
    headers: any;
    content: Promise<string>;
}

export interface Page<T, TOptions> extends Array<T> {
    next: TOptions;
    last: TOptions;
}

export interface Repository {
    id: number;
    name: string;
    full_name: string;
    owner: Person;
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: string;
    open_issues_count: number;
    default_branch: string;
    permissions: {
        admin: boolean;
        push: boolean;
        pull: boolean;
    };
    organization: Person;
    network_count: number;
    subscribers_count: number;
}

export interface CommitRef {
    url: string;
    sha: string;
}

export interface GitPerson {
    name: string;
    email: string;
    date: string;
}

export interface GitCommit extends CommitRef {
    author: GitPerson;
    url: string;
    message: string;
    tree: CommitRef;
    committer: GitPerson;
    comment_count: number;
}

export interface SortOrder {
    sort?: string;
    direction?: string;
}

export interface Pagination {
    page?: number;
    per_page?: number;
}

export interface Person {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    type: string;
    site_admin: boolean;
}

export interface Comment {
    html_url: string;
    url: string;
    id: number;
    body: string;
    path: string;
    position: number;
    line: number;
    commit_id: string;
    user: Person;
    created_at: string;
    updated_at: string;
}

export interface CommitSummary extends CommitRef {
    commit: GitCommit;
    html_url: string;
    author: Person;
    committer: Person;
    parents: CommitRef[];
}

export interface Commit extends CommitSummary {
    stats: {
        additions: number;
        deletions: number;
        total: number;
    };
    files: File[];
}

export interface File {
    sha: string;
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch: string;
}

export interface CommitDiff {
    url: string;
    html_url: string;
    permalink_url: string;
    diff_url: string;
    path_url: string;
    base_commit: Commit;
    merge_base_commit: Commit;
    status: string;
    ahead_by: number;
    behind_by: number;
    total_commits: number;
    commits: CommitSummary[];
    files: File[];
}

export interface Label {
    label: string;
    ref: string;
    sha: string;
    user: Person;
    repo: Repository;
}

export interface Languages {
    [language: string]: number;
    C?: number;
    Python?: number;
    Java?: number;
    TypeScript?: number;
    HTML?: number;
    PowerShell?: number;
    Batchfile?: number;
    JavaScript?: number;
    Shell?: number;
}

export interface Team {
    id: number;
    url: string;
    name: string;
    slug: string;
    description: string;
    privacy: string;
    permission: string;
}

export interface Tag {
    name: string;
    commit: CommitRef;
    zipball_url: string;
    tarball_url: string;
}

export interface BranchSummary {
    name: string;
    commit: CommitRef;
}

export interface Branch {
    name: string;
    commit: CommitSummary;
}

export interface PullRequestSummary {
    url: string;
    id: number;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    statuses_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    closed_at: string;
    merged_at: string;
    merge_commit_sha: string;
    assignee: Person;
    milestone: Milestone;
    head: Label;
    base: Label;
    user: Person;
}

export interface PullRequest extends PullRequestSummary {
    merged: boolean;
    mergeable: boolean;
    mergeable_state: string;
    merged_by: Person;
    comments: number;
    review_comments: number;
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
}

export interface Milestone {
    url: string;
    html_url: string;
    id: number;
    number: number;
    state: string;
    title: string;
    description: string;
    creator: Person;
    open_issues: number;
    closed_issues: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    due_on: string;
}

export interface RateLimit {
    resources: {
        core: {
            limit: number;
            remaining: number;
            reset: number;
        },
        search: {
            limit: number,
            remaining: number,
            reset: number
        }
    },
    rate: {
        limit: number;
        remaining: number;
        reset: number;
    }
}