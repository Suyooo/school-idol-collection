import {cardHasGroup, cardIsMember} from "$lib/card/types.js";
import type Card from "$models/card/card.js";
import type {PageServerLoad} from "./$types.js";

export const load: PageServerLoad = (async ({params, locals, fetch}) => {
    const cardNos = ["LL14-052", "LL14-057", "LL14-053", "LL15-051", "LL15-052", "LL15-053", "LL15-046", "LL15-047", "LL15-057", "LL15-089", "LL14-074", "LL10-063", "LL11-051", "LL11-055", "LL11-052", "LL11-057", "LL14-052", "LL14-057", "LL14-053", "LL15-051", "LL15-052", "LL15-053", "LL15-046", "LL15-047", "LL15-057", "LL15-089", "LL14-074", "LL10-063", "LL11-051", "LL11-055", "LL11-052", "LL11-057", "LL04-005", "LL14-075", "LL01-037", "ahaha"];
    const byCardNo: { [cardNo: string]: Card } = {};
    const byCardId: { [cardId: number]: Card } = {};
    const allRequiredGroupMembers: number[] = [];
    const invalidCardNos: string[] = [];
    const filteredCardNos: string[] = [];

    await Promise.all(cardNos.map(cardNo => fetch(`/json/card/${cardNo}/preparse`).then(r => {
        if (r.status !== 200) {
            invalidCardNos.push(cardNo);
        } else {
            r.json().then(c => {
                byCardNo[c.cardNo] = c;
                byCardId[c.id] = c;
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
                where: { id: cardId }
            }))?.cardNo;
            if (cardNo === undefined) throw new Error(`Group Member ID not found: ${cardId}`);
            await fetch(`/json/card/${cardNo}/preparse`).then(r => r.json()).then(c => {
                byCardNo[c.cardNo] = c;
                byCardId[c.id] = c;
            });
        }));

    return {cardNos: cardNos.filter(cardNo => {
            const card = byCardNo[cardNo];
            if (card === undefined) return false;

            if (card.skills.length > 0) return true;
            if (cardIsMember(card)) {
                if (card.member.costumeJpn) return true;
                if (cardHasGroup(card)) {
                    if (card.member.group.skills.length > 0) return true;
                }
            }
            filteredCardNos.push(cardNo);
            return false;
        }), byCardNo, byCardId, invalidCardNos, filteredCardNos};
}) satisfies PageServerLoad;