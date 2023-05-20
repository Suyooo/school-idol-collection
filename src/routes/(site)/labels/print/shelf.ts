export default class Shelving<T> {
    readonly maxWidth: number;
    readonly shelves: Shelf<T>[] = [];

    public constructor(maxWidth: number) {
        this.maxWidth = maxWidth;
    }

    public add(newItemKey: T, newItemWidth: number, newItemHeight: number) {
        let previousLoopBestEmptyArea = undefined;
        while (true) {
            const emptyAreas = this.shelves.map((s) => s.getLowestEmptyAreaFor(newItemWidth, newItemHeight));
            const best = emptyAreas.reduce((bestRes, res) => {
                if (res !== undefined && (bestRes === undefined || res.emptyArea < bestRes.emptyArea)) {
                    return res;
                } else {
                    return bestRes;
                }
            }, undefined);

            if (
                best === undefined ||
                (previousLoopBestEmptyArea !== undefined &&
                    best.toReplaceOrNull !== null &&
                    best.emptyArea >= previousLoopBestEmptyArea)
            ) {
                // Create a new shelf if the item fits nowhere or if preventing an endless replacing loop
                const newShelf = new Shelf<T>(this.maxWidth);
                newShelf.addOrReplace(newItemKey, newItemWidth, newItemHeight, null);
                this.shelves.push(newShelf);
                return;
            } else {
                // Add/replace to existing shelf, end loop if it was an add operation
                const ret = best.shelf.addOrReplace(newItemKey, newItemWidth, newItemHeight, best.toReplaceOrNull);
                if (ret === undefined) return;
                previousLoopBestEmptyArea = best.emptyArea;
                ({ key: newItemKey, width: newItemWidth, height: newItemHeight } = ret);
            }
        }
    }

    public get(): T[][] {
        return this.shelves.map((s) => s.get());
    }
}

function calcEmptyArea(maxWidth: number, items: { width: number; height: number }[]) {
    let area = Math.max(...items.map((i) => i.height)) * maxWidth;
    for (const item of items) {
        area -= item.width * item.height;
    }
    return area;
}

class Shelf<T> {
    readonly shelf: Item<T>[] = [];
    maxWidth: number;
    freeWidth: number;
    biggestHeight: number;
    emptyArea: number;

    public constructor(maxWidth: number) {
        this.maxWidth = this.freeWidth = maxWidth;
        this.emptyArea = this.biggestHeight = 0;
    }

    public getLowestEmptyAreaFor(newItemWidth: number, newItemHeight: number) {
        let lowestEmptyArea: number | undefined;
        let toReplaceOrNull: T | null | undefined;

        if (this.freeWidth >= newItemWidth) {
            lowestEmptyArea = calcEmptyArea(this.maxWidth, [
                ...this.shelf,
                { width: newItemWidth, height: newItemHeight },
            ]);
            toReplaceOrNull = null;
        }

        for (const item of this.shelf) {
            if (
                (item.width < newItemWidth ||
                    Math.abs(item.height - this.biggestHeight) > Math.abs(newItemHeight - this.biggestHeight)) &&
                this.freeWidth + item.width >= newItemWidth
            ) {
                const testEmptyArea = calcEmptyArea(this.maxWidth, [
                    ...this.shelf.filter((i) => i !== item),
                    { width: newItemWidth, height: newItemHeight },
                ]);
                if (lowestEmptyArea === undefined || testEmptyArea < lowestEmptyArea) {
                    lowestEmptyArea = testEmptyArea;
                    toReplaceOrNull = item.key;
                }
            }
        }

        if (lowestEmptyArea === undefined) {
            return undefined;
        } else {
            return { shelf: this, emptyArea: lowestEmptyArea, toReplaceOrNull: toReplaceOrNull! };
        }
    }

    public addOrReplace(newItemKey: T, newItemWidth: number, newItemHeight: number, toReplaceOrNull: T | null) {
        let toReturn = undefined;
        if (toReplaceOrNull !== null) {
            const itemIdx = this.shelf.findIndex((it) => it.key === toReplaceOrNull);
            if (itemIdx === -1) throw new Error("toReplaceOrNull is not an item on this shelf");
            toReturn = this.shelf[itemIdx];
            this.shelf.splice(itemIdx, 1);
            this.freeWidth += toReturn.width;
        }

        this.shelf.push({ key: newItemKey, width: newItemWidth, height: newItemHeight });
        this.freeWidth -= newItemWidth;
        this.biggestHeight = Math.max(...this.shelf.map((i) => i.height));
        this.emptyArea = calcEmptyArea(this.maxWidth, this.shelf);
        return toReturn;
    }

    public get(): T[] {
        return this.shelf.map((s) => s.key);
    }
}

interface Item<T> {
    key: T;
    width: number;
    height: number;
}
