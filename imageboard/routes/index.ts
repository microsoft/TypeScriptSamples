import express = require("express")
import db = require("../db")

export function index(req: express.Request, res: express.Response) {
    db.getUsers(function(users) {
        console.dir(users);
        res.render('index', { title: 'ImageBoard', users: users })
    });
};