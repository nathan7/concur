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

## License

  MIT

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/nathan7/concur/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
