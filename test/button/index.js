
/**
 * Button dependencies.
 */

var vomit = require('vomit')


/**
 * Expose 'button'
 */

module.exports = function(data) {
  return vomit`<button>${data}</button>`
}
