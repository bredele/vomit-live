/**
 * Server dependencies.
 */

var vomit = require('vomit')
var http = require('http')


/**
 * Create web server.
 */

http.createServer((req, res) => {
  if(req.url == '/events') {
    res.writeHead(200, {'Content-Type': 'text/event-stream' });
    //res.write('data: ' + Date.now() + '\n\n');
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    html('test').pipe(res)
  }
}).listen(3000)


/**
 * Create web server stream.
 *
 * @return {Stream}
 * @api private
 */

function html(title, component) {
  return vomit`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <link rel="stylesheet" href="vomit-live.css">
      <link rel="stylesheet" href="${title}.css">
    </head>
    <body>
    ${component}
    <script src="bundle.js"></script>
    </body>
  </html>
  `
}
