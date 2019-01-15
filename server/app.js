 const express = require('express');
 const mongoose = require('mongoose');
 const bodyparser = require('body-parser');
 const session = require('express-session');
 const cors = require('cors');
 const controller = require('./controller');

 const app =express();
const port=3456;
app.use(bodyparser.json());
mongoose.connect('mongodb://127.0.0.1/bbs-data',{ useNewUrlParser: true },(err) => {
    if (err) throw err;
    console.log('Successfully connected');
});
app.use(
    cors({
        origin: [
        "http://localhost:3000"
        ],
        methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
        credentials: true //allow setting of cookies
    })
);
app.use(
session({
    secret: "ferfromhell2104!",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 * 30 }
})
);
controller(app);

app.listen(process.env.PORT || port, () => console.log(`Listening...${port}`));
