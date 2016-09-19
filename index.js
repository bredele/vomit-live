/**
 * Server dependencies.
 */

var vomit = require('vomit')
var http = require('http')
var fs = require('fs')
var browserify = require('browserify')


/**
 * Create vomit live serer with given vomit component.
 *
 * @param {String} directory
 * @param {Number} port
 * @api public
 */

module.exports = function(directory, port) {
  http.createServer((req, res) => {
    switch(req.url) {
      case '/':
        res.writeHead(200, {'Content-Type': 'text/html'})
        html('test', '<button>hello</button>').pipe(res)
        break
      case '/events':
        res.writeHead(200, {'Content-Type': 'text/event-stream' });
        //res.write('data: ' + Date.now() + '\n\n');
        break
      case '/bundle.js':
        browserify()
          .add(__dirname + '/live.js')
          .require(directory)
          .bundle()
          .pipe(res)
        break
      case '/bundle.css':
        res.end()
        break
      default:
        res.end()
    }
  }).listen(port || 3000)
}


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
      <link rel="stylesheet" href="bundle.css">
    </head>
    <body>
    ${component}
    <script src="bundle.js"></script>
    <script>require('vomit-live')(require('${title}'))</script>
    </body>
  </html>
  `
}
