# Async Functions

*Async Functions* are functions that can suspend their execution to wait for the completion of an 
asynchronous operation. This allows complex algorithms that require asynchronous control flow to
be written sequentially.

This sample uses *Async Functions* to query the GitHub API to view information about recent pull 
requests.

This sample requires a minimum of NodeJS v4.0.0. 

**Fetch dependencies**
```
npm install
```

**Run**
```
npm test
```

**Environment variables**

| Name              | Description                                                                 |
|:------------------|:----------------------------------------------------------------------------|
| GITHUB_TOKEN      | The Authentication token to use for GitHub API Requests. (Optional)         |
| GITHUB_REPOSITORY | The GitHub repository to use for queries. (Default: "Microsoft/TypeScript") |