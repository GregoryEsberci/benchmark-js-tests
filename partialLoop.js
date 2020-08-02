const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

Benchmark.prototype.setup = function() {
  const rules = Array(10000).fill(('teste'))
  rules[10001] = 'achou!'
}

suite.add('forEach break', function() {
  let result = '';
  
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (rule !== 'teste') {
      result = rule;
      break
    }
  }
})
.add('forEach continue', function() {
  let result = '';
  
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (rule === 'teste') continue

    result = rule;
    break
  }
})
.add('while break', function() {
  let result = '';
  let i = 0;

  while(i < rules.length) {
    const rule = rules[i];

    if (rule !== 'teste') {
      result = rule;
      break
    }
    i++
  }
})
.add('while continue', function() {
  let result = '';
  let i = 0;

  while(i < rules.length) {
    const rule = rules[i];

    i++
    if (rule === 'teste') continue

    result = rule;
    break
  }
})
.on('error', function(error) {
  this.abort()
  console.error(`Error in: ${error.target.name}`)
  console.error(error.target.error)
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is: ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });
