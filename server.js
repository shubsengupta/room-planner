
var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

app.use(express.static(__dirname));

app.listen(port);