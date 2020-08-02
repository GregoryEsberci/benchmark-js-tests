const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

Benchmark.prototype.setup = () => {
  const object = {}

  for (let i = 0; i < 30; i++) {
    object[i] = i
  }
}

suite.add('descontructor', function() {
  const objectClone = { ...object }
})
.add('Object.assign', function() {
  const objectClone = Object.assign({}, object)
})

.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('error', function(error) {
  this.abort()
  console.error(`Error in: ${error.target.name}`)
  console.error(error.target.error)
})
.on('complete', function() {
  console.log('Fastest is: ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });