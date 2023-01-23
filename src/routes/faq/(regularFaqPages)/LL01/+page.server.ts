import prepareFaq from "../../prepareFaq.js";
import type {Faq} from "../../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const json: Faq = [
    {
        subjects: [{ from: "LL01-046", to: "LL01-054" }],
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
    },
    {
        subjects: ["LL01-055"],
        seeAlso: [ "/faq/general#more_less" ]
    },
    {
        subjects: ["LL01-056"],
        qa: [
            {
                question: `Does this Skill activate if performing a ⟪LIVE⟫ using a Song card which awards {{red:"3+1"}} Live Points?`,
                answer: `Yes. It will activate if the total of both base and bonus Live Points gained is 4 or more. However, you must meet the conditions to gain the bonus Live Points.`
            }
        ]
    },
    {
        subjects: ["LL01-057"],
        seeAlso: [ "/faq/general#top_deck_card_faceup" ]
    },
    {
        subjects: ["LL01-058"],
        seeAlso: [ "/faq/general#top_deck_card_faceup" ]
    },
    {
        subjects: ["LL01-060"],
        seeAlso: [ "/faq/general#more_faceup_songs" ]
    },
    {
        subjects: ["LL01-063"],
        seeAlso: [ "/faq/general#skill_order_multiple_skills", "/faq/general#more_less" ]
    },
    {
        subjects: ["LL01-064", "LL01-065", "LL01-072", "LL01-073", "LL01-074"],
        seeAlso: [ "/faq/general#member_counting" ]
    }
];

export const load: PageServerLoad = (async ({locals}) => {
    return await prepareFaq(locals.DB, json);
}) satisfies PageServerLoad;