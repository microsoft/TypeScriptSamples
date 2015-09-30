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

import { GitHubClient } from "./github";
import { formatMessage, sleep } from "./utils";

// A GitHub authentication token. This may be undefined to make API requests anonymously.
const githubToken: string = process.env.GITHUB_TOKEN;

// A GitHub repository to access.
const githubRepository: string = process.env.GITHUB_REPOSITORY || "Microsoft/TypeScript";

/**
 * This is the main entry point for the program, and is invoked
 * at the bottom of this file.
 */
async function main() {
    // The `async` keyword indicates to TypeScript that it must
    // modify the emit of the function. As a result, this function
    // will return a Promise at run-time, and will pause execution
    // at any point where it encounters an `await` expression
    // until the awaited value has either been resolved with a value,
    // or rejected with an error.
    try {
        let parts = githubRepository.split("/");
        let owner = parts[0];
        let repo = parts[1];

        // Create a GitHubClient. This client is designed to wrap the 
        // GitHub v3 REST API. It also supports conditional requests [1] to
        // better interact with GitHub API Rate Limiting [2].
        //
        // [1] https://developer.github.com/v3/#conditional-requests
        // [2] https://developer.github.com/v3/#rate-limiting
        let github = new GitHubClient({ token: githubToken });
        
        // Print the recent pull requests for a repository.
        //
        // We `await` the result of the function call. This allows us to
        // observe any exceptions raised by the function call,
        // even if we do not use the asynchronous return value.
        await printRecentPullRequests(github, owner, repo);
    }
    catch (e) {
        // We catch exceptions here at the entry point so that we can report them.
        //
        // If we do not catch the exception here, it will not be reported to the 
        // host.
        // 
        // Alternatively, we could subscribe to the Promise that is returned from
        // the call to `main()` below via the `catch` method of the Promise.
        console.error(e.stack);
        process.exit(-1);
    }
}

/**
 * Prints information about the 5 most recent pull requests for a repository.
 * @param github The GitHubClient to use to make requests
 * @param owner The repository owner.
 * @param repo The repository name.
 * @returns A Promise that is resolved with the asynchronous function completes.
 */
async function printRecentPullRequests(github: GitHubClient, owner: string, repo: string) {
    // Fetch the last 5 pull requests.
    // 
    // Here we `await` the result of the asynchronous function call. In this case,
    // the function call returns a Promise instance. As a result, execution of this function
    // will pause until the Promise is resolved with a value, or rejected
    // with an exception.
    //
    // We could also have written this line in the following fashion:
    //
    //   let pullRequestsPromise = github.listPullRequests(owner, repo, { per_page: 5 });
    //   let pullRequests = await pullRequestsPromise;
    // 
    // The above works because the `await` keyword operates on a value, not a call.
    let pullRequests = await github.listPullRequests(owner, repo, { per_page: 5 });
    
    // Print the details of each pull request.
    console.log(`Last ${pullRequests.length} pull request(s):`);
    for (let pullRequest of pullRequests) {
        console.log(`  #${pullRequest.number} ${pullRequest.title.trim()} - @${pullRequest.user.login}`);
        console.log(`    [${pullRequest.html_url}]`);
        console.log();

        // Fetch the last 5 commits.
        //
        // Here we `await` a value inside of a for..of loop. Without `await` it is much more difficult to
        // emulate the same run-time behavior when only using Promise#then or Promise.all.
        let commits = await github.listPullRequestCommits(owner, repo, pullRequest.number, { per_page: 5 });
        
        // Print the details of each commit.
        console.log(`    Last ${commits.length} commit(s):`);
        for (let commit of commits) {
            // Get the author of the commit
            let author = commit.author ? commit.author.login 
                       : commit.committer ? commit.committer.login
                       : commit.commit.author ? commit.commit.author.name
                       : commit.commit.committer ? commit.commit.committer.name
                       : "unknown";
            
            // Format the commit message
            let message = formatMessage(commit.commit.message, 60, 100);
            
            // Print the commit message.
            let firstLine = message.shift();
            console.log(`      ${commit.sha.substr(0, 8)} ${firstLine}${message.length > 0 ? "..." : ""} - @${author} on ${commit.commit.author.date}`);
            
            // If the commit message spans multiple lines, print them out following the commit details.
            if (message.length > 0) {
                for (let line of message) {
                    console.log(`        | ${line}`);
                }
                console.log();
            }
        }
        
        console.log();
        
        // Fetch the last 5 comments.
        let comments = await github.listPullRequestComments(owner, repo, pullRequest.number, { per_page: 5 });
        if (comments.length) {
            // Print the details of each comment.
            console.log(`    Last ${comments.length} comment(s):`);
            for (let comment of comments) {
                console.log(`      @${comment.user.login} commented on ${comment.commit_id.substr(0, 8)} at ${comment.created_at}:`);
                for (let line of formatMessage(comment.body, 100)) {
                    console.log(`        | ${line}`);
                }
                
                console.log();
            }
            
            console.log();
        }
    }
}

// Kick off the main async function.
main();