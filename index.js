/**
 * Server dependencies.
 */

var vomit = require('vomit')
var http = require('http')
var fs = require('fs')
var browserify = require('browserify')
var name = require('path').basename


/**
 * Create vomit live serer with given vomit component.
 *
 * @param {String} directory
 * @param {Number} port
 * @api public
 */

module.exports = function(directory, port) {
  var component = name(directory)
  http.createServer((req, res) => {
    switch(req.url) {
      case '/':
        res.writeHead(200, {'Content-Type': 'text/html'})
        html(component).pipe(res)
        break
      case '/events':
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });

        res.write('data: foo\n\n');
        setTimeout(function(){
          res.write('data: bar\n\n');
          setTimeout(function(){
            res.end('data: quit\n\n');
          }, 1000);
        }, 1000);
        break
      case '/bundle.js':
        bundle(component, directory).pipe(res)
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


/**
 * Bundle component.
 *
 * @param {String} directory
 * @api private
 */

function bundle(name, directory) {
  return browserify()
    .require(__dirname + '/live.js', {
      expose : 'vomit-live'
    })
    .require(directory, {
      expose: name
    })
    .bundle()
}


/**
 * Stringify data with type.
 *
 * @param {String} type
 * @param {Any} data
 * @return {String} json
 * @api private
 */

function stringify(type, data) {
  return JSON.stringify({
    type: type,
    data: data
  })
}
