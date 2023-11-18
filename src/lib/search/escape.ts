/*
 * Special escaping logic
 * Slashes are encoded as %2F by encodeURIComponent, however, the server endpoint cannot distinguish between encoded and
 * unencoded slashes, since the [...query] rest parameter is delivered as the full unescaped string.
 * Solution: replace them with "_s". Underscores are replaced with "__" to differentiate.
 */

export function escapeForSearch(s: string) {
	return encodeURIComponent(s).replace(/_/g, "__").replace(/%2F/g, "_s");
}

export function unescapeForSearch(s: string) {
	return decodeURIComponent(s.replace(/(?<!_)_s/g, "/").replace(/__/g, "_"));
}
