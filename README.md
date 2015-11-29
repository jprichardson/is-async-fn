is-async-fn
===========

Check if something is an [ES7/ES2016 async/await](http://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html) function.
i.e. It checks if the function was defined with the `async` keyword. It **does NOT** attempt to detect if the function is a traditional asynchronous function with a callback.

Compatible with code transformed with Babel 5 and Babel 6.


Install
-------

    npm i --save is-async-fn


Usage
-----

```js
import isAsyncFn from 'is-async-fn'

console.log(isAsyncFn(function () {})) // => false
console.log(isAsyncFn(async function () {})) // => true
```


License
-------

MIT

Copyright (c) [JP Richardson](https://github.com/jprichardson)