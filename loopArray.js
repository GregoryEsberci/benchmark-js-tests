const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

Benchmark.prototype.setup = () => {
  const arr = Array(10000).fill(null)
}

suite.add('for - length in variable', function() {
  const { length } = arr;

  for (let i = 0; i < length; i++) {
    const v = arr[i];
  };
})
.add('for - direct length', function() {
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
  }
})
.add('while - length in variable', function() {
  const { length } = arr;
  let i = 0;

  while (i < length) {
    const v = arr[i];
    i++;
  }
})
.add('while - direct length', function() {
  let i = 0;
  while (i < arr.length) {
    const v = arr[i];
    i++;
  }
})
.add('map', function() {
  arr.map((v) => v);
})
.add('forEach', function() {
  arr.forEach((v) => v);
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
