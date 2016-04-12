import * as React from "react";
import { Submission } from "./reddit"

export interface SubmissionProps extends Submission {
    elementPosition: number;
}

let imageStyle = {
    maxWidth: "600px",
    maxHeight: "600px",
};

export const SubmissionComp = (submission: SubmissionProps) =>
    <div style={{ fontFamily: "sans-serif" }}>
        { submission.elementPosition ? <br /> : "" }
        <span style={{ fontSize: "1.2rem" }}>
            <span>{ submission.elementPosition + 1 }.</span>
            <a href={ submission.url }>{submission.title}</a>
        </span>
        <span> ({ submission.domain }) </span>
        <div>
            Submitted at { new Date(submission.created_utc).toLocaleTimeString() }.
        </div>
        <img src={submission.url} style={imageStyle}/>
    </div>;