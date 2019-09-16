export interface ApiResponse {
    data: {
        children: {
            data: Submission
        }[];
    };
}

export interface Submission {
    author: string;
    domain: string;
    title: string;
    subreddit: string;
    url: string;
    created_utc: string;
}