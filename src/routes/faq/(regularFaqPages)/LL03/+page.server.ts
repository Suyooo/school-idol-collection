import prepareFaq from "../../prepareFaq.js";
import type {Faq} from "../../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const json: Faq = [
    {
        "subjects": [
            "LL03-056"
        ],
        "qa": [
            {
                "key": "056",
                "question": "What are \"Base Live Points\"?",
                "answer": "It refers to the large number in the top right of the Song card. If there are Bonus Live Points, as in \"2 + 1\", it only refers to the number on the left."
            }
        ]
    },
    {
        "subjects": [
            "LL03-057"
        ],
        "seeAlso": [
            "/faq/general#join_success_order"
        ]
    },
    {
        "subjects": [
            "LL03-058"
        ],
        "qa": [
            {
                "key": "058_three",
                "question": "When I ⟪ENTER⟫ed this Member, there already were three face-up Song card in my Set List. Can I still ⟪ENTER⟫ the top card of my Deck?",
                "answer": "Yes. No matter whether you flipped cards or not, as long as you meet the Attribute requirement, you can ⟪ENTER⟫ the top card of your deck."
            },
            {
                "key": "058_flip",
                "question": "There was only one face-up Song card in my Set List when I ⟪ENTER⟫ed this Member. Which Song cards should I flip and how?",
                "answer": "Flip face-down cards one by one until there are three face-up cards.<br>If there are any Song cards that were flipped face-down by another Skill, you can, but don't have to choose them.<br>After you have flipped your first card, you may choose your second card after seeing which Song card you just turned over."
            }
        ]
    },
    {
        "subjects": [
            "LL03-061"
        ],
        "qa": [
            {
                "key": "061",
                "question": "Which Members are meant by \"other Members\"?",
                "answer": "Any card that is not this one. For example, you may use this Member's Skill to give +[ALL][ALL] to any other {{red:\"Nozomi\"}} card, including another {{link:LL03-061}}."
            }
        ]
    },
    {
        "subjects": [
            "LL03-062"
        ],
        "qa": [
            {
                "key": "062",
                "question": "If this Skill's requirement is not met, but there's a Member with three Stars joining the same ⟪LIVE⟫, will this card gain +[ALL][ALL]?",
                "answer": "No. At the time the [Live Join] Skill is resolved, there are no Members in Lives with three or more Stars, so this card will not gain +[ALL][ALL]."
            }
        ]
    },
    {
        "subjects": [
            "LL03-065"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            "LL03-066"
        ],
        "seeAlso": [
            "/faq/general#member_counting",
            "/faq/general#flip_before_skills"
        ]
    },
    {
        "subjects": [
            "LL03-068"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            "LL03-071"
        ],
        "seeAlso": [
            "/faq/general#member_counting"
        ]
    },
    {
        "subjects": [
            "LL03-072",
            "LL03-073",
            "LL03-074"
        ],
        "qa": [
            {
                "key": "072",
                "question": "Are the Skill requirements for these Song cards only met if all three Members of the unit join?",
                "answer": "No. It is not neccessary for all three to be there. For example, if you perform a ⟪LIVE⟫ with {{link:LL03-072}} with only {{red:\"Honoka\"}} cards, the Any Piece requirement is still reduced by 3."
            }
        ]
    }
];

export const load: PageServerLoad = (async ({locals}) => {
    return await prepareFaq(locals.DB, json);
}) satisfies PageServerLoad;