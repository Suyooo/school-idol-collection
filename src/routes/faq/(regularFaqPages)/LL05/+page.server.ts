import prepareFaq from "../../prepareFaq.js";
import type {Faq} from "../../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const json: Faq = [
    {
        "subjects": [
            "LL05-046"
        ],
        "seeAlso": [
            "/faq/general#stand_by",
            "/faq/general#skill_order_same_skill"
        ],
        "qa": [
            {
                "key": "046",
                "question": "There are three conditions and effects each, can I use multiple effects of the [Entry] Skill if the respective conditions are met?",
                "answer": "Yes. For example, if you have no cards in your Hand and no Song cards used for Lives when this card is ⟪ENTER⟫ed, you may both draw three cards and perform a ⟪LIVE⟫ with this card."
            }
        ]
    },
    {
        "subjects": [
            "LL05-047"
        ],
        "seeAlso": [
            "/faq/general#skill_order_multiple_skills"
        ],
        "qa": [
            {
                "key": "047_other",
                "question": "On the turn after this card was ⟪ENTER⟫ed, another {{link:LL05-047}} was ⟪ENTER⟫ed. Can this card join a ⟪LIVE⟫ in my next turn?",
                "answer": "Yes. The [Entry] Skills are handled seperately for each card, so the first card can join a ⟪LIVE⟫. However, the second {{red:\"Riko\"}} will not be able to join yet in that turn."
            },
            {
                "key": "047_live",
                "question": "I used this card's [RUSH] to ⟪ENTER⟫ another Member with [LIVE]. Can I perform a ⟪LIVE⟫?",
                "answer": "Yes. This card cannot join the ⟪LIVE⟫ due to the Skill, but you can still perform ⟪LIVE⟫s using other Members' [LIVE]."
            }
        ]
    },
    {
        "subjects": [
            "LL05-048"
        ],
        "seeAlso": [
            "/faq/general#skill_order_multiple_skills",
            "/faq/general#stand_by"
        ],
        "qa": [
            {
                "key": "048",
                "question": "I ⟪ENTER⟫ed this card using the [RUSH] from the [RUSH]/[LIVE] of {{link:LL04-053}}. In this case, can I perform a ⟪LIVE⟫ with those two cards?",
                "answer": "Yes. The {{red:\"Mari\"}} card has a [LIVE] icon, so you can use this card's Skill to perform a ⟪LIVE⟫."
            }
        ]
    },
    {
        "subjects": [
            "LL05-049"
        ],
        "seeAlso": [
            "/faq/general#skill_order_multiple_skills"
        ],
        "qa": [
            {
                "key": "049_both",
                "question": "If both Skill's requirements are met, does this card get both Pieces?",
                "answer": "Yes. In that case, you will get two Pieces, one from each Skill."
            },
            {
                "key": "049_name",
                "question": "If this card joins a ⟪LIVE⟫ with {{link:LL04-057}} as the Song card, does it get +[ALL] from the second Skill?",
                "answer": "No. The Song title is not part of the Skill text, so the requirement for the second Skill is not met."
            }
        ]
    },
    {
        "subjects": [
            "LL05-050"
        ],
        "seeAlso": [
            "/faq/general#stand_by"
        ]
    },
    {
        "subjects": [
            "LL05-051"
        ],
        "seeAlso": [
            "/faq/general#skill_order_multiple_skills",
            "/faq/general#stand_by"
        ]
    },
    {
        "subjects": [
            "LL05-052"
        ],
        "seeAlso": [
            "/faq/general#skill_order_multiple_skills"
        ],
        "qa": [
            {
                "key": "052_rush",
                "question": "If this card is ⟪ENTER⟫ed using a [RUSH], can I use it's own [RUSH] in addition to it's [On Entry] Skill?",
                "answer": "No. You can only use one [RUSH] per turn, so you cannot use this card's [RUSH]."
            },
            {
                "key": "052_icon",
                "question": "Using this card's [On Entry] Skill, I ⟪ENTER⟫ed another {{link:LL05-052}}. Does this count as being ⟪ENTER⟫ed using [RUSH]?",
                "answer": "No. The Skill requires this card to have been ⟪ENTER⟫ed as the direct result of a [RUSH]. It does not depend on whether the card you used to ⟪ENTER⟫ this card has a [RUSH] icon or not."
            }
        ]
    },
    {
        "subjects": [
            "LL05-053"
        ],
        "seeAlso": [
            "/faq/general#join_success_order"
        ],
        "qa": [
            {
                "key": "053",
                "question": "Can Pieces gained through [Live Join] Skills be used for this Skill's requirement?<br>For example, could {{link:LL05-039}} be used as not only the Member for [PURE], but also for [SMILE] or [COOL] if her Skill is activated?",
                "answer": "Yes. If their requirements are met, Pieces gained through [Live Join] Skills can be used for this Skill's requirement."
            }
        ]
    },
    {
        "subjects": [
            "LL05-054"
        ],
        "qa": [
            {
                "key": "054",
                "question": "I ⟪ENTER⟫ed this card through {{link:LL04-054}}'s Skill. In that case, since {{link:LL04-054}} is placed at the bottom of the deck, can I ⟪ENTER⟫ it by choosing to show the bottom card of my deck with this card's Skill?",
                "answer": "Yes. {{link:LL04-054}} is at the bottom of the Deck at the time the [Entry] Skill is resolved, so you can ⟪ENTER⟫ it from there."
            }
        ]
    },
    {
        "subjects": [
            "LL05-056"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            "LL05-057"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            "LL05-059"
        ],
        "qa": [
            {
                "key": "059",
                "question": "We have counted the number of differently named Members on our Stages, but there's a tie between players for the lowest number. What happens in that case?",
                "answer": "The Skill resolves without anyone drawing cards."
            }
        ]
    },
    {
        "subjects": [
            "LL05-060"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            "LL05-061"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    }
];

export const load: PageServerLoad = (async ({locals}) => {
    return await prepareFaq(locals.DB, json);
}) satisfies PageServerLoad;