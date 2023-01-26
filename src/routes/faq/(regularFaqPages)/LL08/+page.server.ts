import prepareFaq from "../../prepareFaq.js";
import type {Faq} from "../../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const json: Faq = [
    {
        "subjects": [
            "LL08-046"
        ],
        "qa": [
            {
                "question": `If I ⟪ENTER⟫ this card with three or more Live Points, am I forced to perform a ⟪LIVE⟫?`,
                "answer": `No. Since that option says "you may", you don't have to perform a ⟪LIVE⟫. However, you must draw cards.`
            }
        ]
    },
    {
        "subjects": [
            "LL08-047"
        ],
        "qa": [
            {
                "question": `What does "For each different Attribute of the face-up Song cards in your Set List" mean?`,
                "answer": `The Attribute of a Song card refers to the background color of the card. There are four colors: Red (Smile), Green (Pure), Blue (Cool) and Yellow (Neutral).<br>For example, if you have {{link:LL08-055}} and {{link:LL08-058}} face-up in your Set List, there's one Neutral and one Smile Song card, so you draw two cards.`
            }
        ]
    },
    {
        "subjects": [
            "LL08-048"
        ],
        "seeAlso": [ "/faq/general#member_counting", "/faq/general#join_success_order", "/faq/general#flip_before_skills" ]
    },
    {
        "subjects": [
            "LL08-049"
        ],
        "qa": [
            {
                "question": `How exactly should this Skill be resolved?`,
                "answer": `Starting from the next player in turn order, every player may choose whether to call Dia "Dia-chan". The player after them can make their choice after hearing what the previous player decided on. Once everyone chose, you can resolve the Skill, choosing the effect based on whether everyone called Dia "Dia-chan".`
            }
        ]
    },
    {
        "subjects": [
            "LL08-050"
        ],
        "seeAlso": [ "/faq/general#join_success_order" ]
    },
    {
        "subjects": [
            "LL08-051"
        ],
        "qa": [
            {
                "question": `What does "treat the loss as a win" mean?`,
                "answer": `You can change the result of the rock-paper-scissors match to a win for you. That means you can take another turn, because you now meet the "if you win" requirement.`
            },
            {
                "question": `If I don't have three cards in my hand, can I still treat the loss as a win if I return all the cards in my Hand to the bottom of my Deck?`,
                "answer": `No. If you can't return three cards from your Hand to your Deck, you can't meet the requirement to change the loss to a win. (You must either return three cards to your Deck or none at all.)`
            }
        ]
    },
    {
        "subjects": [
            "LL08-052"
        ],
        "seeAlso": [ "/faq/general#join_success_order" ],
        "qa": [
            {
                "question": `If I have both no cards in my Hand and no Song cards used in Lives, does this cards still gain +[SMILE]?`,
                "answer": `Yes. If either requirement is met, this card gains +[SMILE], so meeting both requirements is fine. However, even if both requirements are met, the card will not gain +[SMILE][SMILE].`
            }
        ]
    },
    {
        "subjects": [
            "LL08-053"
        ],
        "seeAlso": [ "/faq/general#more_faceup_songs", "/faq/general#no_shuffle_facedown_song" ],
        "qa": [
            {
                "question": `If I turn a face-up Song card face-down, I will have zero face-up Song cards in my Set List. Can I still perform ⟪LIVE⟫s like that?`,
                "answer": `No. If there are no face-up Song cards in your Set List, you cannot perform ⟪LIVE⟫s. As such, unless you have a Skill that allows you to turn a face-down Song card face-up again, you should avoid flipping your last Song card face-down.`
            }
        ]
    },
    {
        "subjects": [
            "LL08-054"
        ],
        "seeAlso": [ "/faq/general#members_on_stage" ],
        "qa": [
            {
                "question": `What does "if the Members on your Stage have three or more different Live Costumes" mean?`,
                "answer": `Count the number of different Live Costumes, shown in the bottom left of the Member cards. For example, if you have five cards with the Live Costumes {{red:"Aozora Jumping Heart"}}, {{red:"Aozora Jumping Heart"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} and {{red:"Koi ni Naritai AQUARIUM"}}, you have three different Live Costumes.`
            }
        ]
    },
    {
        "subjects": [
            "LL08-056"
        ],
        "qa": [
            {
                "question": `Using {{link:LL05-047}}'s [RUSH], I entered a Member with [LIVE]. ({{red:"Riko"}} cannot join a ⟪LIVE⟫ this turn.) If I perform a ⟪LIVE⟫ with {{red:"Yuuki wa Doko ni? Kimi no Mune ni!"}} in this situation and have every Member on my Stage except for {{red:"Riko"}} join, can I still meet this Skill's requirement?`,
                "answer": `No. Regardless of whether Members are blocked from joining ⟪LIVE⟫ or not, if there are Members on Stage who are not joining the ⟪LIVE⟫, the Skill does not activate.`
            }
        ]
    },
    {
        "subjects": [
            "LL08-057"
        ],
        "seeAlso": [ "/faq/general#member_counting" ],
        "qa": [
            {
                "question": `What does "exactly three Members, {{red:"Riko"}}, {{red:"Hanamaru"}} and {{red:"Mari"}}" mean?`,
                "answer": `If one {{red:"Riko"}} card, one {{red:"Hanamaru"}} card and one {{red:"Mari"}} card join this ⟪LIVE⟫, the requirement is met. If a Member with a name other than those three joins, or one of those three does not join, or two or more cards with the same name join, the Skill will not activate.`
            }
        ]
    },
    {
        "subjects": [
            "LL08-058"
        ],
        "seeAlso": [ "/faq/general#join_success_order" ],
        "qa": [
            {
                "question": `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                "answer": `As long as there is a {{red:"Dia"}} card with [SMILE] and a {{red:"Ruby"}} card with [SMILE] joining, the Any Piece requirement is reduced by three, regardless of what other members join.`
            }
        ]
    },
    {
        "subjects": [
            "LL08-059"
        ],
        "qa": [
            {
                "question": `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                "answer": `As long as there is a {{red:"You"}} card with a Live Costume and a {{red:"Yoshiko"}} with a Live Costume joining, the Any Piece requirement is reduced by three, regardless of what other Members join.`
            }
        ]
    },
    {
        "subjects": [
            "LL08-060"
        ],
        "qa": [
            {
                "question": `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                "answer": `As long as there is a "Chika" card with [RUSH] or [LIVE] and a "Kanan" card with [RUSH] or [LIVE] joining, the Any Piece requirement is reduced by three, regardless of what other Members join.`
            }
        ]
    },
    {
        "subjects": [
            {from: "LL08-064", to: "LL08-081"}
        ],
        "qa": [
            {
                "question": "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                "answer": "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the first player in the turn order can begin."
            }
        ]
    }
];

export const load: PageServerLoad = (async ({locals}) => {
    return await prepareFaq(locals.DB, json);
}) satisfies PageServerLoad;