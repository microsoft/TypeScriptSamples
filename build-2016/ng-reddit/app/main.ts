import { bootstrap }  from "angular2/platform/browser";
import { Component } from "angular2/core";
import { JSONP_PROVIDERS, Jsonp } from "angular2/http";
import { Observable } from "rxjs";
import { ApiResponse, Submission } from "./reddit";
import "rxjs/add/operator/map";

@Component({
    selector: "app",
    templateUrl: "app.html",
    providers: [JSONP_PROVIDERS]
})
class App {
    private feedData: Observable<Submission[]>;

    constructor(private jsonp: Jsonp) { }

    ngOnInit() {
        this.displaySubreddit("aww");
    }

    private displaySubreddit(subreddit: string) {
        this.feedData = this.jsonp
            .get("http://reddit.com/r/aww.json?jsonp=JSONP_CALLBACK")
            .map(res => (res.json() as ApiResponse).data.children.map(child => child.data));
    }
}

bootstrap(App);
