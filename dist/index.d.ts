import List from "void-list";

export class VoidMap<K, V> {

    /**
     * Return true if the map contain the key
     */
    containKey(key: K): boolean

    /**
     * Return true if the map contain the value
     */
    containValue(value: V): boolean

    /**
     * Return a list containing all the map keys
     */
    keys(): List<K>

    /**
     * Return a list containing all the map values
     */
    values(): List<V>

    /**
     * Call the predicate for each element in the map
     * @param predicate 
     */
    forEach(predicate:(key: K, value: V, index: number) => void): void

    /**
     * Filter the map based on the predicate
     * @param predicate 
     */
    filter(predicate: (key: K, value: V, index: number) => boolean): VoidMap<K, V>

    /**
     * remove the element with this key
     * @param key 
     */
    remove(key: K): V

    /**
     * Put a key/value pair in the map
     * @param key 
     * @param value 
     */
    put(key: K, value: V): void

    /**
     * Get the value for this key
     * @param key 
     */
    get(key: K): V

    /**
     * get the value that match the predicate
     * @param predicate 
     */
    getValue(predicate: (keys: List<K>) => K): V

    /**
     * Return a list of key/value pair array
     */
    entries(): List<[K, V]>

    /**
     * Calls a defined predicate function on each element of a map, and returns a list that contains the results.
     * @param predicate 
     */
    map<U>(predicate: (key: K, value: V, index: number) => U): List<U>

    /**
     * Calls a defined predicate function on each element of a map, and returns a map that contains the results.
     * @param predicate 
     */
    mapToMap<U, M>(predicate: (key: K, value: V, index: number) => [U, M]): VoidMap<U, M>
}