import Log from "../utils/logger";

const cardLinkTitlePattern = /[【「](\d*?) [^{}]*?[】」]/g;
const cardLinkSongNamePattern = /「([^{}]*?)」の《ライブ》に参加/g;
const cardLinkCostumeNamePatternA = /ライブ衣装が「([^{}]*?)」/g;
const cardLinkCostumeNamePatternB = /「([^{}]*?)」のライブ衣装/g;
const cardLinkSkillContainsA = /スキルに「([^{}]*?)」/g;
const cardLinkSkillContainsB = /スキルで『([^{}]*?)』/g;

export default function autoAnnotateSkill(skill: string): { skill: string, song: string[], costume: string[] } {
    const res: { skill: string, song: string[], costume: string[] } = {
        skill: "", song: [] as string[], costume: [] as string[]
    };

    skill = skill.replace(cardLinkTitlePattern, "「{{card:$1}}」");
    skill = skill.replace(cardLinkSongNamePattern, (match, song) => {
        res.song.push(song);
        return "「{{song:" + song + "}}」の《ライブ》に参加";
    });
    skill = skill.replace(cardLinkCostumeNamePatternA, (match, costume) => {
        res.costume.push(costume);
        return "ライブ衣装が「{{costume:" + costume + "}}」";
    });
    skill = skill.replace(cardLinkCostumeNamePatternB, (match, costume) => {
        res.costume.push(costume);
        return "「{{costume:" + costume + "}}」のライブ衣装";
    });
    skill = skill.replace(cardLinkSkillContainsA, "スキルに「{{skilltext:$1}}」");
    skill = skill.replace(cardLinkSkillContainsB, "スキルで『{{skilltext:$1}}』");

    res.skill = skill;
    return res;
}