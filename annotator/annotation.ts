import {loadCardsFromId} from "../cards/loader";
import UnimplementedError from "../errors/unimplemented";
import {Card} from "../models/card/card";
import Language from "../consts/language";

const annotationPattern = /(.){{(.*?):(.*?)}}(.)/g;

function getAnnotation(type: string, param: string, lang: Language): AbstractAnnotation {
    if (type == "card") {
        return new AnnotationCard(param, lang);
    } else if (type == "song") {
        return new AnnotationSong(param);
    } else if (type == "mem") {
        return new AnnotationMem(param);
    } else if (type == "costume") {
        return new AnnotationCostume(param);
    } else if (type == "skilltext") {
        return new AnnotationSkillText(param);
    }
    throw new UnimplementedError("Unknown annotation type " + type);
}

abstract class AbstractAnnotation {
    readonly param: string;

    protected constructor(param: string) {
        this.param = param;
    }

    abstract getPlainText(): string;

    abstract getHTMLText(): string;

    abstract getHTMLLink(): string;
}

class AnnotationCard extends AbstractAnnotation {
    private card: Card | undefined | null;
    private readonly lang: Language;

    constructor(cardNo: string, lang: Language) {
        super(cardNo);
        this.lang = lang;
    }

    private assertCard(): void {
        if (this.card == null) this.card = loadCardsFromId(Number(this.param))[0];
    }

    getHTMLLink(): string {
        this.assertCard();
        if (this.card == undefined) return "???";
        return "/card/" + this.card.cardno + "/";
    }

    getPlainText(): string {
        this.assertCard();
        if (this.card == undefined) return "???";
        return "#" + this.card.id + " " + (this.lang == Language.ENG ? this.card.nameEn : this.card.name);
    }

    getHTMLText(): string {
        this.assertCard();
        if (this.card == undefined) return "???";
        return "<span class='card-id'>#" + this.card.id + "</span> " + (this.lang == Language.ENG ? this.card.nameEn : this.card.name);
    }
}

class AnnotationSong extends AbstractAnnotation {
    constructor(costumeName: string) {
        super(costumeName);
    }

    getHTMLLink(): string {
        return "/search/song/name/" + encodeURIComponent(this.param).replace(/'/g, "%27");
    }

    getPlainText(): string {
        return this.param;
    }

    getHTMLText: () => string = this.getPlainText;
}

class AnnotationMem extends AbstractAnnotation {
    constructor(costumeName: string) {
        super(costumeName);
    }

    getHTMLLink(): string {
        return "/search/memory/name/" + encodeURIComponent(this.param).replace(/'/g, "%27");
    }

    getPlainText(): string {
        return this.param;
    }

    getHTMLText: () => string = this.getPlainText;
}

class AnnotationCostume extends AbstractAnnotation {
    constructor(costumeName: string) {
        super(costumeName);
    }

    getHTMLLink(): string {
        return "/search/member/costume/" + encodeURIComponent(this.param).replace(/'/g, "%27");
    }

    getPlainText(): string {
        return this.param;
    }

    getHTMLText: () => string = this.getPlainText;
}

class AnnotationSkillText extends AbstractAnnotation {
    constructor(skillText: string) {
        super(skillText);
    }

    getHTMLLink(): string {
        return "/search/card/skill/" + encodeURIComponent(this.param).replace(/'/g, "%27");
    }

    getPlainText(): string {
        return this.param;
    }

    getHTMLText: () => string = this.getPlainText;
}

const Annotation = {
    AbstractAnnotation, makeAnnotation: getAnnotation, annotationPattern
};
export default Annotation;