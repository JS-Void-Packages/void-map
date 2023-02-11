const { VoidMap } = require('../dist/index')
/**
 * @type {VoidMap<string, number>}
 */
let map = new VoidMap()

map.put("are", 10)
map.put("you", 9)
map.put("sure", 8)

// log the keys and values
for(let [key, value] of map.entries()) {
    console.log(key, value)
}
map.values().forEach(console.log)

// filter the map with values > 10
let filter = map.filter((key, value, index) => value>10)
filter.mapToMap((key, value) => [ {key}, {value} ]);