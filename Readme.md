# concur [![Build Status](https://travis-ci.org/nathan7/concur.png?branch=master)](https://travis-ci.org/nathan7/concur)

  lightweight generator/promise utility

## Installation

    $ npm install concur

  or

    $ component install nathan7/concur

## Example

## API

### Concur(function\*(...)) -> function(...)

  Returns a wrapped function.
  It'll return a promise for the return value of the generator.

```
$('#button').click(Concur(function*() {
  var data = yield $.ajax(url)
  $('#result').html(data)
  var status = $('#status').html('Download complete.')
  yield status.fadeIn().promise()
  yield sleep(2000)
  status.fadeOut()
}))
```

#### Concur.run(function\*())

  Equivalent to `Concur(fn)()`.

### Sync(function\*(...)) - > function(...)

  A shim that just passes yielded values back in.
  The synchronous analogue of Concur.
  Given a synchronous analogue of Concur and synchronous analogues of the other stuff you use, you can really easily implement sync and async versions of your code in one go.
  For an example, see [mkdirp.js](mkdirp.js).

#### Sync.run(function\*())

  Equivalent to `Sync(fn)()`.

## License

  MIT

