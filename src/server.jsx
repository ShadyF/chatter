const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const compression = require('compression');

const indexPath = path.join(__dirname, '../index.html');
const publicPath = express.static(path.join(__dirname, '../build'));

// Middleware that compresses responses
// Note that this wastes CPU time as compression occurs on every response
// a better implemention would be to compress bundle.js in webpack and serve that
// See https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a#.6h63uhfqk
app.use(compression());

// serve static assets normally
app.use('/build', publicPath);

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(indexPath)
});

app.listen(port);
console.log("server started on port " + port);