# crowd-express

Generic client for [Crowd](https://github.com/nicola/crowd) that gets tasks, execute them and get to the next task.

> **Warning**: this is very experimantal - in case you get it to work, you might feel "double rainbow all the way".

## Usage

Ideally, one should be able to do so:

```javascript
var worker = require('crowd-webworker')
var crowd = require('crowd-client')
var rest = require('crowd-rest')

client(opts)
  .use(rest('http://127.0.0.1:1200'))
  .pipe(worker())
```

What happens in the worker is that the `task` function is retrieved from the `crowd-client`, evaluated and executed.