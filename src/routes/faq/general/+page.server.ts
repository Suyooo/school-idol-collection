import {cardLink} from "$lib/card/strings.js";
import prepareFaq from "../prepareFaq.js";
import type {Faq} from "../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const json: Faq = [
    {
        "subjects": [],
        "notes": [
            "The following answers for Pairs apply to Trios as well - replace \"Pair\" with \"Trio\" and \"two Members\" with \"three Members\" for these.",
        ],
        "qa": [
            {
                "key": "songs_with_different_attributes",
                "question": "If two Song cards have different Attributes but the same name, can I put both into my Set List?",
                "answer": "Yes, you can put one of each into your Set List!<br>To be precise, cards are differentiated by the ID in the bottom right of the card. If the Song name is the same but the ID is different, you can put both into your Deck.<br>For example, you can't put {{link:LL01-067}} into your Set List twice, but you if you have both {{link:EX01-029}} (ID: 0029) and {{link:LL01-067}} (ID: 0100), you can have one of each in your Set List!"
            },
            {
                "key": "muse_and_aqours_song_cards",
                "question": "Which Song cards are {{red:\"µ's\"}} Song cards / {{red:\"Aqours\"}} Song cards?",
                "answer": "{{link:PR-012}}{{link:PR-032}}{{link:PR-203}}{{link:PR-215}}{{link:PR-226}}{{link:LL10-062}}{{link:LL10-063}}{{link:LL14-064}}{{link:LL15-057}}){{link:PR-069A}}{{link:PR-069B}}{{link:PR-124}}{{link:PR-173}}{{link:PR-193}}{{link:PR-204}}{{link:PR-225}}"
            },
            {
                "key": "stand_by",
                "question": "What is the \"On Stand-By\" state?",
                "answer": "When a Member has ⟪ENTER⟫ed the Stage, but hasn't joined a ⟪LIVE⟫ yet. The moment a Member ⟪ENTER⟫s, they are \"On Stand-By\"."
            },
            {
                "key": "stand_by_self",
                "question": "If an [Entry] Skill says \"Members on Stand-By\", does that include the Member that just ⟪ENTER⟫ed the Stage (the one who owns that Skill)?",
                "answer": "Yes. A Member is always in the \"On Stand-By\" state when they ⟪ENTER⟫."
            },
            {
                "key": "members_on_stage",
                "question": "If a Skill says \"Members on Stage\", which Members are counted?",
                "answer": "This includes both waiting Members and Members who are used for Lives. You can also just remember that it means \"all Members outside your Deck and Hand\"."
            },
            {
                "key": "member_counting",
                "question": "What does it mean when Skills say \"X Members\" or \"X differently named Members\"? And what is the difference?",
                "answer": "Unless specified otherwise, \"X Members\" counts all Member cards, even if they have duplicate names, card numbers or IDs. On the other hand, \"X differently named Members\" means that you only count Members with different names in their profiles.<br>When counting \"differently named Members\", count how many of the Member cards have different Names. For example, if you perform a ⟪LIVE⟫ with Member cards of {{red:\"Honoka\"}}, {{red:\"Honoka\"}}, {{red:\"Honoka\"}}, {{red:\"Kotori\"}}, {{red:\"Kotori\"}} and {{red:\"Umi\"}} joining, you will have 6 Members, but only 3 differently named Members."
            },
            {
                "key": "deck_runs_out",
                "question": "During a match, I drew a card and my Deck ran out. What happens now?",
                "answer": "If your Deck runs out, keep playing! Do your best to reach the Live Points goal with the Members on your Stage and in your Hand! If you're unable to ⟪ENTER⟫ a card, ⟪SCOUT⟫ or perform a ⟪LIVE⟫, you must pass your turn. If every player had to pass in a round, the match ends in a draw for the remaining players."
            },
            {
                "key": "collection",
                "question": "If a Skill says \"Collection\", what does it mean?",
                "answer": "The \"Collection\" refers to any SIC cards you own, but are not using in the current match."
            },
            {
                "key": "collection_ignores_deck_restrictions",
                "question": "Can I take a Member card out of my Collection if I already have four of the same card in my Deck?",
                "answer": "Yes. When using a Skill to bring cards into play from your Collection, the Deck construction restrictions (maximum number of a card, total Cost, etc.) do not apply."
            },
            {
                "key": "group",
                "question": "What does \"Pair up\" (\"Form a Trio\") mean?",
                "answer": "If you have unpaired Members on Stand-By whose ID and name match with those written in the Skill, place the two cards side by side. This state is called \"Paired\". Paired Members will be able to use their Pair Skill (the lower field that goes across both cards). Also, the two Members of a Pair must perform in ⟪LIVE⟫s together."
            },
            {
                "key": "group_counting",
                "question": "When counting Members, how are Paired Members counted?",
                "answer": "Count each Member separately, just as usual. (The Pair will not count as a single card, and their name will also not become, for example, \"<a href=\"/card/LL11-057\">Mari</a> & <a href=\"/card/LL11-052\">Kanan</a>\".)"
            },
            {
                "key": "group_return",
                "question": "A Skill is making me move one of the Paired Members off the Stage, and return it into my Deck or Hand. What happens in this case?",
                "answer": "Only return one of the Members. The other Member will remain on Stage and will no longer be Paired."
            },
            {
                "key": "group_facedown",
                "question": "A Skill is making me turn one of the Paired Members face-down. What happens in this case?",
                "answer": "Only flip one of the Members. The other Member will remain face-up and will no longer be Paired."
            },
            {
                "key": "group_required",
                "question": "If a Skill requires me to \"Pair up\" ( \"Form a Trio\") and there is a matching Member, can I choose not to pair them? And can I unpair Members?",
                "answer": "If there are matching Members, they must be Paired up. Also, you cannot freely unpair Members."
            },
            {
                "key": "special_practice",
                "question": "What do [Special Practice] Skills do?",
                "answer": "If you Enter a Member with a [Special Practice] Skill, you can use that Skill by stacking on top of another Member card that matches the requirements. When ⟪ENTER⟫ing a Member with [Special Practice], you can flip an Unidolized Member on Stand-By who matches the name or other requirements listed next to the [Special Practice] icon facedown and place the ⟪ENTER⟫ing Member on top of them. Members that are stacked on top of another \"Member\" card are Idolized Members."
            },
            {
                "key": "special_practice_optional",
                "question": "Can I choose not to perform [Special Practice], even if there are matching Members on Stage?",
                "answer": "Yes. You can freely decide whether you want to use [Special Practice] or not."
            },
            {
                "key": "special_practice_always",
                "question": "Can I perform [Special Practice] both when I ⟪ENTER⟫ a card through an action on my turn and when I ⟪ENTER⟫ a card through a Skill?",
                "answer": "Yes, both work."
            },
            {
                "key": "idolized",
                "question": "What does \"Idolized\" or \"Unidolized\" mean?",
                "answer": "Members that are stacked on top of another Member card are Idolized. Members who are not Idolized, including those who do not have a [Special Practice] Skill, are Unidolized."
            },
            {
                "key": "idolized_no_pieces",
                "question": "Can Members who do not have [Idolized] Pieces, such as {{link:LL15-050}}, be Idolized? What happens if they are Idolized?",
                "answer": "Yes, Members that are stacked on top of other Member cards are Idolized even if they don't have [Idolized] Pieces. In these cases, the Idolized state might still be referred to in the Member's Skills, or can be used with a Song card's Skill."
            },
            {
                "key": "idolized_live",
                "question": "When an Idolized Member performs in a ⟪LIVE⟫, what should I do with the face-down card they're stacked on top of?",
                "answer": "The face-down card remains below the Idolized Member when performing in the ⟪LIVE⟫ and is stays face-down. Be careful not to mix up the face-down card with the other Members performing in the ⟪LIVE⟫."
            },
            {
                "key": "idolized_move",
                "question": "An Idolized Member is being moved from the Stage to my Deck or Hand. What happens to the face-down card they're stacked on top of in that case?",
                "answer": "If an Idolized Member moves from the Stage to another location, such as the Deck or Hand, both the Idolized Member and the face-down card are moved to the same location. If they're moving to the top or bottom of the Deck, you can decide in which order they'll be."
            },
            {
                "key": "member_facedown",
                "question": "If a Member card is turned face-down, does it count as a Member?",
                "answer": "No, a face-down Member card will not be counted as a Member even if it is on Stage. (When a Skill calls for counting Members, or counting Members with certain names or Live Costumes, face-down cards are not included.)"
            },
            {
                "key": "entry_at_start",
                "question": "When the Starting Members are turned face-up at the start of the match, can I use that card's [RUSH] or [Entry] Skill?",
                "answer": "No, the card's [RUSH] and [Entry] Skill will not be activated.<br>If all players agree, you can play with Starting Members' [Entry] Skills being activated as a house rule. If all of these Skills are activated at the beginning, picking a good Starting Member can give you a head start!"
            },
            {
                "key": "more_less",
                "question": "If a Skill has a condition like \"if you have less cards on your Hand than any of the other players\" or \"if you have more Live Points than any of the other players\", is it also met if I have the same amount as another player?",
                "answer": "No, these conditions are not met if you have the exact same amount."
            },
            {
                "key": "skill_impossible",
                "question": "",
                "answer": "Do as much as you are able to, and skip the rest. For example, if the Skill tells you to \"Draw three cards\" but you only have two in your deck, draw those two cards and continue."
            },
            {
                "key": "multiple_entry_abilities",
                "question": "I ⟪ENTER⟫ed a Member with [RUSH], and used it to ⟪ENTER⟫ another Member with [RUSH] or [LIVE]. Can I use their [RUSH]/[LIVE] now?",
                "answer": "You can only use one [RUSH] per turn, so you cannot use a second [RUSH].<br>You can use [LIVE] to immediately perform a ⟪LIVE⟫ ♪"
            },
            {
                "key": "top_deck_card_faceup",
                "question": "A Skill made me turn the top card of my Deck face-up, without adding it to my hand or ⟪ENTER⟫ing it. What should I do?",
                "answer": "Leave the card face-up. Once you can draw the card (by ⟪SCOUT⟫ing, etc.), you can hide the card from the other players again."
            },
            {
                "key": "skill_order_same_skill",
                "question": "If there are multiple things to do for one Skill, can I do them in any order?",
                "answer": "No. Make sure to perform everything in the order written. For example, if you activate the [Entry] Skill of {{link:LL05-046}} with no cards in your Hand and no Members used for Lives, you must draw cards before you perform a ⟪LIVE⟫."
            },
            {
                "key": "skill_order_multiple_skills",
                "question": "If a Member/Song/Memory card has two or more Skills (in one Skill field), can I use multiple if the conditions are met?",
                "answer": "Yes. You can use multiple Skills. For example, {{link:LL01-063}} can use both the [Entry] and [Live Join] Skills, as long as the conditions are met at those times.<br>Also, if a Member has two or more Skills with the same icon, such as {{link:LL05-049}} and {{link:EX10-002}}, use them in order, from the top. (Do not perform other card's Skills in-between Skills with the same icon of one card.)"
            },
            {
                "key": "group_skill_field",
                "question": "What do I have to do to use the Skills of a Member with two Skill fields?",
                "answer": "The top Skill can be used by just having the Member on Stage, like a normal Member card. The lower Skill can only be used when the Members are in a Pair (or Trio). (This also applies if the Skill text only spans one of the cards of the Pair, such as {{link:LL11-057}}.)"
            },
            {
                "key": "do_either",
                "question": "How should I handle a Skill that says \"Do either: ① ~ ② ~\"?",
                "answer": "Between the two effects, ① and ②, choose the one you'd like to perform. (If it says \"Do either\", you must pick one of the two.)<br>For example, in the [Entry] Skill of {{link:LL15-051}}, you can choose whichever effect you want between the two listed effects. (If the Member is Idolized, it's recommended to pick ②.)"
            },
            {
                "key": "do_either_conditions",
                "question": "For Skills like the [Entry] Skill of {{link:LL15-051}}, where it says \"② If this Member is Idolized\" - can I pick effects with conditions even if they are not met?",
                "answer": "Yes. You can choose that effect, but if the conditions are not met, nothing will happen."
            },
            {
                "key": "live_non_exact",
                "question": "Using the Members I have on Stage, I can't match the requirements of a Song card exactly. I won't be able to perform a ⟪LIVE⟫ this way, right?",
                "answer": "No, you can perform a ⟪LIVE⟫ even if your total Pieces exceed the requirement! However, you won't be able to use the excess Pieces for other Lives, so be careful not to run out of Pieces you need for more Lives.<br>As one example, it's alright if you just have every Member you have on Stand-By join when performing a ⟪LIVE⟫ that will hit the Live Points goal ♪ It's a big deal, so let's have them all perform together for the big, exciting finale!"
            },
            {
                "key": "live_join_pieces",
                "question": "A Member has gained additional Pieces or changed Pieces due to the effects of a [Live Join] Skill. What happens to those Pieces after a successful ⟪LIVE⟫?",
                "answer": "Pieces that have been added or changed through a [Live Join] Skill will remain like that afterwards, for the rest of the match. So if, for example, you perform a ⟪LIVE⟫ using {{link:EX11-047}} as the Song card, its Skill will count the [ALL] the Members gained from [Live Join] Skills, too."
            },
            {
                "key": "join_success_order",
                "question": "When performing a ⟪LIVE⟫, if both a joining Member and the Song card have a [Live Join] Skill, which one goes first?",
                "answer": "You can perform them in any order you like. This also applies to [Live Success] Skills. For example, if you only have three cards in your Hand, but then have {{link:LL03-059}} join a Live with {{link:LL06-062}} as the Song card, you can perform the Member's [Live Join] Skill first so you can have four cards in your hand, to meet the conditions of the [Live Join] Skill of {{red:\"Waku-Waku-Week!\"}}. Additionally, the following [Auto] Skills apply at the same time as [Live Join] or [Live Success] Skills, so you can also use them in any order you like.<br><br>[Live Join] <ul> <li>{{link:LL13-065}}</li> <li>{{link:LL13-066}}</li> <li>{{link:LL13-068}}</li> <li>{{link:LL14-069}}</li> <li>{{link:LL14-073}}</li> </ul><br>[Live Success] <ul> <li>{{link:LL11-070}}</li> <li>{{link:LL11-071}}</li> <li>{{link:LL13-064}}</li> <li>{{link:LL13-067}}</li> <li>{{link:LL13-069}}</li> <li>{{link:LL13-070}}</li> <li>{{link:LL13-071}}</li> <li>{{link:LL13-072}}</li> <li>{{link:LL14-068}}</li> <li>{{link:LL14-070}}</li> <li>{{link:LL14-071}}</li> <li>{{link:LL14-074}}</li> </ul>"
            },
            {
                "key": "flip_before_skills",
                "question": "When performing a ⟪LIVE⟫, what should be performed first - flipping over a new Song card, or the [Live Success] Skills?",
                "answer": "Flip a new Song card face-up first.<br>For example, when performing a ⟪LIVE⟫ using {{link:LL06-061}}, you reveal a new Song card before performing the Skill and turning one of the cards face-down."
            },
            {
                "key": "more_faceup_songs",
                "question": "There are currently three or more face-up Song cards in my Set List through Skills. If I perform a ⟪LIVE⟫ now, can I still flip over a new Song card?",
                "answer": "Yes. Regardless of how many face-up Song cards there are, if you perform a ⟪LIVE⟫, you flip one of the face-down Song cards in your Set List face-up."
            },
            {
                "key": "no_shuffle_facedown_song",
                "question": "The [Live Success] Skill of {{link:LL06-061}} says I should flip a face-up Song card face-down. How exactly should I do that?",
                "answer": "Simply flip it face-down in the same place where it is placed face-up. There is no need to shuffle your face-down Song cards unless specified otherwise."
            },
            {
                "key": "may_flip_other_facedown_song",
                "question": "After flipping a Song card face-down through a Skill, if I perform a ⟪LIVE⟫ or can flip a Song card face-up using another Skill, which Song card should I flip?",
                "answer": "You can choose any face-down card in your Set List you like and flip it face-up. It doesn't matter whether it was face-down from the beginning or flipped over because of a Skill."
            }
        ]
    }
];

