import CardType from "../../cards/cardType";
import DB from "../../utils/db";
import {Card} from "../../models/card/card";
import {loadCardFromRow} from "../../cards/loader";

export default function CardSearch(search: { "column": string, "cond": string | number }[]): Card[] {
    let q = "SELECT * FROM cards";
    if (search.length > 0) {
        q += " WHERE " + search.map(s => s.column + " = ?").join(" AND ");
    }
    q += " ORDER BY id";
    return DB.prepare(q).all(...search.map(s => s.cond)).map(r => loadCardFromRow(r)).filter(r => r != undefined) as Card[];
}

const getEnName = DB.prepare("SELECT cards_translation_name.name as engName FROM cards_translation_name JOIN cards ON cards.cardno = cards_translation_name.cards_m_cardno WHERE cards.name = ?");
export function getName(obj: { name: string; type: CardType }): string {
    const n = getEnName.get(obj.name)?.engName;
    if (n == undefined) throw new Error("Unknown Name Type " + obj.type + ": " + obj.name);
    return n;
}