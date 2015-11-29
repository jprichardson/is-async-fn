module.exports = function isAsyncFn (fn) {
  // is it at least a function?
  if (typeof fn !== 'function') return false

  // is it actual ES7 async function? (as of Nov-2015, no JS-runtime supports this yet)
  // https://tc39.github.io/ecmascript-asyncawait/#async-function-constructor-properties
  if (fn.constructor && fn.constructor.name === 'AsyncFunction') return true

  var fnStr = fn.toString()

  // check if Babel
  return isAsyncFnBabel5(fn, fnStr) || isAsyncFnBabel6(fn, fnStr)
}

// very hacky
function isAsyncFnBabel5 (fn, fnStr) {
  var fnname = fn.name.replace(/\$/g, '\\$')
  var str = '\n.+return regeneratorRuntime.async\\(function ' + fnname
  return !!fnStr.match(str)
}

// very hacky, this feels like a horrible solution
function isAsyncFnBabel6 (fn, fnStr) {
  // 2nd condition is for anonymous async
  return !!fnStr.match('return ref.apply\\(this, arguments\\);') || !!fnStr.match('var gen = fn.apply\\(this, arguments\\);')
}
