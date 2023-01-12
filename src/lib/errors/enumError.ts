export default class EnumError extends Error {
    constructor(name: string, lookup: string, query: any) {
        super(`Can't find value for enum ${name}: looking up "${query}" as ${lookup}`);
    }
}