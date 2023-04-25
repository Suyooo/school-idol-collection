import {cardHasGroup, cardIsMember} from "$lib/card/types.js";
import type Card from "$models/card/card.js";
import {couldBeEntryCardNo, entryCardNoToCanonical} from "$lib/utils/entry.js";
import type {Actions} from "./$types.js";

export const actions = {
    default: async ({request, locals, fetch}) => {
        const data = await request.formData();
        const enteredCardNos = (data.get("cardNos") as string).toUpperCase()
            .split(/[ 　\n\r,、]/).filter(s => s.length > 0);
        const cardNos = enteredCardNos.filter(s => couldBeEntryCardNo(s)).map(s => entryCardNoToCanonical(s));
        const byCardNo: { [cardNo: string]: Card } = {};
        const byCardId: { [cardId: number]: Card } = {};
        const allRequiredGroupMembers: number[] = [];
        const invalidCardNos: string[] = enteredCardNos.filter(s => !couldBeEntryCardNo(s));
        const filteredCardNos: string[] = [];

        await Promise.all(cardNos.map(cardNo => fetch(`/json/card/${cardNo}/preparse`).then(r => {
            if (r.status !== 200) {
                invalidCardNos.push(cardNo);
            } else {
                return r.json().then(c => {
                    byCardNo[c.cardNo] = c;
                    byCardId[c.id] = c.cardNo;
                    // Ensure all group members are loaded
                    if (cardIsMember(c) && cardHasGroup(c)) {
                        allRequiredGroupMembers.push(...c.member.group.expectedMemberIds.split("|").filter(id => id !== "").map(x => parseInt(x)));
                    }
                });
            }
        })));

        // Load missing group members
        await Promise.all(allRequiredGroupMembers.filter(cardId => byCardId[cardId] === undefined)
            .map(async cardId => {
                const cardNo = (await locals.DB.Card.withScope(["viewCardNoOnly", "orderCardNo"]).findOne({
                    where: {id: cardId}
                }))?.cardNo;
                if (cardNo === undefined) throw new Error(`Group Member ID not found: ${cardId}`);
                await fetch(`/json/card/${cardNo}/preparse`).then(r => r.json()).then(c => {
                    byCardNo[c.cardNo] = c;
                    byCardId[c.id] = c.cardNo;
                });
            }));

        const cardNoCounts: { [cardNo: string]: number } = {};
        const cardNosAfterFilter = cardNos.filter(cardNo => {
            const card = byCardNo[cardNo];
            if (card === undefined) return false;

            let res = false;
            if (card.skills.length > 0) res = true;
            else if (cardIsMember(card)) {
                if (card.member.costumeJpn) res = true;
                else if (cardHasGroup(card)) {
                    if (card.member.group.skills.length > 0) res = true;
                }
            }

            if (res) {
                cardNoCounts[card.cardNo] = (cardNoCounts[card.cardNo] ?? 0) + 1;
            } else {
                filteredCardNos.push(cardNo);
            }
            return res;
        });
        const duplicateCardNos = Object.keys(cardNoCounts)
            .filter(cardNo => cardNoCounts[cardNo] > 1).map(cardNo => `${cardNo} (x${cardNoCounts[cardNo]})`);

        return {
            width: data.get("width"), height: data.get("height"), padding: data.get("padding"),
            cardNos: cardNosAfterFilter, byCardNo, byCardId, invalidCardNos, filteredCardNos, duplicateCardNos
        };
    }
} satisfies Actions;