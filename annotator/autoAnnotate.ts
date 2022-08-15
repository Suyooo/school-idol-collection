import Log from "../utils/logger";
import DB, {cardsRow} from "../utils/db";

const cardLinkTitlePattern = /[【「](\d*?) [^{}]*?[】」]/g;
const cardLinkSongNamePattern = /「([^{}]*?)」の《ライブ》に参加/g;
const cardLinkCostumeNamePatternA = /ライブ衣装が「([^{}]*?)」/g;
const cardLinkCostumeNamePatternB = /「([^{}]*?)」のライブ衣装/g;
const cardLinkSkillContainsA = /スキルに「([^{}]*?)」/g;
const cardLinkSkillContainsB = /スキルで『([^{}]*?)』/g;

const updateSkillStmt = DB.prepare("UPDATE cards SET skill = ? WHERE cardno = ?");

export default function autoAnnotateSkill(card: cardsRow): void {
    if (card.skill) {
        let skill = card.skill;
        skill = skill.replace(cardLinkTitlePattern, "「{{card:$1}}」");
        skill = skill.replace(cardLinkSongNamePattern, "「{{song:$1}}」の《ライブ》に参加");
        skill = skill.replace(cardLinkCostumeNamePatternA, "ライブ衣装が「{{costume:$1}}」");
        skill = skill.replace(cardLinkCostumeNamePatternB, "「{{costume:$1}}」のライブ衣装");
        skill = skill.replace(cardLinkSkillContainsA, "スキルに「{{skilltext:$1}}」");
        skill = skill.replace(cardLinkSkillContainsB, "スキルで『{{skilltext:$1}}』");
        if (skill.search(/「[^{]/) != -1) Log.warn("CHECK", card.cardno + ": " + skill.replace("\n", " | "));
        if (card.skill != skill) {
            updateSkillStmt.run(skill, card.cardno);
        }
    }
}