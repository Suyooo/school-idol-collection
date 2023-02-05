export default class Shelving<T> {
    readonly maxSize: number;
    readonly shelves: Shelf<T>[] = [];

    public constructor(maxSize: number) {
        this.maxSize = maxSize;
    }

    public add(newItemKey: T, newItemSize: number) {
        let previousLoopBestRestSize = undefined;
        while (true) {
            const restSizes = this.shelves.map(s => s.getLowestRestSizeFor(newItemSize));
            const best = restSizes.reduce((bestRes, res) => {
                if (res !== undefined && (bestRes === undefined || res.restSize < bestRes.restSize)) {
                    return res;
                } else {
                    return bestRes;
                }
            }, undefined);

            if (best === undefined || (previousLoopBestRestSize !== undefined && best.toReplaceOrNull !== null && best.restSize >= previousLoopBestRestSize)) {
                // Create a new shelf if the item fits nowhere or if preventing an endless replacing loop
                const newShelf = new Shelf<T>(this.maxSize);
                newShelf.addOrReplace(newItemKey, newItemSize, null);
                this.shelves.push(newShelf);
                return;
            } else {
                // Add/replace to existing shelf, end loop if it was an add operation
                const ret = best.shelf.addOrReplace(newItemKey, newItemSize, best.toReplaceOrNull);
                if (ret === undefined) return;
                previousLoopBestRestSize = best.restSize;
                ({key: newItemKey, size: newItemSize} = ret);
            }
        }
    }

    public get(): T[][] {
        return this.shelves.map(s => s.get());
    }
}

class Shelf<T> {
    readonly shelf: Item<T>[] = [];
    freeSize: number;

    public constructor(maxSize: number) {
        this.freeSize = maxSize;
    }

    public getLowestRestSizeFor(newItemSize: number) {
        let lowestRestSize: number | undefined;
        let toReplaceOrNull: T | null | undefined;

        if (this.freeSize >= newItemSize) {
            lowestRestSize = this.freeSize - newItemSize;
            toReplaceOrNull = null;
        }

        for (const item of this.shelf) {
            if (item.size < newItemSize && this.freeSize + item.size >= newItemSize) {
                const testSize = this.freeSize + item.size - newItemSize;
                if (lowestRestSize === undefined || testSize < lowestRestSize) {
                    lowestRestSize = testSize;
                    toReplaceOrNull = item.key;
                }
            }
        }

        if (lowestRestSize === undefined) {
            return undefined;
        } else {
            return {shelf: this, restSize: lowestRestSize, toReplaceOrNull: toReplaceOrNull!};
        }
    }

    public addOrReplace(newItemKey: T, newItemSize: number, toReplaceOrNull: T | null) {
        let toReturn = undefined;
        if (toReplaceOrNull !== null) {
            const itemIdx = this.shelf.findIndex(it => it.key === toReplaceOrNull);
            if (itemIdx === -1) throw new Error("toReplaceOrNull is not an item on this shelf");
            toReturn = this.shelf[itemIdx];
            this.shelf.splice(itemIdx, 1);
            this.freeSize += toReturn.size;
        }

        this.shelf.push({key: newItemKey, size: newItemSize});
        this.freeSize -= newItemSize;
        return toReturn;
    }

    public get(): T[] {
        return this.shelf.map(s => s.key);
    }
}

interface Item<T> { key: T, size: number }