/**
 * Component dependencies.
 */

 var vomit = require('vomit')

 /**
  * Expose olivier component
  *
  * @param {Object} data
  * @api public
  */

 module.exports = function(data) {
   var rainbow = vomit(list)

  var arr = data.rainbow
  setInterval(function() {
    var random = Math.floor(Math.random() * arr.length) + 1
    rainbow(arr.slice(0, random), data.expanded)
  }, 500)


  return vomit`<div>
    <button>${data.label}</button>
    ${rainbow(arr)}
  </div>`
 }


 /**
  * List component.
  *
  * @param {Array} arr
  * @param {Element}
  */

 function list(arr, bool) {
   return vomit`
     <ul aria-hidden="${!bool}">${arr.map(item => {
       return vomit`<li style="background:${item};">${item}</li>`
     })}</ul>
   `
 }
