const { List } = require("void-list")

class VoidMap {
    /**
     * @type {List}
     */
    #keys = new List()

    /**
     * @type {List}
     */
    #values = new List()

    /**
     * Create a new voidmap
     */
    constructor() {}

    #validate() {
        let keySize = this.#keys.size();
        let valueSize = this.#values.size();

        if(keySize === valueSize) {
            return;
        }
        else {
            throw new RangeError("this map's keys and values do not have the same size.");
        }
    }

    /**
     * Return a json map of this map
     */
    toJson() {
        let json = {};
        for(let [key, value] of this.entries()) {
            json[key] = value;
        }

        return json;
    }

    static fromJson(json) {
        let map = new VoidMap();
        for(let [key, value] of Object.entries(json)) {
            map.put(key, value);
        }

        return map;
    }

    /**
     * 
     * @param {List|any[]} keys 
     * @param {List|any[]} values 
     */
    from(keys, values) {
        if(keys instanceof List && values instanceof List) {
            if(keys.size() != values.size()) {
                throw new RangeError("Error! You have more keys or values than keys or values. you need the same number of keys/values!")
            }
            this.#keys.fromList(keys);
            this.#values.fromList(values);
        }
        else if(Array.isArray(keys) && Array.isArray(values)) {
            if(keys.length != values.length) {
                throw new RangeError("Error! You have more keys/values than keys/values. you need the same number of keys/values!")
            }
            this.#keys.fromArray(keys);
            this.#values.fromArray(values);
        }
        // check the values are 
        this.#validate();
    }

    containKey(key) {
        return this.#keys.contain(key);
    }

    containValue(key) {
        return this.#values.contain(key);
    }

    keys() {
        return this.#keys;
    }

    values() {
        return this.#values;
    }

    get(key) {
        let index = this.#keys.indexOf(key);
        if(index == -1) {
            throw new RangeError(`Key ${key} does not exist in the map`);
        }
        return this.#values.get(index);
    }

    /**
     * get a value from a predicate
     * @param {(List<any>) => any} predicate 
     * @returns 
     */
    getValue(predicate) {
        return this.get(predicate(this.#keys));
    }

    put(key, value) {
        this.#validate();
        this.#keys.add(key);
        this.#values.add(value);
    }

    remove(key) {
        this.#validate();
        let index = this.#keys.indexOf(key);
        this.#keys.remove(index);
        this.#values.remove(index);
    }

    /**
     * @param {(key:any, value:any, index:number) => boolean} predicate 
     */
    forEach(predicate) {
        this.#validate()
        for(let i = 0; i<this.#keys.size(); i++) {
            let key = this.#keys.get(i)
            let value = this.#values.get(i)
            predicate(key, value, i)
        }
    }

    /**
     * @param {(key:any, value:any, index:number) => boolean} predicate 
     */
    filter(predicate) {
        let map = new VoidMap();
        this.#validate()
        for(let i = 0; i<this.#keys.size(); i++) {
            let key = this.#keys.get(i);
            let value = this.#values.get(i);
            if(predicate(key, value, i)) {
                map.put(key, value);
            }
        }
        return map
    }

    /**
     * @returns {List<[any, any]>}
     */
     entries() {
        let list = new List()
        for(let i = 0; i<this.#keys.size(); i++) {
            let key = this.#keys.get(i);
            let value = this.#values.get(i);
            list.add([key, value]);
        }
        return list
    }

    /**
     * @param {(key:any, value:any, index:number) => any} predicate 
     */
    map(predicate) {
        let list = new List()
        for(let i = 0; i<this.#keys.size(); i++) {
            let key = this.#keys.get(i);
            let value = this.#values.get(i);
            list.add(predicate(key, value, i));
        }
    }

    /**
     * @param {(key:any, value:any, index:number) => [any, any]} predicate 
     */
     mapToMap(predicate) {
        let m = new VoidMap()
        for(let i = 0; i<this.#keys.size(); i++) {
            let key = this.#keys.get(i);
            let value = this.#values.get(i);
            let predi = predicate(key, value, i);
            m.put(predi[0], predi[1]);
        }
    }
}

module.exports = {
    VoidMap
}