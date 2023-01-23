import prepareFaq from "../../prepareFaq.js";
import type {Faq} from "../../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const json: Faq = [
    {
        "subjects": [
            {
                "from": "LL07-037",
                "to": "LL07-045"
            }
        ],
        "seeAlso": [
            "/faq/general#stand_by"
        ]
    },
    {
        "subjects": [
            "LL07-046"
        ],
        "qa": [
            {
                "key": "046",
                "question": "What happens if I ⟪ENTER⟫ this card with less than three cards in my Deck?",
                "answer": "Even if you have less than three cards in your Deck, you can add one Member without Stars to your Hand and return the rest to the bottom of your Deck. However, even if all of them have no Stars, you cannot take another turn, as the requirement for that effect calls for \"three cards without Stars\" to be shown."
            }
        ]
    },
    {
        "subjects": [
            "LL07-047"
        ],
        "qa": [
            {
                "key": "047",
                "question": "If I only have one face-up Song card in my Set List, can I flip one face-down Song card face-up?",
                "answer": "Yes. The \"all your face-up Song cards have the same Attribute\" requirement is met in this case, so you can flip one face-down Song card face-up."
            }
        ]
    },
    {
        "subjects": [
            "LL07-048"
        ],
        "qa": [
            {
                "key": "048_same",
                "question": "What does \"Member with the same Pieces\" mean?",
                "answer": "It means a Member who has the exact same number including Piece attributes as another Member. The order of Pieces does not matter, so if you ⟪ENTER⟫ed a Member with [SMILE][PURE], you can ⟪ENTER⟫ another Member with [PURE][SMILE]."
            },
            {
                "key": "048_bday",
                "question": "If I ⟪ENTER⟫ {{link:LL06-008}} with the Birthday Bonus active using this card's Skill, can I ⟪ENTER⟫ {{link:LL07-051}} from my Hand?",
                "answer": "Yes. When the Birthday Bonus is active, the bonus Pieces are added to that card, so in this example, you can ⟪ENTER⟫ {{link:LL07-051}}."
            }
        ]
    },
    {
        "subjects": [
            "LL07-049"
        ],
        "qa": [
            {
                "key": "049",
                "question": "Can I choose not to draw a card if the designated player decides to let everyone draw cards?",
                "answer": "No. If they decided to have everyone draw cards, all players must draw a card."
            }
        ]
    },
    {
        "subjects": [
            "LL07-050"
        ],
        "qa": [
            {
                "key": "050",
                "question": "When I ⟪ENTER⟫ed this card, my Deck was empty. Can I use this Skill to ⟪ENTER⟫ the card I returned?",
                "answer": "Yes. Since it's the only card you can look at from your Deck, you will only be to ⟪ENTER⟫ the card your returned to your Deck."
            }
        ]
    },
    {
        "subjects": [
            "LL07-052"
        ],
        "seeAlso": [
            "/faq/general#more_less",
            "/faq/general#join_success_order"
        ],
        "qa": [
            {
                "key": "052",
                "question": "In a two-player match, both players have the same amount of cards in their Hand. What happens in case there are two or more of this Member participating in a ⟪LIVE⟫?",
                "answer": "The first {{red:\"Hanamaru\"}} 's Skill will result in the player drawing a card. After that, when the Skills of the other {{red:\"Hanamaru\"}} cards are resolved, the player will have more cards in their Hand than the other player, so the cards will gain +[ALL]."
            }
        ]
    },
    {
        "subjects": [
            "LL07-053"
        ],
        "qa": [
            {
                "key": "053_hand",
                "question": "If a Member doesn't have [ALL], but has a Skill such as [Live Join] that allows them to gain [ALL], can I use this card's Skill to ⟪ENTER⟫ them?",
                "answer": "No. Skills such as [Live Join] will only be resolved at that time, so when the card is still in your Hand, it does not have [ALL]."
            },
            {
                "key": "053_idolize",
                "question": "The Member I ⟪ENTER⟫ed using this card's Skill has a [Special Practice] Skill, and after being Idolized, they have three or more [ALL]. Can I draw three cards in this case?",
                "answer": "Yes. This [Entry] Skill counts the number of Pieces after the Member was ⟪ENTER⟫ed. If a Member is Idolized through a [Special Practice] Skill, [Idolized (Piece Bonus)] will be active when the card appears on the Stage, so including those, the Member has three or more [ALL] and the requirement is met."
            }
        ]
    },
    {
        "subjects": [
            "LL07-055"
        ],
        "seeAlso": [
            "/faq/general#stand_by",
            "/faq/general#flip_before_skills"
        ],
        "qa": [
            {
                "key": "055_end",
                "question": "With this ⟪LIVE⟫, I've reached the Live Points target. If the Skill Requirement is met, can I still perform another ⟪LIVE⟫?",
                "answer": "No. When they reach the Live Points target, the winner is removed from the rest of the match, so they cannot perform a ⟪LIVE⟫."
            },
            {
                "key": "055_other",
                "question": "What happens if non- {{red:\"CYaRon!\"}} Members are participating in this ⟪LIVE⟫?",
                "answer": "As long as {{red:\"Chika\"}}, {{red:\"You\"}} and {{red:\"Ruby\"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating."
            }
        ]
    },
    {
        "subjects": [
            "LL07-056"
        ],
        "qa": [
            {
                "key": "056_noall",
                "question": "{{link:LL05-053}} is joining a ⟪LIVE⟫ with this Song card while this card's Skill requirement is met. There are also members with [SMILE], [PURE] and [COOL]. Will the {{red:\"Mari\"}} card gain +[ALL] from it's [Live Join] Skill?",
                "answer": "No. The Skill of this Song card changes all [SMILE][PURE][COOL] of the Members joining this ⟪LIVE⟫ into [ALL] before [Live Join] Skills are resolved. That means that in this case, {{red:\"Mari\"}} does not gain +[ALL]."
            },
            {
                "key": "056_later",
                "question": "A member who joined a ⟪LIVE⟫ with this Song card gained +[SMILE] through a [Live Join] Skill. If the requirement for this card's Skill is met, does that Piece also become [ALL] ?",
                "answer": "Yes. Pieces gained through Skills become [ALL], too."
            },
            {
                "key": "056_other",
                "question": "What happens if non- {{red:\"AZALEA\"}} Members are participating in this ⟪LIVE⟫?",
                "answer": "As long as {{red:\"Kanan\"}}, {{red:\"Dia\"}} and {{red:\"Hanamaru\"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating."
            }
        ]
    },
    {
        "subjects": [
            "LL07-057"
        ],
        "seeAlso": [
            "/faq/general#join_success_order",
            "/faq/general#flip_before_skills"
        ],
        "qa": [
            {
                "key": "057_each",
                "question": "What does \"⟪ENTER⟫ one Member of each Member of {{red:\"Guilty Kiss\"}} \" mean?",
                "answer": "It means that you may ⟪ENTER⟫ up to one {{red:\"Riko\"}}, one {{red:\"Yoshiko\"}}, and one {{red:\"Mari\"}}. That means you can for example ⟪ENTER⟫ three Members, one of each, or ⟪ENTER⟫ only a {{red:\"Riko\"}} and a {{red:\"Yoshiko\"}} card."
            },
            {
                "key": "057_other",
                "question": "What happens if non- {{red:\"Guilty Kiss\"}} Members are participating in this ⟪LIVE⟫?",
                "answer": "As long as {{red:\"Riko\"}}, {{red:\"Yoshiko\"}} and {{red:\"Mari\"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating."
            }
        ]
    },
    {
        "subjects": [
            "LL07-058"
        ],
        "seeAlso": [
            "/faq/general#members_on_stage"
        ]
    },
    {
        "subjects": [
            "LL07-059"
        ],
        "qa": [
            {
                "key": "059_each",
                "question": "If multiple Lives use this Song card, is the Live Points goal increased for each one?",
                "answer": "Yes. One point is added for each card used."
            },
            {
                "key": "059_increase_first",
                "question": "I performed a ⟪LIVE⟫ with this Song when the Live Points goal was 9, and hit 9 Live Points. Do I win?",
                "answer": "No. The Live Points goal increased by one, so you need another point."
            },
            {
                "key": "059_win",
                "question": "If playing with three or more players, what happens if a Live using this Song card is performed when one of the players already won with 9 Live Points?",
                "answer": "The players who have already won will remain winners. The Live Points goal increases for the remaining players."
            },
            {
                "key": "059_out",
                "question": "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                "answer": "Yes. [While Live] Skills will be active until the end of the game."
            }
        ]
    },
    {
        "subjects": [
            "LL07-062"
        ],
        "seeAlso": [
            "/faq/general#members_on_stage",
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            "LL07-063"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            {
                "from": "LL07-064",
                "to": "LL07-081"
            }
        ],
        "qa": [
            {
                "key": "064",
                "question": "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                "answer": "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the player taking the first turn begins."
            }
        ]
    }
];

export const load: PageServerLoad = (async ({locals}) => {
    return await prepareFaq(locals.DB, json);
}) satisfies PageServerLoad;