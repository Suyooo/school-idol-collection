import Card from "../models/card/card";
import Language from "../types/language";
import DB from "../models/db";

const annotationPattern = /^(.){{(.*?):(.*?)}}(.)/;

function makeAnnotation(type: string, param: string, lang: Language): AbstractAnnotation | undefined {
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
    return undefined;
}

abstract class AbstractAnnotation {
    readonly param: string;

    protected constructor(param: string) {
        this.param = param;
    }

    abstract getPlainText(): Promise<string>;

    abstract getHTMLText(): Promise<string>;

    abstract getHTMLLink(): Promise<string>;
}

class AnnotationCard extends AbstractAnnotation {
    private card: Card | undefined | null;
    private readonly lang: Language;

    constructor(cardNo: string, lang: Language) {
        super(cardNo);
        this.lang = lang;
    }

    private async loadCard(): Promise<void> {
        if (this.card === undefined) this.card = await DB.Card.scope([{method: ["id", parseInt(this.param)]}, "forLink"]).findOne();
    }

    async getHTMLLink() {
        await this.loadCard();
        if (this.card == undefined) return "???";
        return "/card/" + this.card.cardNo + "/";
    }

    async getPlainText() {
        await this.loadCard();
        if (this.card == undefined) return "???";
        return "#" + this.card.id + " " + (this.lang == Language.ENG ? this.card.nameEng : this.card.name);
    }

    async getHTMLText() {
        await this.loadCard();
        if (this.card == undefined) return "???";
        return "<span class='card-id'>#" + this.card.id + "</span> " + (this.lang == Language.ENG ? this.card.nameEng : this.card.name);
    }
}

class AnnotationSong extends AbstractAnnotation {
    constructor(costumeName: string) {
        super(costumeName);
    }

    async getHTMLLink() {
        return "/search/song/name:" + encodeURIComponent(this.param).replace(/'/g, "%27") + "/";
    }

    async getPlainText() {
        return this.param;
    }

    getHTMLText = this.getPlainText;
}

class AnnotationMem extends AbstractAnnotation {
    constructor(costumeName: string) {
        super(costumeName);
    }

    async getHTMLLink() {
        return "/search/memory/name:" + encodeURIComponent(this.param).replace(/'/g, "%27") + "/";
    }

    async getPlainText() {
        return this.param;
    }

    getHTMLText = this.getPlainText;
}

class AnnotationCostume extends AbstractAnnotation {
    constructor(costumeName: string) {
        super(costumeName);
    }

    async getHTMLLink() {
        return "/search/member/costume:" + encodeURIComponent(this.param).replace(/'/g, "%27") + "/";
    }

    async getPlainText() {
        return this.param;
    }

    getHTMLText = this.getPlainText;
}

class AnnotationSkillText extends AbstractAnnotation {
    constructor(skillText: string) {
        super(skillText);
    }

    async getHTMLLink() {
        return "/search/card/skill:" + encodeURIComponent(this.param).replace(/'/g, "%27") + "/";
    }

    async getPlainText() {
        return this.param;
    }

    getHTMLText = this.getPlainText;
}

const Annotation = {
    AbstractAnnotation, makeAnnotation, annotationPattern
};
export default Annotation;