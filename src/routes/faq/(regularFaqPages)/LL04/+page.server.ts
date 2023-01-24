import prepareFaq from "../../prepareFaq.js";
import type {Faq} from "../../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const json: Faq = [
    {
        "subjects": [
            {
                "from": "LL04-037",
                "to": "LL04-045"
            }
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ],
        "qa": [
            {
                "question": "When counting \"differently named {{red:\"Aqours\"}} Members\", should I count the card that has this Skill, too?",
                "answer": "Yes. They count as well."
            }
        ]
    },
    {
        "subjects": [
            "LL04-046"
        ],
        "seeAlso": [
            "/faq/general#stand_by",
            "/faq/general#member_counting",
            "/faq/general#more_less"
        ],
        "qa": [
            {
                "question": "At the time I ⟪ENTER⟫ed this Member, there were eight other Members on Stand-By. Can I ⟪SCOUT⟫using this Skill?",
                "answer": "No. This Member counts as well, so there are nine Members on Stand-By and the Skill's condition is not met."
            }
        ]
    },
    {
        "subjects": [
            "LL04-047"
        ],
        "seeAlso": [
            "/faq/general#skill_order_multiple_skills",
            "/faq/general#join_success_order"
        ],
        "qa": [
            {
                "question": "If two or more of this card join a ⟪LIVE⟫, can I flip further Song cards?",
                "answer": "Yes. For example, if two of this {{red:\"Riko\"}} card join a ⟪LIVE⟫, you can, together with the one Song card you flip from performing a ⟪LIVE⟫ by default, flip a total of three cards."
            }
        ]
    },
    {
        "subjects": [
            "LL04-048"
        ],
        "qa": [
            {
                "question": "The card I returned from my Hand to the bottom of my Deck to use the [Entry] Skill was the last card in my Hand. Can I still choose the ⟪ENTER⟫ option?",
                "answer": "Yes. As long as you return a card to the bottom of your Deck, you can choose either.<br>If you don't have any cards in your Hand, you can't ⟪ENTER⟫ a card from your Hand, which means you can't do anything when picking that option."
            }
        ]
    },
    {
        "subjects": [
            "LL04-049"
        ],
        "qa": [
            {
                "question": "What happens if the top card of the Deck is flipped face-up, or the Deck is empty?",
                "answer": "Even if the card is visible to them, the next player must \"guess\" whether it has Stars or not, then use the effect corresponding to the answer.<br>If your Deck is empty, you cannot use this Skill."
            }
        ]
    },
    {
        "subjects": [
            "LL04-050"
        ],
        "seeAlso": [
            "/faq/general#skill_order_same_skill"
        ]
    },
    {
        "subjects": [
            "LL04-051"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            "LL04-052"
        ],
        "qa": [
            {
                "question": "Can the other players choose to not draw a card?",
                "answer": "No. You always draw three cards, and the other players always draw one card each."
            }
        ]
    },
    {
        "subjects": [
            "LL04-060"
        ],
        "seeAlso": [
            "/faq/general#join_success_order"
        ]
    },
    {
        "subjects": [
            "LL04-061"
        ],
        "qa": [
            {
                "key": "member",
                "question": "Is the draw limit increased by one even if I ⟪SCOUT⟫ using a Skill like the one of {{link:LL04-046}} ?",
                "answer": "Yes. Even if you use a Skill to do so, ⟪SCOUT⟫ing will always get +1 extra card. Note that Skills such as \"Draw X cards\" are not ⟪SCOUT⟫s, so you cannot draw extra cards."
            },
            {
                "key": "out",
                "question": "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                "answer": "Yes. [While Live] Skills will be active until the end of the game."
            }
        ]
    },
    {
        "subjects": [
            "LL04-062"
        ],
        "qa": [
            {
                "question": "{{link:LL04-053}} is joining this ⟪LIVE⟫, after I chose to use [RUSH] when I ⟪ENTER⟫ed her. Will she still gain +[ALL] from this Song card's Skill?",
                "answer": "Yes. She has a [LIVE] icon, so she will gain +[ALL]."
            }
        ]
    },
    {
        "subjects": [
            "LL04-064"
        ],
        "seeAlso": [
            "/faq/general#member_counting",
            "/faq/general#flip_before_skills"
        ]
    },
    {
        "subjects": [
            "LL04-065"
        ],
        "seeAlso": [
            "/faq/general#join_success_order"
        ],
        "qa": [
            {
                "question": "The Members joining this ⟪LIVE⟫ have 3x [SMILE] and 1x [ALL] in total. Will the requirement be reduced to 2?",
                "answer": "No. This Skill requires four or more Pieces of one of the Attribute types [SMILE], [PURE], [COOL] or [ALL]. You cannot count [ALL] as a Piece of an Attribute of your choice."
            }
        ]
    }
];

export const load: PageServerLoad = (async ({locals}) => {
    return await prepareFaq(locals.DB, json);
}) satisfies PageServerLoad;