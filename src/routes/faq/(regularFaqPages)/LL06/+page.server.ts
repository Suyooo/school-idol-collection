import prepareFaq from "../../prepareFaq.js";
import type {Faq} from "../../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const json: Faq = [
    {
        "subjects": [
            {
                "from": "LL06-028",
                "to": "LL06-036"
            }
        ],
        "seeAlso": [
            "/faq/general#members_on_stage"
        ]
    },
    {
        "subjects": [
            "LL06-046"
        ],
        "qa": [
            {
                "key": "046_one",
                "question": "When I ⟪ENTER⟫ed this card, I only had one card in my Hand. I want to empty my Hand, so can I return only one card to the bottom my Deck?",
                "answer": "No. You cannot return only one card."
            },
            {
                "key": "046_empty",
                "question": "When I ⟪ENTER⟫ed this card, my Deck was empty. Can I use this Skill to ⟪ENTER⟫ one of the cards I returned?",
                "answer": "Yes. In that case, you ⟪ENTER⟫ the upper card of the two cards you returned."
            }
        ]
    },
    {
        "subjects": [
            "LL06-047"
        ],
        "seeAlso": [
            "/faq/general#members_on_stage"
        ],
        "qa": [
            {
                "key": "047",
                "question": "What does \"If the face-up Song cards in your Set List have two or more different Attributes\" mean?",
                "answer": "Count how many different colors the face-up Song cards in your Set List have (Red/Smile, Green/Pure, Blue/Cool, Yellow/Neutral). If there are two or more, the requirement is met.<br>For example, if you have {{link:EX03-028}}, {{link:LL04-064}} and {{link:LL06-058}} in your Set List, since their attributes are Pure / Neutral / Neutral, you have two different Attributes."
            }
        ]
    },
    {
        "subjects": [
            "LL06-048"
        ],
        "qa": [
            {
                "key": "048",
                "question": "What happens if I ⟪ENTER⟫ this card with less than three cards in my Deck?",
                "answer": "If you have two cards in your Deck, show those two cards, pick one of them to add to your Hand, and return the other to the bottom of your Deck.<br>If the card you returned was a {{red:\"Kanan\"}} card, you can ⟪ENTER⟫ a {{red:\"Kanan\"}} card with [LIVE] from your Hand.<br>If you have only one card in your Deck, you can show it and add it to your Hand. However, since you can't return a card to your Deck, you cannot ⟪ENTER⟫ a {{red:\"Kanan\"}} card with [LIVE] from your Hand. (Also, you cannot choose not to add a card to your Hand.)<br>If your Deck is empty, nothing happens."
            }
        ]
    },
    {
        "subjects": [
            "LL06-049"
        ],
        "qa": [
            {
                "key": "049",
                "question": "Does the \"⟪ENTER⟫ed from your Hand\" requirement also count ⟪ENTER⟫ing using [RUSH] and ⟪ENTER⟫ ing using Skills such as {{link:LL04-048}} ?",
                "answer": "Yes. The requirement is not only met if you pick ⟪ENTER⟫ as your turn action, but also if you use a [RUSH] or a Skill to ⟪ENTER⟫ this card."
            }
        ]
    },
    {
        "subjects": [
            "LL06-050"
        ],
        "seeAlso": [
            "/faq/general#stand_by",
            "/faq/general#skill_order_same_skill"
        ],
        "qa": [
            {
                "key": "050_count",
                "question": "What does \"three or more different Live Costumes\" mean?",
                "answer": "Count how many different Live Costumes your Member cards have (in the lower left).<br>For example, if you have Member cards with the Live Costumes {{red:\"Aozora Jumping Heart\"}}, {{red:\"Aozora Jumping Heart\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}} and {{red:\"Koi ni Naritai AQUARIUM\"}}, you have three different Live Costumes."
            },
            {
                "key": "050_live",
                "question": "If I perform a ⟪LIVE⟫ using this card's Skill, do the {{red:\"You\"}} cards I counted for the requirement have to join?",
                "answer": "No. They do not have to join the ⟪LIVE⟫."
            },
            {
                "key": "050_order",
                "question": "Not all of my Members on my Stage are {{red:\"You\"}} cards, but the {{red:\"You\"}} cards have three or more different Live Costumes. Can I use this Skill to perform a ⟪LIVE⟫?",
                "answer": "No. If the first part of the requirement is not met, you cannot use the second part of the Skill past the \"Then...\"."
            }
        ]
    },
    {
        "subjects": [
            "LL06-051"
        ],
        "seeAlso": [
            "/faq/general#skill_order_multiple_skills",
            "/faq/general#member_counting"
        ],
        "qa": [
            {
                "key": "051_skip",
                "question": "What does \"skipped a turn\" or \"haven't skipped a turn\" mean?",
                "answer": "You might have to skip a turn due to some Skills (such as {{link:LL01-071}} and {{link:LL04-051}}). If you were affects by such a Skill at least once in this match, you have \"skipped a turn\". Otherwise, if you haven't had a Skill like that affect you in this match so far, you \"haven't skipped a turn\"."
            },
            {
                "key": "051_intent",
                "question": "Can I intentionally skip a turn by not choosing an action on my turn?",
                "answer": "No. You must either ⟪SCOUT⟫, ⟪ENTER⟫ a card or perform a ⟪LIVE⟫."
            }
        ]
    },
    {
        "subjects": [
            "LL06-052"
        ],
        "seeAlso": [
            "/faq/general#join_success_order"
        ],
        "qa": [
            {
                "key": "052",
                "question": "If two or more of this card join the same ⟪LIVE⟫, can I treat their Pieces as [ALL], too?",
                "answer": "Yes. Their Skills will affect each other's [SMILE], so this results in treating all Pieces of all {{red:\"Hanamaru\"}} cards as [ALL]."
            }
        ]
    },
    {
        "subjects": [
            "LL06-053"
        ],
        "seeAlso": [
            "/faq/general#skill_order_multiple_skills",
            "/faq/general#top_deck_card_faceup",
            "/faq/general#join_success_order"
        ]
    },
    {
        "subjects": [
            "LL06-054"
        ],
        "qa": [
            {
                "key": "054",
                "question": "Does the \"⟪ENTER⟫ed from your Deck\" requirement also count ⟪ENTER⟫ing using Skills such as {{link:LL04-054}} ?",
                "answer": "Yes. The requirement is not only met if you pick ⟪ENTER⟫ as your turn action, but also if you use a Skill to ⟪ENTER⟫ this card."
            },
            {
                "key": "054",
                "question": "If I ⟪ENTER⟫ this card using a {{red:\"Ruby\"}} card's Skill, can the card I ⟪ENTER⟫ from my Hand be one of the cards I drew from the first part of the Skill?",
                "answer": "Yes. The drawn cards can be ⟪ENTER⟫ed."
            }
        ]
    },
    {
        "subjects": [
            "LL06-058"
        ],
        "seeAlso": [
            "/faq/general#flip_before_skills"
        ],
        "qa": [
            {
                "key": "058_lowest",
                "question": "What does \"Member with the lowest number of cards in this ⟪LIVE⟫\" mean?",
                "answer": "Count how many cards of each differently named Member you have used for this ⟪LIVE⟫.<br>For example, if there are three {{red:\"Chika\"}} cards, two {{red:\"You\"}} cards, and one {{red:\"Riko\"}} card joining a ⟪LIVE⟫, {{red:\"Riko\"}} is the Member with the lowest number of cards in this ⟪LIVE⟫."
            },
            {
                "key": "058_none",
                "question": "When choosing a \"Member with the lowest number of cards in this ⟪LIVE⟫\", can I pick a Member with no cards in this ⟪LIVE⟫?",
                "answer": "No. You cannot choose a Member who didn't join the ⟪LIVE⟫ at all."
            },
            {
                "key": "058_tie",
                "question": "If there are multiple Members who meet the \"Member with the lowest number of cards in this ⟪LIVE⟫\" requirement, can I pick and ⟪ENTER⟫ cards for each of them?",
                "answer": "No. You must choose one of the tied Members. You cannot ⟪ENTER⟫ cards of the other Members."
            }
        ]
    },
    {
        "subjects": [
            "LL06-059"
        ],
        "qa": [
            {
                "key": "059_two",
                "question": "In a two-player game, can the second player use this Skill?",
                "answer": "Yes. No matter how many people are playing in the match, the requirement is met for whoever is the last to take their turn."
            },
            {
                "key": "059_move",
                "question": "There are three players in the match, and the third player in the turn order won. Can the second player now use this Skill?",
                "answer": "No. Only the order as it was decided during setup counts, so the player who is last in the turn order doesn't change."
            }
        ]
    },
    {
        "subjects": [
            "LL06-061"
        ],
        "seeAlso": [
            "/faq/general#no_shuffle_facedown_song",
            "/faq/general#join_success_order"
        ]
    },
    {
        "subjects": [
            "LL06-062"
        ],
        "seeAlso": [
            "/faq/general#join_success_order"
        ]
    }
];

export const load: PageServerLoad = (async ({locals}) => {
    return await prepareFaq(locals.DB, json);
}) satisfies PageServerLoad;