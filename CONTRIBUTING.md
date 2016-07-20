## Contributing

## Contributing fixes to existing samples

A bug must have an issue tracking it in the issue tracker that has been approved (labeled "help wanted") by the TypeScript team.
Your pull request should include a link to the bug that you are fixing.
If you've submitted a PR for a bug, please post a comment in the bug to avoid duplication of effort.

## Contributing new samples

New samples may be accepted, but will need to first be approved (labeled "help wanted" by a TypeScript coordinator) in the suggestion issue.

For new samples, please provide a detailed explanation of the intended sample, list of technologies or tools used, and an explanation of why existing samples are not sufficient and a new sample is needed.

A sample is meant to showcase a specific technology or toolchain integration with TypeScript; it is not meant to be a template that users would use to get a project going.
A sample should only include tools/technologies that serve the main technology it covers; for instance, a sample for a UI framework should not include a test framework integration.

A sample should be well documented.
Please include comments in code as well as content in the a `README.md` explaining why steps are being taken.
Comments should also be included in build files if applicable.
A good sample `README.md` should read like a walkthrough, guiding the reader through different steps of setting up and building the sample.
See [TypeScript quick start samples](https://github.com/Microsoft/TypeScript-Handbook/tree/master/pages/quick-start) for guidance.

A sample should be self-contained.
[npm](https://www.npmjs.com/) is the recommended way of acquiring dependencies.
[typings](https://github.com/typings/typings) is the recommended way of acquiring definition files.

A sample should be IDE/editor-friendly. Please include a `tsconfig.json` file at the root.

A sample should have no OS dependency.

## Legal

You will need to complete a Contributor License Agreement (CLA).
Briefly, this agreement testifies that you are granting us permission to use the submitted change according to the terms of the project's license, and that the work being submitted is under appropriate copyright.

Please submit a Contributor License Agreement (CLA) before submitting a pull request.
You may visit https://cla.microsoft.com to sign digitally.
Alternatively, download the agreement ([Microsoft Contribution License Agreement.docx](https://www.codeplex.com/Download?ProjectName=typescript&DownloadId=822190) or [Microsoft Contribution License Agreement.pdf](https://www.codeplex.com/Download?ProjectName=typescript&DownloadId=921298)), sign, scan, and email it back to <cla@microsoft.com>.
Be sure to include your GitHub user name along with the agreement. Once we have received the signed CLA, we'll review the request.
