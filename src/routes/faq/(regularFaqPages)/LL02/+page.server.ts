import prepareFaq from "../../prepareFaq.js";
import type {Faq} from "../../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const json: Faq = [
    {
        "subjects": [
            {
                "from": "LL02-046",
                "to": "LL02-054"
            }
        ],
        "qa": [
            {
                "key": "046",
                "question": "Does this Skill require both of the listed Members to join the ⟪LIVE⟫?",
                "answer": "No. If, for example, {{link:LL02-046}} is joining a ⟪LIVE⟫ with either a {{red:\"Kotori\"}} or {{red:\"Hanayo\"}} card, she will gain +[ALL]."
            }
        ]
    },
    {
        "subjects": [
            "LL02-055"
        ],
        "qa": [
            {
                "key": "055",
                "question": "If I don't have two {{red:\"Honoka\"}} cards in my Hand, can I keep my Hand hidden?",
                "answer": "Yes. Because the Skill says \"You may\", you are not forced to reveal your Hand."
            }
        ]
    },
    {
        "subjects": [
            "LL02-056"
        ],
        "seeAlso": [
            "/faq/general#entry_at_start",
            "/faq/general#stand_by"
        ],
        "qa": [
            {
                "key": "056_only",
                "question": "If this card is the only {{red:\"Eli\"}} card on Stand-By after ⟪ENTER⟫ing, do I have to return it to my Hand?",
                "answer": "Yes. Return the ⟪ENTER⟫ed Member to your Hand."
            },
            {
                "key": "056_none",
                "question": "Can I return an {{red:\"Eli\"}} card without Stars to my Hand?",
                "answer": "Yes. You can't draw any cards, but you can return the Member to your Hand."
            }
        ]
    },
    {
        "subjects": [
            "LL02-057"
        ],
        "qa": [
            {
                "key": "057_live",
                "question": "Can I only use this Skill if I perform a ⟪LIVE⟫ using this card's [LIVE] ?",
                "answer": "No. You can use this skill in any ⟪LIVE⟫ this Member is joining."
            },
            {
                "key": "057_may",
                "question": "Do I have to return a Member to the bottom of my Deck if this card joins a ⟪LIVE⟫?",
                "answer": "No. Because the Skill says \"You may return\", you do not have to return a Member if you already have enough Pieces."
            }
        ]
    },
    {
        "subjects": [
            "LL02-059"
        ],
        "qa": [
            {
                "key": "059",
                "question": "After entering this Member using a {{red:\"Rin\"}} card's [RUSH], I ⟪ENTER⟫ed a card with an [Entry] Skill (such as {{link:LL02-055}}), and I also drew a card. Can I use the card I drew for the ⟪ENTER⟫ed card's Skill?",
                "answer": "Yes. You draw the card before resolving the ⟪ENTER⟫ed card's [Entry] Skill, so you can use that card for it."
            }
        ]
    },
    {
        "subjects": [
            "LL02-060"
        ],
        "seeAlso": [
            "/faq/general#stand_by"
        ],
        "qa": [
            {
                "key": "060_other",
                "question": "Which Members are meant by \"Members other than {{red:\"Maki\"}}\"?",
                "answer": "Any Member whose name is not {{red:\"Maki Nishikino\"}}."
            },
            {
                "key": "060_rush",
                "question": "If this Member was ⟪ENTER⟫ed using another card's [RUSH], can I return the Member who has [RUSH] to my Hand?",
                "answer": "Yes. That Member is on Stand-By, so you can return it to your Hand. If they are the only Member other than {{red:\"Maki\"}}, you have to return it."
            }
        ]
    },
    {
        "subjects": [
            "LL02-061"
        ],
        "seeAlso": [
            "/faq/general#stand_by",
            "/faq/general#top_deck_card_faceup"
        ],
        "qa": [
            {
                "key": "061_scout",
                "question": "When I ⟪SCOUT⟫ using this Member's Skill, do I draw the card I flipped face-up?",
                "answer": "Yes. It is still the top card of your Deck, so you should draw it. After drawing it, you can hide the front side again."
            },
            {
                "key": "061_matchthis",
                "question": "There is no other {{red:\"Nozomi\"}} card on Stand-By besides this card that just ⟪ENTER⟫ed. If I flip over a {{red:\"Nozomi\"}} card using this Skill, can I ⟪SCOUT⟫?",
                "answer": "Yes. The {{red:\"Nozomi\"}} card you just ⟪ENTER⟫ed is on Stand-By, so you can ⟪SCOUT⟫."
            }
        ]
    },
    {
        "subjects": [
            "LL02-062"
        ],
        "seeAlso": [
            "/faq/general#stand_by",
            "/faq/general#top_deck_card_faceup"
        ],
        "qa": [
            {
                "key": "062",
                "question": "There is was another Member with the same name as the flipped card on Stand-By, and it's not a {{red:\"Hanayo\"}} card. What happens in this case?",
                "answer": "Nothing happens. The flipped card remains face-up on top of your Deck."
            }
        ]
    },
    {
        "subjects": [
            "LL02-063"
        ],
        "qa": [
            {
                "key": "063",
                "question": "If, for example, I perform a ⟪LIVE⟫ with this {{red:\"Nico\"}} card and two {{red:\"Honoka\"}} cards, does this Skill add the extra Piece?",
                "answer": "No. This Skill counts the amount of Member cards, not different Members. In this case, the {{red:\"Nico\"}} card is one of three total Members, so the condition is not met and the Piece is not added."
            }
        ]
    },
    {
        "subjects": [
            "LL02-064"
        ],
        "qa": [
            {
                "key": "064_each",
                "question": "If multiple Lives use this Song card, is the Live Points goal increased for each one?",
                "answer": "Yes. One point is added for each card used."
            },
            {
                "key": "064_increase_first",
                "question": "I performed a ⟪LIVE⟫ with this Song when the Live Points goal was 9, and hit 9 Live Points. Do I win?",
                "answer": "No. The Live Points goal was increased by one, so you need another point."
            },
            {
                "key": "064_win",
                "question": "If playing with three or more players, what happens if a Live using this Song card is performed when one of the players already won with 9 Live Points?",
                "answer": "The players who have already won will remain winners. The Live Points goal increases for the remaining players."
            },
            {
                "key": "064_out",
                "question": "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                "answer": "Yes. [While Live] Skills will be active until the end of the game."
            }
        ]
    },
    {
        "subjects": [
            "LL02-065"
        ],
        "seeAlso": [
            "/faq/general#member_counting",
            "/faq/general#flip_before_skills"
        ]
    },
    {
        "subjects": [
            "LL02-067"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            "LL02-073",
            "LL02-074",
            "LL02-075"
        ],
        "qa": [
            {
                "key": "073",
                "question": "The Skill says \"all three\" Members must join this ⟪LIVE⟫ - does that mean I can't use this Skill of this Song card unless I perform the ⟪LIVE⟫ with exactly three Member cards?",
                "answer": "No. As long as at least one card of each mentioned Member is joining, you can use as many Member cards for this ⟪LIVE⟫ as you want."
            }
        ]
    }
];

export const load: PageServerLoad = (async ({locals}) => {
    return await prepareFaq(locals.DB, json);
}) satisfies PageServerLoad;