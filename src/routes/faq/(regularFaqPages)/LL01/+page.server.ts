import prepareFaq from "../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const load: PageServerLoad = (async ({locals}) => {
    return await prepareFaq(locals.DB, [
        {
            cardNo: "LL01-046",
            rangeEndCardNo: "LL01-054",
            qa: [
                {
                    key: "all",
                    question: `Does this Skill require all three Members of the same Year to join the ⟪LIVE⟫?`,
                    answer: `No. If, for example, {{link:LL01-046}} is joining a ⟪LIVE⟫ with either a {{red:"Kotori"}} or {{red:"Umi"}} card, she will gain +[ALL].`
                },
                {
                    key: "other",
                    question: `Does the condition for {{link:LL01-046}}'s Skill include cards other than this "Honoka" card?`,
                    answer: `No, it means all {{red:"Honoka"}} cards are excluded. She only gains +[ALL] if a {{red:"Kotori"}} or {{red:"Umi"}} card joins the same ⟪LIVE⟫. No other joining Members have an effect.`
                }
            ]
        }
    ]);
}) satisfies PageServerLoad;