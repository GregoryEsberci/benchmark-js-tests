const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

Benchmark.prototype.setup = () => {
  const array = Array(20).fill('teste')

  array[15] = 'achou!'
}

suite.add('indexOf', function() {
  array.indexOf('achou!') > -1;
})
.add('includes', function() {
  array.includes('achou!');
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