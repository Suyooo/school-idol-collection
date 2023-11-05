const specialCharactersRegex = /[-[\]{}()*+?.,\\^$|#]/g;
const isIntegerRegex = /^\d+$/;
const isHexColorRegex = /^#[0-9a-fA-F]{6}$/;

export function toNumWithFullwidth(fw: string): number {
	return parseInt(fw.normalize("NFKC"));
}

export function escapeForRegex(s: string): string {
	return s.replace(specialCharactersRegex, "\\$&");
}

export function escapeForUrl(s: string): string {
	return encodeURIComponent(s).replace(/'/g, "%27");
}

export function uppercaseFirst(s: string): string {
	return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
}

export function stringIsInteger(s: string): boolean {
	return isIntegerRegex.test(s);
}

export function stringIsHexColor(s: string): boolean {
	return isHexColorRegex.test(s);
}
