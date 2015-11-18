import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import * as routes from "./routes/index";
import * as db from "./db";

var app = express();

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.use(errorHandler());
}


// Routes

app.get('/', routes.index);

app.get('/findImages', (req, res) => {
    console.log('getting images from' + req.query['url']);

    let req2 = http.get(url.parse(req.query['url']), urlMessage => {
      console.log("Got response: " + urlMessage.statusCode);

      let text = "";

      urlMessage.on('data', (chunk: string) => {
        text += chunk;
      });

      urlMessage.on('end', () => {
        console.log(text);
        const imageTagRegEx = /<img[^>]+src=[\"\']([^\'\"]+)[\"\']/g;

        let match: RegExpMatchArray;
        let matches: string[] = [];
        while (match = imageTagRegEx.exec(text)) {
            matches.push(match[1]);
        }

        res.write(JSON.stringify(matches));
        res.end();
      });

    }).on('error', function(a,e) {
      console.log("Got error: " + e.message);
    });
});

app.get('/user/:userid', (req, res) => {
    console.log('getting user ' + req.params.userid);
    db.getUser(req.params.userid, user => {
        res.render('user', {
            title: user._id,
            username: user._id,
            boards: user.boards
       });
    });
});

app.get('/user/:userid/newboard', (req, res) => {
    res.render('newboard', {
        username: req.params.userid
    });
});

app.post('/user/:userid/newboard', (req, res) => {
    db.addBoard(req.params.userid, req.param('title'), req.param('description'), user => {
        res.redirect('/user/'+req.params.userid);
    });
});

app.get('/user/:userid/:boardid', (req, res) => {
    console.log('getting ' + req.params.userid + ", " + req.params.boardid);
    db.getUser(req.params.userid, user => {
        let board = user.boards.filter(board => decodeURIComponent(req.params.boardid) === board.title)[0];

        if (board) {
            db.getImages(board.images, images => {
                res.render('board', {
                    title: user._id,
                    username: user._id,
                    board: board,
                    images: images
                });
            });
        }
        else {
            res.send(404, 'not found');
        }
    });
});

app.get('/user/:userid/:boardid/newpin', (req, res) => {
    res.render('newpin', {
        username: req.params.userid,
        boardid: req.params.boardid
    });
});

app.post('/user/:userid/:boardid/newpin', (req, res) => {
    db.addPin(req.params.userid, req.params.boardid, req.param('imageUri'), req.param('link'), req.param('caption'), user => {
        res.redirect('/user/'+req.params.userid +"/" + req.params.boardid)
    });
});

app.get('/image/:imageid', (req, res) => {
    console.log('getting image ' + req.params.imageid);
    db.getImage(req.params.imageid, image => {
        res.render('image', {
            title: "image",
            image: image
        });
    });
});

app.listen(3000, function(){
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});

export var App = app;