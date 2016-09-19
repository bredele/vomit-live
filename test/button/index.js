
/**
 * Button dependencies.
 */

var vomit = require('vomit')


/**
 * Expose 'button'
 */

module.exports = function(data) {
  var label = ''
  var expanded = false
  var content = ''
  if(data) {
    label = data.label
    expanded = data.expanded
    content = data.content
  }
  return element(label, content, expanded)
}


function element(label, content, expanded) {
  return vomit`<div><button aria-expanded="${expanded}">${label}</button><p aria-hidden="${!expanded}">${content}</p></div>`
}
