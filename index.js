module.exports = CrowdClient

function CrowdClient(opts) {
  this.workers = []
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
  return workers[id || 0]
}

CrowdClient.prototype.get = function() {
  var _this = this

  this.interface
    .get()
      .success(function(task) {
        _this.getWorker(task, _this.send)
      })
      .failure(function(error) {
        console.log(error)
      })

}

CrowdClient.prototype.send = function(result) {
  this.interface
    .send(data)
      .success(function(task) {
        _this.getWorker(task, _this.send)
      })
      .failure(function(error) {
        console.log(error)
      })
}