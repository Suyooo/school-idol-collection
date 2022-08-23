export type AnnotationKey = "card" | "song" | "mem" | "costume" | "skilltext";
export type AnnotationID = 0 | 1 | 2 | 3 | 4;
type MappedValue = AnnotationID | AnnotationKey;

export default class AnnotationType {
    readonly id: AnnotationID;
    readonly key: AnnotationKey;

    private constructor(map: Map<MappedValue, AnnotationType>,
                        id: AnnotationID, key: AnnotationKey) {
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

    static get(key: AnnotationKey): AnnotationType {
        return AnnotationType.map.get(key) as AnnotationType;
    }
}