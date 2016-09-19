/**
 * Vomit live dependencies.
 */

var vomit = require('vomit')


/**
 * Expose 'vomit-live'
 *
 * A vomit component should be a simple function taking data
 * in input and return an Element as output.
 *
 * @param {Element} component
 * @api public
 */

module.exports = function(component) {
  var cb = vomit(component)
  document.body.appendChild(cb())
  sse('/events', function(type, data) {
    if(type.indexOf('reload') > -1) reload()
    if(type.indexOf('update') > -1) update(cb, data)
  });
}


/**
 * Update component with data.
 *
 * @param {Function} component
 * @param {Object} data
 * @api private
 */

function update(component, data) {
  component(data)
}


/**
 * Reload page
 *
 * @api private
 */

function reload() {
  window.location.reload();
}


/**
 * Listen server events.
 *
 * @param {String} topic
 * @param {Function} cb
 * @api private
 */

function sse(topic, cb) {
  var source = new EventSource(topic);
  source.onmessage = function(event) {
    var obj = JSON.parse(event.data)
    cb(obj.type, obj.data)
  };
}
