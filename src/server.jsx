const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

const indexPath = path.join(__dirname, '../index.html');
const publicPath = express.static(path.join(__dirname, '../build'));

// serve static assets normally
app.use('/build', publicPath);

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(indexPath)
});

app.listen(port);
console.log("server started on port " + port);