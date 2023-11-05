export function mapGet<K, V>(map: Map<K, V>, key: K): V {
	const ret = map.get(key);
	if (ret === undefined) {
		throw Error(`Key "${key}" does not exist in map`);
	} else {
		return ret;
	}
}
