module.exports = function isAsyncFn (fn) {
  // is it at least a function?
  if (typeof fn !== 'function') return false

  // is it actual ES7 async function? (as of Nov-2015, no JS-runtime supports this yet)
  // https://tc39.github.io/ecmascript-asyncawait/#async-function-constructor-properties
  if (fn.constructor && fn.constructor.name === 'AsyncFunction') return true

  // check if Babel
  return isAsyncFnBabel5(fn)
    ? true
    : isAsyncFnBabel6(fn)
}

// very hacky
function isAsyncFnBabel5 (fn) {
  var fnname = fn.name.replace(/\$/g, '\\$')
  var str = '\n.+return regeneratorRuntime.async\\(function ' + fnname
  return !!fn.toString().match(str)
}

// very hacky, this feels like a horrible solution
function isAsyncFnBabel6 (fn) {
  var fnStr = fn.toString()
  // 2nd condition is for anonymous async
  return !!fnStr.match('return ref.apply\\(this, arguments\\);') || !!fnStr.match('var gen = fn.apply\\(this, arguments\\);')
}
