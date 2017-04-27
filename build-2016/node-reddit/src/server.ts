import { httpRequest, readFile } from "./promisified-io";
import * as express from "express";

async function getRedditFeed(subreddit: string) {
    let configFile = await readFile("config.json");
    let targetUrl = JSON.parse(configFile).targetUrl;
    let result = await httpRequest(`${targetUrl}/r/${subreddit}.json`);
    return result;
}

let app = express();

app.get("/r/aww.json", (req, res) => {
    getRedditFeed("aww")
        .then(body => {
            res.setHeader("Content-Type", "application/json"); 
            res.send(body); 
        })
        .catch(err => console.error(err));
});

app.use("/", express.static(__dirname + "/../../react-reddit"));

const server = app.listen(8000, () => {
    console.log("Server listening on port 8000");
});