export const load: PageServerLoad = (async ({locals}) => {
    const faq = <any>await prepareFaq(locals.DB, json);
    faq.sections[0].qa[1].answer = `As of November 2021, <span class="text-highlight-red">"µ's"</span> Song cards include:<ul><li>All Song cards from sets <a href="/set/LL01">LL01</a> to <a href="/set/LL03">LL03</a>, <a href="/set/LL13">LL13</a>, <a href="/set/EX01">EX01</a>, <a href="/set/EX11">EX11</a>, <a href="/set/EX15">EX15</a></li> <li>${cardLink(faq.cards["PR-012"])}</li> <li>${cardLink(faq.cards["PR-032"])}</li> <li>${cardLink(faq.cards["PR-203"])}</li> <li>${cardLink(faq.cards["PR-215"])}</li> <li>${cardLink(faq.cards["PR-226"])}</li></ul>As of November 2021, <span class="text-highlight-red">"Aqours"</span> Song cards include:<ul><li>All Song cards from sets <a href="/set/LL04">LL04</a> to <a href="/set/LL12">LL12</a>, <a href="/set/LL14">LL14</a> to <a href="/set/LL17">LL17</a>, <a href="/set/EX03">EX03</a>, <a href="/set/EX09">EX09</a>, <a href="/set/EX14">EX14</a> (except for: ${cardLink(faq.cards["LL10-062"])}, ${cardLink(faq.cards["LL10-063"])}, ${cardLink(faq.cards["LL14-064"])}, ${cardLink(faq.cards["LL15-057"])}) </li> <li>${cardLink(faq.cards["PR-069A"])} / ${cardLink(faq.cards["PR-069B"])}</li> <li>${cardLink(faq.cards["PR-124"])}</li> <li>${cardLink(faq.cards["PR-173"])}</li> <li>${cardLink(faq.cards["PR-193"])}</li> <li>${cardLink(faq.cards["PR-204"])}</li> <li>${cardLink(faq.cards["PR-225"])}</li></ul>`;
    faq.sections[0].qa[24].question = `What if I can't do something a Skill tells me to do? For example: <ul><li>"⟪SCOUT⟫" or "Draw three cards", but there's not enough cards in the Deck </li><li>"⟪ENTER⟫ one Member", but there's no Members able to ⟪ENTER⟫</li></ul>`;
    return faq;
}) satisfies PageServerLoad;