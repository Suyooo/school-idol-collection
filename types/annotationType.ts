export type AnnotationTypeKey = "card" | "song" | "mem" | "costume" | "skilltext";
export type AnnotationTypeID = 0 | 1 | 2 | 3 | 4;
type MappedValue = AnnotationTypeID | AnnotationTypeKey;

export default class AnnotationType {
    readonly id: AnnotationTypeID;
    readonly key: AnnotationTypeKey;

    private constructor(map: Map<MappedValue, AnnotationType>,
                        id: AnnotationTypeID, key: AnnotationTypeKey) {
        this.id = id;
        this.key = key;

        map.set(id, this);
        map.set(key, this);
    }

    private static readonly map = (() => {
        const map = new Map<MappedValue, AnnotationType>();

        new AnnotationType(map, 0, "card");
        new AnnotationType(map, 1, "song");
        new AnnotationType(map, 2, "mem");
        new AnnotationType(map, 3, "costume");
        new AnnotationType(map, 4, "skilltext");

        return map;
    })();

    static get(key: AnnotationTypeKey): AnnotationType {
        return AnnotationType.map.get(key)!;
    }
}