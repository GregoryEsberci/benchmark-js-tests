const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

Benchmark.prototype.setup = () => {
  const object = {}

  for (let i = 0; i < 30; i++) {
    object[i] = i
  }
}

suite.add('for in', function() {
  const object2 =  {}
  
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      object2[key] = value
    }
  }

  return object2
})
.add('getOwnPropertyNames', function() {
  const keys = Object.getOwnPropertyNames(object)
  const object2 =  {}

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];
    object2[key] = value
  }

  return object2
})
.add('keys', function() {
  const keys = Object.keys(object)
  const object2 =  {}

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];
    object2[key] = value
  }

  return object2
})
.add('entries', function() {
  const entries = Object.entries(object)
  const object2 =  {}

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    object2[key] = value
  }

  return object2
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