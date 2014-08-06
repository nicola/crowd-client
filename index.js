module.exports = CrowdClient

function CrowdClient(opts) {
  this.workers = []
  this.interface = null;
  // handle opts like credential or id
  return this
}

CrowdClient.prototype.use = function(interface) {
  this.interface = interface

  return this
}

CrowdClient.prototype.pipe = function(worker) {
  this.workers.push(worker)

  return this
}

CrowdClient.prototype.getWorker = function(id) {
  // For now just return first worker in the list
  return this.workers[id || 0]
}

CrowdClient.prototype.parseTask = function(raw) {

  task = JSON.parse(raw)
  try {
    task.data = JSON.parse(task.data)
  } catch(err) {
    // it is fine, task data will be the same
  }
  task.code = this.eval(task.code)

  return task

}

CrowdClient.prototype.get = function(cb) {

  var client = this

  this.interface.get(function(err, raw) {
    if (err) throw new Error(err)
    if (cb) cb(null, client.parseTask(raw))
  })

  return this
}

CrowdClient.prototype.send = function(result, cb) {
  
  var client = this

  this.interface.send(result, function(err, raw) {
    if (err) throw new Error(err)
    if (cb) cb(null, client.parseTask(raw))
  })

  return this
}

CrowdClient.prototype.eval = function (code) {
  var body = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
  return new Function("data", "next", body)
}

CrowdClient.prototype.start = function (opts, cb) {


  this.get(this.runTask(opts, cb))

  return this
}

CrowdClient.prototype.runTask = function(opts, cb) {
  var client = this
  if (typeof opts == "function") cb = opts

  return function(err, task) {
    if (opts === true) cb = client.runTask(opts, cb)
    if (err) throw new Error(err)

    var worker = client.getWorker()
    worker.start(task, function(err, result) {
      client.send(result, cb)
    })
  }
}