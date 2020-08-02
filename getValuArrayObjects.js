const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

Benchmark.prototype.setup = () => {
  const array = Array(20).fill({ key: 'teste'})
}

suite.add('for - push', function() {
  const arrayKeys = [];
  const { length } = array
  for (let i = 0; i < length; i++) arrayKeys.push(array[i].key);
})
.add('for - index', function() {
  const arrayKeys = [];
  const { length } = array
  for (let i = 0; i < length; i++) arrayKeys[i] = array[i].key;
})
.add('map classic', function() {
  const arrayKeys = array.map((v) => v.key);
})
.add('map desconstructor', function() {
  const arrayKeys = array.map(({ key }) => key);
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