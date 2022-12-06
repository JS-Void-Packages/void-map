# void-map
VoidMap is a Java style map written in javascript.
## instalation 
`npm install void-map`
## example
```js
// import { VoidMap } from 'void-map';
const { VoidMap } = require('void-map');

let map = new VoidMap();

map.put("are", 10);
map.put("you", 9);
map.put("sure", 8);

// log the keys and values
for(let [key, value] of map.entries()) {
    console.log(key, value);
}

// filter the map with values > 10
let filter = map.filter((key, value, index) => value>10);
filter.forEach(console.log);
```