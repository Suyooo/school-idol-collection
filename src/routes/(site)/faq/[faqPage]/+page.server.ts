import { error } from "@sveltejs/kit";
import prepareFaq from "../prepareFaq.js";
import type { Faq } from "../prepareFaq.js";
import type { PageServerLoad } from "./$types.js";

export const _data: { [key: string]: Faq } = {
    LL01: [
        {
            subjects: [{ from: "LL01-046", to: "LL01-054" }],
            qa: [
                {
                    key: "all",
                    question: `Does this Skill require all three Members of the same Year to join the ⟪LIVE⟫?`,
                    answer: `No. If, for example, {{link:LL01-046}} is joining a ⟪LIVE⟫ with either a {{red:"Kotori"}} or {{red:"Umi"}} card, she will gain +[ALL].`,
                },
                {
                    key: "other",
                    question: `Does the condition for {{link:LL01-046}}'s Skill include cards other than this "Honoka" card?`,
                    answer: `No. It means all {{red:"Honoka"}} cards are excluded. She only gains +[ALL] if a {{red:"Kotori"}} or {{red:"Umi"}} card joins the same ⟪LIVE⟫. No other joining Members have an effect.`,
                },
            ],
        },
        {
            subjects: ["LL01-055"],
            seeAlso: ["/faq/general#more_less"],
        },
        {
            subjects: ["LL01-056"],
            qa: [
                {
                    question: `Does this Skill activate if performing a ⟪LIVE⟫ using a Song card which awards something like {{red:"3+1"}} Live Points?`,
                    answer: `Yes. It will activate if the total of both base and bonus Live Points gained is 4 or more. However, you must meet the conditions to gain the bonus Live Points.`,
                },
            ],
        },
        {
            subjects: ["LL01-057"],
            seeAlso: ["/faq/general#top_deck_card_faceup"],
        },
        {
            subjects: ["LL01-060"],
            seeAlso: ["/faq/general#more_faceup_songs"],
        },
        {
            subjects: ["LL01-063"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#more_less"],
        },
        {
            subjects: ["LL01-064", "LL01-065", "LL01-072", "LL01-073", "LL01-074"],
            seeAlso: ["/faq/general#member_counting"],
        },
    ],
    LL02: [
        {
            subjects: [{ from: "LL02-046", to: "LL02-054" }],
            qa: [
                {
                    question: "Does this Skill require both of the listed Members to join the ⟪LIVE⟫?",
                    answer: 'No. If, for example, {{link:LL02-046}} is joining a ⟪LIVE⟫ with either a {{red:"Kotori"}} or {{red:"Hanayo"}} card, she will gain +[ALL].',
                },
            ],
        },
        {
            subjects: ["LL02-055"],
            qa: [
                {
                    question: 'If I don\'t have two {{red:"Honoka"}} cards in my Hand, can I keep my Hand hidden?',
                    answer: 'Yes. Because the Skill says "You may", you are not forced to reveal your Hand.',
                },
            ],
        },
        {
            subjects: ["LL02-056"],
            seeAlso: ["/faq/general#entry_at_start", "/faq/general#stand_by"],
            qa: [
                {
                    key: "only",
                    question:
                        'If this card is the only {{red:"Eli"}} card on Stand-By after ⟪ENTER⟫ing, do I have to return it to my Hand?',
                    answer: "Yes. Return the ⟪ENTER⟫ed Member to your Hand.",
                },
                {
                    key: "none",
                    question: 'Can I return an {{red:"Eli"}} card without Stars to my Hand?',
                    answer: "Yes. You can't draw any cards, but you can return the Member to your Hand.",
                },
            ],
        },
        {
            subjects: ["LL02-057"],
            qa: [
                {
                    key: "live",
                    question: "Can I only use this Skill if I perform a ⟪LIVE⟫ using this card's [LIVE] ?",
                    answer: "No. You can use this skill in any ⟪LIVE⟫ this Member is joining.",
                },
                {
                    key: "may",
                    question: "Do I have to return a Member to the bottom of my Deck if this card joins a ⟪LIVE⟫?",
                    answer: 'No. Because the Skill says "You may return", you do not have to return a Member if you already have enough Pieces.',
                },
            ],
        },
        {
            subjects: ["LL02-059"],
            qa: [
                {
                    question:
                        "After entering this Member using a {{red:\"Rin\"}} card's [RUSH], I ⟪ENTER⟫ed a card with an [Entry] Skill (such as {{link:LL02-055}}), and I also drew a card. Can I use the card I drew for the ⟪ENTER⟫ed card's Skill?",
                    answer: "Yes. You draw the card before resolving the ⟪ENTER⟫ed card's [Entry] Skill, so you can use that card for it.",
                },
            ],
        },
        {
            subjects: ["LL02-060"],
            seeAlso: ["/faq/general#stand_by"],
            qa: [
                {
                    key: "other",
                    question: 'Which Members are meant by "Members other than {{red:"Maki"}}"?',
                    answer: 'Any Member whose name is not {{red:"Maki Nishikino"}}.',
                },
                {
                    key: "rush",
                    question:
                        "If this Member was ⟪ENTER⟫ed using another card's [RUSH], can I return the Member who has [RUSH] to my Hand?",
                    answer: 'Yes. That Member is on Stand-By, so you can return it to your Hand. If they are the only Member other than {{red:"Maki"}}, you have to return it.',
                },
            ],
        },
        {
            subjects: ["LL02-061"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#top_deck_card_faceup"],
            qa: [
                {
                    key: "scout",
                    question: "When I ⟪SCOUT⟫ using this Member's Skill, do I draw the card I flipped face-up?",
                    answer: "Yes. It is still the top card of your Deck, so you should draw it. After drawing it, you can hide the front side again.",
                },
                {
                    key: "matchthis",
                    question:
                        'There is no other {{red:"Nozomi"}} card on Stand-By besides this card that just ⟪ENTER⟫ed. If I flip over a {{red:"Nozomi"}} card using this Skill, can I ⟪SCOUT⟫?',
                    answer: 'Yes. The {{red:"Nozomi"}} card you just ⟪ENTER⟫ed is on Stand-By, so you can ⟪SCOUT⟫.',
                },
            ],
        },
        {
            subjects: ["LL02-062"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#top_deck_card_faceup"],
            qa: [
                {
                    question:
                        'There is was another Member with the same name as the flipped card on Stand-By, and it\'s not a {{red:"Hanayo"}} card. What happens in this case?',
                    answer: "Nothing happens. The flipped card remains face-up on top of your Deck.",
                },
            ],
        },
        {
            subjects: ["LL02-063"],
            qa: [
                {
                    question:
                        'If, for example, I perform a ⟪LIVE⟫ with this {{red:"Nico"}} card and two {{red:"Honoka"}} cards, does this Skill add the extra Piece?',
                    answer: 'No. This Skill counts the amount of Member cards, not different Members. In this case, the {{red:"Nico"}} card is one of three total Members, so the condition is not met and the Piece is not added.',
                },
            ],
        },
        {
            subjects: ["LL02-064"],
            qa: [
                {
                    key: "each",
                    question: "If multiple Lives use this Song card, is the Live Points goal increased for each one?",
                    answer: "Yes. One point is added for each card used.",
                },
                {
                    key: "increase_first",
                    question:
                        "I performed a ⟪LIVE⟫ with this Song when the Live Points goal was 9, and hit 9 Live Points. Do I win?",
                    answer: "No. The Live Points goal was increased by one, so you need another point.",
                },
                {
                    key: "win",
                    question:
                        "If playing with three or more players, what happens if a Live using this Song card is performed when one of the players already won with 9 Live Points?",
                    answer: "The players who have already won will remain winners. The Live Points goal increases for the remaining players.",
                },
                {
                    key: "out",
                    question:
                        "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                    answer: "Yes. [While Live] Skills will be active until the end of the game.",
                },
            ],
        },
        {
            subjects: ["LL02-065"],
            seeAlso: ["/faq/general#member_counting", "/faq/general#flip_before_skills"],
        },
        {
            subjects: ["LL02-067"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL02-073", "LL02-074", "LL02-075"],
            qa: [
                {
                    question:
                        'The Skill says "all three" Members must join this ⟪LIVE⟫ - does that mean I can\'t use this Skill of this Song card unless I perform the ⟪LIVE⟫ with exactly three Member cards?',
                    answer: "No. As long as at least one card of each mentioned Member is joining, you can use as many Member cards for this ⟪LIVE⟫ as you want.",
                },
            ],
        },
    ],
    LL03: [
        {
            subjects: ["LL03-056"],
            qa: [
                {
                    question: 'What are "Base Live Points"?',
                    answer: 'It refers to the large number in the top right of the Song card. If there are Bonus Live Points, as in "2 + 1", it only refers to the number on the left.',
                },
            ],
        },
        {
            subjects: ["LL03-057"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL03-058"],
            qa: [
                {
                    key: "three",
                    question:
                        "When I ⟪ENTER⟫ed this Member, there already were three face-up Song card in my Set List. Can I still ⟪ENTER⟫ the top card of my Deck?",
                    answer: "Yes. No matter whether you flipped cards or not, as long as you meet the Attribute requirement, you can ⟪ENTER⟫ the top card of your deck.",
                },
                {
                    key: "flip",
                    question:
                        "There was only one face-up Song card in my Set List when I ⟪ENTER⟫ed this Member. Which Song cards should I flip and how?",
                    answer: "Flip face-down cards one by one until there are three face-up cards.<br>If there are any Song cards that were flipped face-down by another Skill, you can, but don't have to choose them.<br>After you have flipped your first card, you may choose your second card after seeing which Song card you just turned over.",
                },
            ],
        },
        {
            subjects: ["LL03-061"],
            qa: [
                {
                    question: 'Which Members are meant by "other Members"?',
                    answer: 'Any card that is not this one. For example, you may use this Member\'s Skill to give +[ALL][ALL] to any other {{red:"Nozomi"}} card, including another {{link:LL03-061}}.',
                },
            ],
        },
        {
            subjects: ["LL03-062"],
            qa: [
                {
                    question:
                        "If this Skill's requirement is not met, but there's a Member with three Stars joining the same ⟪LIVE⟫, will this card gain +[ALL][ALL]?",
                    answer: "No. At the time the [Live Join] Skill is resolved, there are no Members in Lives with three or more Stars, so this card will not gain +[ALL][ALL].",
                },
            ],
        },
        {
            subjects: ["LL03-065"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL03-066"],
            seeAlso: ["/faq/general#member_counting", "/faq/general#flip_before_skills"],
        },
        {
            subjects: ["LL03-068"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL03-071"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL03-072", "LL03-073", "LL03-074"],
            qa: [
                {
                    question:
                        "Are the Skill requirements for these Song cards only met if all three Members of the unit join?",
                    answer: 'No. It is not neccessary for all three to be there. For example, if you perform a ⟪LIVE⟫ with {{link:LL03-072}} with only {{red:"Honoka"}} cards, the Any Piece requirement is still reduced by 3.',
                },
            ],
        },
    ],
    LL04: [
        {
            subjects: [{ from: "LL04-037", to: "LL04-045" }],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question:
                        'When counting "differently named {{red:"Aqours"}} Members", should I count the card that has this Skill, too?',
                    answer: "Yes. They count as well.",
                },
            ],
        },
        {
            subjects: ["LL04-046"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#member_counting", "/faq/general#more_less"],
            qa: [
                {
                    question:
                        "At the time I ⟪ENTER⟫ed this Member, there were eight other Members on Stand-By. Can I ⟪SCOUT⟫using this Skill?",
                    answer: "No. This Member counts as well, so there are nine Members on Stand-By and the Skill's condition is not met.",
                },
            ],
        },
        {
            subjects: ["LL04-047"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#join_success_order"],
            qa: [
                {
                    question: "If two or more of this card join a ⟪LIVE⟫, can I flip further Song cards?",
                    answer: 'Yes. For example, if two of this {{red:"Riko"}} card join a ⟪LIVE⟫, you can, together with the one Song card you flip from performing a ⟪LIVE⟫ by default, flip a total of three cards.',
                },
            ],
        },
        {
            subjects: ["LL04-048"],
            qa: [
                {
                    question:
                        "The card I returned from my Hand to the bottom of my Deck to use the [Entry] Skill was the last card in my Hand. Can I still choose the ⟪ENTER⟫ option?",
                    answer: "Yes. As long as you return a card to the bottom of your Deck, you can choose either.<br>If you don't have any cards in your Hand, you can't ⟪ENTER⟫ a card from your Hand, which means you can't do anything when picking that option.",
                },
            ],
        },
        {
            subjects: ["LL04-049"],
            qa: [
                {
                    question: "What happens if the top card of the Deck is flipped face-up, or the Deck is empty?",
                    answer: 'Even if the card is visible to them, the next player must "guess" whether it has Stars or not, then use the effect corresponding to the answer.<br>If your Deck is empty, you cannot use this Skill.',
                },
            ],
        },
        {
            subjects: ["LL04-050"],
            seeAlso: ["/faq/general#skill_order_same_skill"],
        },
        {
            subjects: ["LL04-051"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL04-052"],
            qa: [
                {
                    question: "Can the other players choose to not draw a card?",
                    answer: "No. You always draw three cards, and the other players always draw one card each.",
                },
            ],
        },
        {
            subjects: ["LL04-060"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL04-061"],
            qa: [
                {
                    key: "member",
                    question:
                        "Is the draw limit increased by one even if I ⟪SCOUT⟫ using a Skill like the one of {{link:LL04-046}}?",
                    answer: 'Yes. Even if you use a Skill to do so, ⟪SCOUT⟫ing will always get +1 extra card. Note that Skills such as "Draw X cards" are not ⟪SCOUT⟫s, so you cannot draw extra cards.',
                },
                {
                    key: "out",
                    question:
                        "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                    answer: "Yes. [While Live] Skills will be active until the end of the game.",
                },
            ],
        },
        {
            subjects: ["LL04-062"],
            qa: [
                {
                    question:
                        "{{link:LL04-053}} is joining this ⟪LIVE⟫, after I chose to use [RUSH] when I ⟪ENTER⟫ed her. Will she still gain +[ALL] from this Song card's Skill?",
                    answer: "Yes. She has a [LIVE] icon, so she will gain +[ALL].",
                },
            ],
        },
        {
            subjects: ["LL04-064"],
            seeAlso: ["/faq/general#member_counting", "/faq/general#flip_before_skills"],
        },
        {
            subjects: ["LL04-065"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question:
                        "The Members joining this ⟪LIVE⟫ have 3x [SMILE] and 1x [ALL] in total. Will the requirement be reduced to 2?",
                    answer: "No. This Skill requires four or more Pieces of one of the Attribute types [SMILE], [PURE], [COOL] or [ALL]. You cannot count [ALL] as a Piece of an Attribute of your choice.",
                },
            ],
        },
    ],
    LL05: [
        {
            subjects: ["LL05-046"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#skill_order_same_skill"],
            qa: [
                {
                    question:
                        "There are three conditions and effects each, can I use multiple effects of the [Entry] Skill if the respective conditions are met?",
                    answer: "Yes. For example, if you have no cards in your Hand and no Song cards that are Live on your Stage when this card is ⟪ENTER⟫ed, you may both draw three cards and perform a ⟪LIVE⟫ with this card.",
                },
            ],
        },
        {
            subjects: ["LL05-047"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "other",
                    question:
                        "On the turn after this card was ⟪ENTER⟫ed, another {{link:LL05-047}} was ⟪ENTER⟫ed. Can this card join a ⟪LIVE⟫ in my next turn?",
                    answer: 'Yes. The [Entry] Skills are handled seperately for each card, so the first card can join a ⟪LIVE⟫. However, the second {{red:"Riko"}} will not be able to join yet in that turn.',
                },
                {
                    key: "live",
                    question:
                        "I used this card's [RUSH] to ⟪ENTER⟫ another Member with [LIVE]. Can I perform a ⟪LIVE⟫?",
                    answer: "Yes. This card cannot join the ⟪LIVE⟫ due to the Skill, but you can still perform ⟪LIVE⟫s using other Members' [LIVE].",
                },
            ],
        },
        {
            subjects: ["LL05-048"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#stand_by"],
            qa: [
                {
                    question:
                        "I ⟪ENTER⟫ed this card using the [RUSH] from the [RUSH]/[LIVE] of {{link:LL04-053}}. In this case, can I perform a ⟪LIVE⟫ with those two cards?",
                    answer: 'Yes. The {{red:"Mari"}} card has a [LIVE] icon, so you can use this card\'s Skill to perform a ⟪LIVE⟫.',
                },
            ],
        },
        {
            subjects: ["LL05-049"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "both",
                    question: "If both Skill's requirements are met, does this card get both Pieces?",
                    answer: "Yes. In that case, you will get two Pieces, one from each Skill.",
                },
                {
                    key: "name",
                    question:
                        "If this card joins a ⟪LIVE⟫ with {{link:LL04-057}}, does it get +[ALL] from the second Skill?",
                    answer: "No. The Song name is not part of the Skill text, so the requirement for the second Skill is not met.",
                },
            ],
        },
        {
            subjects: ["LL05-050"],
            seeAlso: ["/faq/general#stand_by"],
        },
        {
            subjects: ["LL05-051"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#stand_by"],
        },
        {
            subjects: ["LL05-052"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "rush",
                    question:
                        "If this card is ⟪ENTER⟫ed using a [RUSH], can I use it's own [RUSH] in addition to it's [On Entry] Skill?",
                    answer: "No. You can only use one [RUSH] per turn, so you cannot use this card's [RUSH].",
                },
                {
                    key: "icon",
                    question:
                        "Using this card's [On Entry] Skill, I ⟪ENTER⟫ed another {{link:LL05-052}}. Does this count as being ⟪ENTER⟫ed using [RUSH]?",
                    answer: "No. The Skill requires this card to have been ⟪ENTER⟫ed as the direct result of a [RUSH]. It does not depend on whether the card you used to ⟪ENTER⟫ this card has a [RUSH] icon or not.",
                },
            ],
        },
        {
            subjects: ["LL05-053"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question:
                        "Can Pieces gained through [Live Join] Skills be used for this Skill's requirement?<br>For example, could {{link:LL05-039}} be used as not only the Member for [PURE], but also for [SMILE] or [COOL] if her Skill is activated?",
                    answer: "Yes. If their requirements are met, Pieces gained through [Live Join] Skills can be used for this Skill's requirement.",
                },
            ],
        },
        {
            subjects: ["LL05-054"],
            qa: [
                {
                    question:
                        "I ⟪ENTER⟫ed this card through {{link:LL04-054}}'s Skill. In that case, since {{link:LL04-054}} is placed at the bottom of the deck, can I ⟪ENTER⟫ it by choosing to show the bottom card of my deck with this card's Skill?",
                    answer: "Yes. {{link:LL04-054}} is at the bottom of the Deck at the time the [Entry] Skill is resolved, so you can ⟪ENTER⟫ it from there.",
                },
            ],
        },
        {
            subjects: ["LL05-056"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL05-057"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL05-059"],
            qa: [
                {
                    question:
                        "We have counted the number of differently named Members on our Stages, but there's a tie between players for the lowest number. What happens in that case?",
                    answer: "The Skill resolves without anyone drawing cards.",
                },
            ],
        },
        {
            subjects: ["LL05-060"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL05-061"],
            seeAlso: ["/faq/general#member_counting"],
        },
    ],
    LL06: [
        {
            subjects: [{ from: "LL06-028", to: "LL06-036" }],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["LL06-046"],
            qa: [
                {
                    key: "one",
                    question:
                        "When I ⟪ENTER⟫ed this card, I only had one card in my Hand. I want to empty my Hand, so can I return only one card to the bottom my Deck?",
                    answer: "No. You cannot return only one card.",
                },
                {
                    key: "empty",
                    question:
                        "When I ⟪ENTER⟫ed this card, my Deck was empty. Can I use this Skill to ⟪ENTER⟫ one of the cards I returned?",
                    answer: "Yes. In that case, you ⟪ENTER⟫ the upper card of the two cards you returned.",
                },
            ],
        },
        {
            subjects: ["LL06-047"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question:
                        'What does "If the face-up Song cards in your Set List have two or more different Attributes" mean?',
                    answer: "Count how many different colors the face-up Song cards in your Set List have (Red/Smile, Green/Pure, Blue/Cool, Yellow/Neutral). If there are two or more, the requirement is met.<br>For example, if you have {{link:EX03-028}}, {{link:LL04-064}} and {{link:LL06-058}} in your Set List, since their attributes are Pure / Neutral / Neutral, you have two different Attributes.",
                },
            ],
        },
        {
            subjects: ["LL06-048"],
            qa: [
                {
                    question: "What happens if I ⟪ENTER⟫ this card with less than three cards in my Deck?",
                    answer: 'If you have two cards in your Deck, show those two cards, pick one of them to add to your Hand, and return the other to the bottom of your Deck.<br>If the card you returned was a {{red:"Kanan"}} card, you can ⟪ENTER⟫ a {{red:"Kanan"}} card with [LIVE] from your Hand.<br>If you have only one card in your Deck, you can show it and add it to your Hand. However, since you can\'t return a card to your Deck, you cannot ⟪ENTER⟫ a {{red:"Kanan"}} card with [LIVE] from your Hand. (Also, you cannot choose not to add a card to your Hand.)<br>If your Deck is empty, nothing happens.',
                },
            ],
        },
        {
            subjects: ["LL06-049"],
            qa: [
                {
                    question:
                        'Does the "⟪ENTER⟫ed from your Hand" requirement also count ⟪ENTER⟫ing using [RUSH] and ⟪ENTER⟫ ing using Skills such as {{link:LL04-048}}?',
                    answer: "Yes. The requirement is not only met if you pick ⟪ENTER⟫ as your turn action, but also if you use a [RUSH] or a Skill to ⟪ENTER⟫ this card.",
                },
            ],
        },
        {
            subjects: ["LL06-050"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#skill_order_same_skill"],
            qa: [
                {
                    key: "count",
                    question: 'What does "three or more different Live Costumes" mean?',
                    answer: 'Count how many different Live Costumes your Member cards have (in the lower left).<br>For example, if you have Member cards with the Live Costumes {{red:"Aozora Jumping Heart"}}, {{red:"Aozora Jumping Heart"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} and {{red:"Koi ni Naritai AQUARIUM"}}, you have three different Live Costumes.',
                },
                {
                    key: "live",
                    question:
                        'If I perform a ⟪LIVE⟫ using this card\'s Skill, do the {{red:"You"}} cards I counted for the requirement have to join?',
                    answer: "No. They do not have to join the ⟪LIVE⟫.",
                },
                {
                    key: "order",
                    question:
                        'Not all of my Members on my Stage are {{red:"You"}} cards, but the {{red:"You"}} cards have three or more different Live Costumes. Can I use this Skill to perform a ⟪LIVE⟫?',
                    answer: 'No. If the first part of the requirement is not met, you cannot use the second part of the Skill past the "Then...".',
                },
            ],
        },
        {
            subjects: ["LL06-051"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#member_counting"],
            qa: [
                {
                    key: "skip",
                    question: 'What does "skipped a turn" or "haven\'t skipped a turn" mean?',
                    answer: 'You might have to skip a turn due to some Skills (such as {{link:LL01-071}} and {{link:LL04-051}}). If you were affects by such a Skill at least once in this match, you have "skipped a turn". Otherwise, if you haven\'t had a Skill like that affect you in this match so far, you "haven\'t skipped a turn".',
                },
                {
                    key: "intent",
                    question: "Can I intentionally skip a turn by not choosing an action on my turn?",
                    answer: "No. You must either ⟪SCOUT⟫, ⟪ENTER⟫ a card or perform a ⟪LIVE⟫.",
                },
            ],
        },
        {
            subjects: ["LL06-052"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question:
                        "If two or more of this card join the same ⟪LIVE⟫, can I treat their Pieces as [ALL], too?",
                    answer: 'Yes. Their Skills will affect each other\'s [SMILE], so this results in treating all Pieces of all {{red:"Hanamaru"}} cards as [ALL].',
                },
            ],
        },
        {
            subjects: ["LL06-053"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#top_deck_card_faceup",
                "/faq/general#join_success_order",
            ],
        },
        {
            subjects: ["LL06-054"],
            qa: [
                {
                    key: "skills",
                    question:
                        'Does the "⟪ENTER⟫ed from your Deck" requirement also count ⟪ENTER⟫ing using Skills such as {{link:LL04-054}}?',
                    answer: "Yes. The requirement is not only met if you pick ⟪ENTER⟫ as your turn action, but also if you use a Skill to ⟪ENTER⟫ this card.",
                },
                {
                    key: "sameturn",
                    question:
                        'If I ⟪ENTER⟫ this card using a {{red:"Ruby"}} card\'s Skill, can the card I ⟪ENTER⟫ from my Hand be one of the cards I drew from the first part of the Skill?',
                    answer: "Yes. The drawn cards can be ⟪ENTER⟫ed.",
                },
            ],
        },
        {
            subjects: ["LL06-058"],
            seeAlso: ["/faq/general#flip_before_skills"],
            qa: [
                {
                    key: "lowest",
                    question: 'What does "Member with the lowest number of cards in this ⟪LIVE⟫" mean?',
                    answer: 'Count how many cards of each differently named Member have joined this ⟪LIVE⟫.<br>For example, if there are three {{red:"Chika"}} cards, two {{red:"You"}} cards, and one {{red:"Riko"}} card joining a ⟪LIVE⟫, {{red:"Riko"}} is the Member with the lowest number of cards in this ⟪LIVE⟫.',
                },
                {
                    key: "none",
                    question:
                        'When choosing a "Member with the lowest number of cards in this ⟪LIVE⟫", can I pick a Member with no cards in this ⟪LIVE⟫?',
                    answer: "No. You cannot choose a Member who didn't join the ⟪LIVE⟫ at all.",
                },
                {
                    key: "tie",
                    question:
                        'If there are multiple Members who meet the "Member with the lowest number of cards in this ⟪LIVE⟫" requirement, can I pick and ⟪ENTER⟫ cards for each of them?',
                    answer: "No. You must choose one of the tied Members. You cannot ⟪ENTER⟫ cards of the other Members.",
                },
            ],
        },
        {
            subjects: ["LL06-059"],
            qa: [
                {
                    key: "two",
                    question: "In a two-player game, can the second player use this Skill?",
                    answer: "Yes. No matter how many people are playing in the match, the requirement is met for whoever is the last to take their turn.",
                },
                {
                    key: "move",
                    question:
                        "There are three players in the match, and the third player in the turn order won. Can the second player now use this Skill?",
                    answer: "No. Only the order as it was decided during setup counts, so the player who is last in the turn order doesn't change.",
                },
            ],
        },
        {
            subjects: ["LL06-061"],
            seeAlso: ["/faq/general#no_shuffle_facedown_song", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL06-062"],
            seeAlso: ["/faq/general#join_success_order"],
        },
    ],
    LL07: [
        {
            subjects: [{ from: "LL07-037", to: "LL07-045" }],
            seeAlso: ["/faq/general#stand_by"],
        },
        {
            subjects: ["LL07-046"],
            qa: [
                {
                    question: "What happens if I ⟪ENTER⟫ this card with less than three cards in my Deck?",
                    answer: 'Even if you have less than three cards in your Deck, you can add one Member without Stars to your Hand and return the rest to the bottom of your Deck. However, even if all of them have no Stars, you cannot take another turn, as the requirement for that effect calls for "three cards without Stars" to be shown.',
                },
            ],
        },
        {
            subjects: ["LL07-047"],
            qa: [
                {
                    question:
                        "If I only have one face-up Song card in my Set List, can I flip one face-down Song card face-up?",
                    answer: 'Yes. The "all your face-up Song cards have the same Attribute" requirement is met in this case, so you can flip one face-down Song card face-up.',
                },
            ],
        },
        {
            subjects: ["LL07-048"],
            qa: [
                {
                    key: "same",
                    question: 'What does "Member with the same Pieces" mean?',
                    answer: "It means a Member who has the exact same number including Piece attributes as another Member. The order of Pieces does not matter, so if you ⟪ENTER⟫ed a Member with [SMILE][PURE], you can ⟪ENTER⟫ another Member with [PURE][SMILE].",
                },
                {
                    key: "bday",
                    question:
                        "If I ⟪ENTER⟫ {{link:LL06-008}} with the Birthday Bonus active using this card's Skill, can I ⟪ENTER⟫ {{link:LL07-051}} from my Hand?",
                    answer: "Yes. When the Birthday Bonus is active, the bonus Pieces are added to that card, so in this example, you can ⟪ENTER⟫ {{link:LL07-051}}.",
                },
            ],
        },
        {
            subjects: ["LL07-049"],
            qa: [
                {
                    question:
                        "Can I choose not to draw a card if the designated player decides to let everyone draw cards?",
                    answer: "No. If they decided to have everyone draw cards, all players must draw a card.",
                },
            ],
        },
        {
            subjects: ["LL07-050"],
            qa: [
                {
                    question:
                        "When I ⟪ENTER⟫ed this card, my Deck was empty. Can I use this Skill to ⟪ENTER⟫ the card I returned?",
                    answer: "Yes. Since it's the only card you can look at from your Deck, you will only be to ⟪ENTER⟫ the card your returned to your Deck.",
                },
            ],
        },
        {
            subjects: ["LL07-052"],
            seeAlso: ["/faq/general#more_less", "/faq/general#join_success_order"],
            qa: [
                {
                    question:
                        "In a two-player match, both players have the same amount of cards in their Hand. What happens in case there are two or more of this Member participating in a ⟪LIVE⟫?",
                    answer: 'The first {{red:"Hanamaru"}} \'s Skill will result in the player drawing a card. After that, when the Skills of the other {{red:"Hanamaru"}} cards are resolved, the player will have more cards in their Hand than the other player, so the cards will gain +[ALL].',
                },
            ],
        },
        {
            subjects: ["LL07-053"],
            qa: [
                {
                    key: "hand",
                    question:
                        "If a Member doesn't have [ALL], but has a Skill such as [Live Join] that allows them to gain [ALL], can I use this card's Skill to ⟪ENTER⟫ them?",
                    answer: "No. Skills such as [Live Join] will only be resolved at that time, so when the card is still in your Hand, it does not have [ALL].",
                },
                {
                    key: "idolize",
                    question:
                        "The Member I ⟪ENTER⟫ed using this card's Skill has a [Special Practice] Skill, and after being Idolized, they have three or more [ALL]. Can I draw three cards in this case?",
                    answer: "Yes. This [Entry] Skill counts the number of Pieces after the Member was ⟪ENTER⟫ed. If a Member is Idolized through a [Special Practice] Skill, [Idolized (Piece Bonus)] will be active when the card appears on the Stage, so including those, the Member has three or more [ALL] and the requirement is met.",
                },
            ],
        },
        {
            subjects: ["LL07-055"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#flip_before_skills"],
            qa: [
                {
                    key: "end",
                    question:
                        "With this ⟪LIVE⟫, I've reached the Live Points target. If the Skill Requirement is met, can I still perform another ⟪LIVE⟫?",
                    answer: "No. When they reach the Live Points target, the winner is removed from the rest of the match, so they cannot perform a ⟪LIVE⟫.",
                },
                {
                    key: "other",
                    question: 'What happens if non-{{red:"CYaRon!"}} Members are participating in this ⟪LIVE⟫?',
                    answer: 'As long as {{red:"Chika"}}, {{red:"You"}} and {{red:"Ruby"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating.',
                },
            ],
        },
        {
            subjects: ["LL07-056"],
            qa: [
                {
                    key: "noall",
                    question:
                        "{{link:LL05-053}} is joining a ⟪LIVE⟫ with this Song card while this card's Skill requirement is met. There are also members with [SMILE], [PURE] and [COOL]. Will the {{red:\"Mari\"}} card gain +[ALL] from it's [Live Join] Skill?",
                    answer: 'No. The Skill of this Song card changes all [SMILE][PURE][COOL] of the Members joining this ⟪LIVE⟫ into [ALL] before [Live Join] Skills are resolved. That means that in this case, {{red:"Mari"}} does not gain +[ALL].',
                },
                {
                    key: "later",
                    question:
                        "A member who joined a ⟪LIVE⟫ with this Song card gained +[SMILE] through a [Live Join] Skill. If the requirement for this card's Skill is met, will that Piece also be treated as [ALL] ?",
                    answer: "Yes. Pieces gained through Skills are treated as [ALL], too.",
                },
                {
                    key: "other",
                    question: 'What happens if non-{{red:"AZALEA"}} Members are participating in this ⟪LIVE⟫?',
                    answer: 'As long as {{red:"Kanan"}}, {{red:"Dia"}} and {{red:"Hanamaru"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating.',
                },
            ],
        },
        {
            subjects: ["LL07-057"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"],
            qa: [
                {
                    key: "each",
                    question: 'What does "⟪ENTER⟫ one Member of each Member of {{red:"Guilty Kiss"}} " mean?',
                    answer: 'It means that you may ⟪ENTER⟫ up to one {{red:"Riko"}}, one {{red:"Yoshiko"}}, and one {{red:"Mari"}}. That means you can for example ⟪ENTER⟫ three Members, one of each, or ⟪ENTER⟫ only a {{red:"Riko"}} and a {{red:"Yoshiko"}} card.',
                },
                {
                    key: "other",
                    question: 'What happens if non-{{red:"Guilty Kiss"}} Members are participating in this ⟪LIVE⟫?',
                    answer: 'As long as {{red:"Riko"}}, {{red:"Yoshiko"}} and {{red:"Mari"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating.',
                },
            ],
        },
        {
            subjects: ["LL07-058"],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["LL07-059"],
            qa: [
                {
                    key: "each",
                    question: "If multiple Lives use this Song card, is the Live Points goal increased for each one?",
                    answer: "Yes. One point is added for each card used.",
                },
                {
                    key: "increase_first",
                    question:
                        "I performed a ⟪LIVE⟫ with this Song when the Live Points goal was 9, and hit 9 Live Points. Do I win?",
                    answer: "No. The Live Points goal was increased by one, so you need another point.",
                },
                {
                    key: "win",
                    question:
                        "If playing with three or more players, what happens if a Live using this Song card is performed when one of the players already won with 9 Live Points?",
                    answer: "The players who have already won will remain winners. The Live Points goal increases for the remaining players.",
                },
                {
                    key: "out",
                    question:
                        "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                    answer: "Yes. [While Live] Skills will be active until the end of the game.",
                },
            ],
        },
        {
            subjects: ["LL07-062"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting"],
        },
        {
            subjects: ["LL07-063"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: [{ from: "LL07-064", to: "LL07-081" }],
            qa: [
                {
                    question:
                        "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                    answer: "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the first player in the turn order can begin.",
                },
            ],
        },
    ],
    LL08: [
        {
            subjects: ["LL08-046"],
            qa: [
                {
                    question: `If I ⟪ENTER⟫ this card with three or more Live Points, am I forced to perform a ⟪LIVE⟫?`,
                    answer: `No. Since that option says "you may", you don't have to perform a ⟪LIVE⟫. However, you must draw cards.`,
                },
            ],
        },
        {
            subjects: ["LL08-047"],
            qa: [
                {
                    question: `What does "For each different Attribute of the face-up Song cards in your Set List" mean?`,
                    answer: `The Attribute of a Song card refers to the background color of the card. There are four colors: Red (Smile), Green (Pure), Blue (Cool) and Yellow (Neutral).<br>For example, if you have {{link:LL08-055}} and {{link:LL08-058}} face-up in your Set List, there's one Neutral and one Smile Song card, so you draw two cards.`,
                },
            ],
        },
        {
            subjects: ["LL08-048"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#join_success_order",
                "/faq/general#flip_before_skills",
            ],
        },
        {
            subjects: ["LL08-049"],
            qa: [
                {
                    question: `How exactly should this Skill be resolved?`,
                    answer: `Starting from the next player in turn order, every player may choose whether to call Dia "Dia-chan". The player after them can make their choice after hearing what the previous player decided on. Once everyone chose, you can resolve the Skill, choosing the effect based on whether everyone called Dia "Dia-chan".`,
                },
            ],
        },
        {
            subjects: ["LL08-050"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL08-051"],
            qa: [
                {
                    key: "win",
                    question: `What does "treat the loss as a win" mean?`,
                    answer: `You can change the result of the rock-paper-scissors match to a win for you. That means you can take another turn, because you now meet the "if you win" requirement.`,
                },
                {
                    key: "less",
                    question: `If I don't have three cards in my hand, can I still treat the loss as a win if I return all the cards in my Hand to the bottom of my Deck?`,
                    answer: `No. If you can't return three cards from your Hand to your Deck, you can't meet the requirement to change the loss to a win. (You must either return three cards to your Deck or none at all.)`,
                },
            ],
        },
        {
            subjects: ["LL08-052"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `If I have both no cards in my Hand and no Song cards used in Lives, does this cards still gain +[SMILE]?`,
                    answer: `Yes. If either requirement is met, this card gains +[SMILE], so meeting both requirements is fine. However, even if both requirements are met, the card will not gain +[SMILE][SMILE].`,
                },
            ],
        },
        {
            subjects: ["LL08-053"],
            seeAlso: ["/faq/general#more_faceup_songs", "/faq/general#no_shuffle_facedown_song"],
            qa: [
                {
                    question: `If I turn a face-up Song card face-down, I will have zero face-up Song cards in my Set List. Can I still perform ⟪LIVE⟫s like that?`,
                    answer: `No. If there are no face-up Song cards in your Set List, you cannot perform ⟪LIVE⟫s. As such, unless you have a Skill that allows you to turn a face-down Song card face-up again, you should avoid flipping your last Song card face-down.`,
                },
            ],
        },
        {
            subjects: ["LL08-054"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What does "if the Members on your Stage have three or more different Live Costumes" mean?`,
                    answer: `Count the number of different Live Costumes, shown in the bottom left of the Member cards. For example, if you have five cards with the Live Costumes {{red:"Aozora Jumping Heart"}}, {{red:"Aozora Jumping Heart"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} and {{red:"Koi ni Naritai AQUARIUM"}}, you have three different Live Costumes.`,
                },
            ],
        },
        {
            subjects: ["LL08-056"],
            qa: [
                {
                    question: `Using {{link:LL05-047}}'s [RUSH], I entered a Member with [LIVE]. ({{red:"Riko"}} cannot join a ⟪LIVE⟫ this turn.) If I perform a ⟪LIVE⟫ with {{red:"Yuuki wa Doko ni? Kimi no Mune ni!"}} in this situation and have every Member on my Stage except for {{red:"Riko"}} join, can I still meet this Skill's requirement?`,
                    answer: `No. Regardless of whether Members are blocked from joining ⟪LIVE⟫ or not, if there are Members on Stage who are not joining the ⟪LIVE⟫, the Skill does not activate.`,
                },
            ],
        },
        {
            subjects: ["LL08-057"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `What does "exactly three Members, {{red:"Riko"}}, {{red:"Hanamaru"}} and {{red:"Mari"}}" mean?`,
                    answer: `If one {{red:"Riko"}} card, one {{red:"Hanamaru"}} card and one {{red:"Mari"}} card join this ⟪LIVE⟫, the requirement is met. If a Member with a name other than those three joins, or one of those three does not join, or two or more cards with the same name join, the Skill will not activate.`,
                },
            ],
        },
        {
            subjects: ["LL08-058"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `Can the requirement be met if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `Yes. As long as there is a {{red:"Dia"}} card with [SMILE] and a {{red:"Ruby"}} card with [SMILE] joining, the Any Piece requirement is reduced by 3, regardless of what other Members join.`,
                },
            ],
        },
        {
            subjects: ["LL08-059"],
            qa: [
                {
                    question: `Can the requirement be met if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `Yes. As long as there is a {{red:"You"}} card with a Live Costume and a {{red:"Yoshiko"}} with a Live Costume joining, the Any Piece requirement is reduced by 3, regardless of what other Members join.`,
                },
            ],
        },
        {
            subjects: ["LL08-060"],
            qa: [
                {
                    question: `Can the requirement be met if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `Yes. As long as there is a "Chika" card with [RUSH] or [LIVE] and a "Kanan" card with [RUSH] or [LIVE] joining, the Any Piece requirement is reduced by 3, regardless of what other Members join.`,
                },
            ],
        },
        {
            subjects: [{ from: "LL08-064", to: "LL08-081" }],
            qa: [
                {
                    question:
                        "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                    answer: "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the first player in the turn order can begin.",
                },
            ],
        },
    ],
    EX10: [
        {
            subjects: ["EX10-001"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `If there are Members without Live Costumes on Stage, can I meet the "all Members on your Stage have the {{red:"MIRAI TICKET"}} Live Costume" requirement?`,
                    answer: `No. All Members on Stage must have a Live Costume and it must be the {{red:"MIRAI TICKET"}} Live Costume.`,
                },
            ],
        },
        {
            subjects: ["EX10-002"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#more_faceup_songs"],
            qa: [
                {
                    key: "setlist",
                    question: `I don't have {{red:"MIRAI TICKET"}} in my Set List, but there is an active ⟪LIVE⟫ with {{red:"MIRAI TICKET"}}. If I ⟪ENTER⟫ this card in this situation, can I ⟪ENTER⟫ the top card of my Deck?`,
                    answer: `No. The face-up {{red:"MIRAI TICKET"}} is not in your Set List, so the requirement is not met.`,
                },
                {
                    key: "order",
                    question: `There are two [Entry] Skills, can I use the second Skill first?`,
                    answer: `No. You must resolve the Skills from top to bottom.`,
                },
            ],
        },
        {
            subjects: ["EX10-003"],
            qa: [
                {
                    key: "return",
                    question: `I showed everyone the top card of my Deck, and it was not a Member who has the {{red:"MIRAI TICKET"}} Live Costume. Can I return it to the bottom of my Deck?`,
                    answer: `No. You must return it to the top of your Deck. If you show the bottom card of your Deck, you must return the card to the bottom.`,
                },
                {
                    key: "other",
                    question: `I showed everyone the top card of my Deck, and it was not a Member who has the {{red:"MIRAI TICKET"}} Live Costume. Can I show the bottom card of my Deck now?`,
                    answer: `No. Choose either only the top or only the bottom card of your Deck. If the shown Member does not have the {{red:"MIRAI TICKET"}} Live Costume, return the card, and the Skill is resolved.`,
                },
            ],
        },
        {
            subjects: ["EX10-004"],
            seeAlso: ["/faq/general#skill_impossible"],
        },
        {
            subjects: ["EX10-005"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `If there are Members without Live Costumes joining the ⟪LIVE⟫, can I meet the "all Members joining this ⟪LIVE⟫ have the "MIRAI TICKET" Live Costume" requirement?`,
                    answer: `No. All Members joining the ⟪LIVE⟫ must have a Live Costume and it must be the {{red:"MIRAI TICKET"}} Live Costume.`,
                },
            ],
        },
        {
            subjects: ["EX10-006"],
            qa: [
                {
                    question: `What does "pick up to two differently named Members" mean?`,
                    answer: `From the three cards shown, pick up to two Members to add to your Hand that don't share the same name with each other. You can also pick up only one or no cards.`,
                },
            ],
        },
        {
            subjects: ["EX10-007"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
            qa: [
                {
                    question: `If there are Members without Live Costumes on Stage, can I meet the "all Members on your Stage have the {{red:"MIRAI TICKET"}} Live Costume" requirement?`,
                    answer: `No. All Members on Stage must have a Live Costume and it must be the {{red:"MIRAI TICKET"}} Live Costume.`,
                },
            ],
        },
    ],
    LL09: [
        {
            subjects: [{ from: "LL09-037", to: "LL09-045" }],
            qa: [
                {
                    question: `I'm the first player in turn order, and at the start of the match, I used {{link:LL07-064}}'s [Starter] Skill to ⟪ENTER⟫ a card. If I ⟪ENTER⟫ {{link:LL09-037}} on my first turn, can I draw two cards using the [Entry] Skill?`,
                    answer: `No. [Starter] Skills are counted as part of match preparation, before any turns are played, so once your first turn starts, there have been no Members who ⟪ENTER⟫ed that turn.`,
                },
            ],
        },
        {
            subjects: ["LL09-046"],
            seeAlso: ["/faq/general#stand_by"],
        },
        {
            subjects: ["LL09-047"],
            qa: [
                {
                    question: `When this Member joined the ⟪LIVE⟫, there were four face-down Song cards in the Set List. Does this Member still get +[COOL] from the [Live Join] Skill?`,
                    answer: `Yes. After the ⟪LIVE⟫, one face-down card will be turned face-up, but at the time [Live Join] Skills are resolved, there are four face-down cards, so the card gets +[COOL].`,
                },
            ],
        },
        {
            subjects: ["LL09-048"],
            seeAlso: ["/faq/general#collection"],
            qa: [
                {
                    key: "stars",
                    question: `Does "Member with one Star" include Members with two or more Stars?`,
                    answer: `No. The Member must have exactly one Star.`,
                },
                {
                    key: "entry",
                    question: `Can I use the [RUSH], [LIVE] or [Entry] Skill of the Member I ⟪ENTER⟫ from my Collection?`,
                    answer: `Yes. You can use it.`,
                },
            ],
        },
        {
            subjects: ["LL09-049"],
            qa: [
                {
                    question: `Does "Member with one Star" include Members with two or more Stars?`,
                    answer: `No. The Member must have exactly one Star.`,
                },
            ],
        },
        {
            subjects: ["LL09-050"],
            qa: [
                {
                    key: "samename",
                    question: `There is a face-up {{link:LL04-055}} and {{link:EX03-028}} in my Set List. If I ⟪ENTER⟫ a Member who has the {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} Live Costume using this card's Skill, what happens with the ⟪LIVE⟫ I could perform?`,
                    answer: `If there are multiple Song cards with the same name, you can pick any of them to use for the ⟪LIVE⟫.`,
                },
                {
                    key: "multiple",
                    question: `If there is a face-up Song card with multiple names in my Set List, for example {{link:LL01-067}}, can I ⟪ENTER⟫ a Member who has the {{red:"Sore wa Bokutachi no Kiseki"}} Live Costume? If so, can I perform a ⟪LIVE⟫ using that Song card?`,
                    answer: `Yes. If a face-up Song card has multiple names, the requirement is met if the Live Costume has the same name as either song name. In the given example, both ⟪ENTER⟫ing and performing the ⟪LIVE⟫ are possible.`,
                },
            ],
        },
        {
            subjects: ["LL09-051"],
            seeAlso: ["/faq/general#skill_impossible", "/faq/general#top_deck_card_faceup"],
            qa: [
                {
                    key: "types",
                    question: `How do I count types of Attributes?`,
                    answer: `There are four types of Attributes: [SMILE], [PURE], [COOL] and [ALL]. For example, {{link:LL09-064}} has [SMILE][ALL][ALL] in the upper left corner, so this Member has two types of Attributes. (You cannot use [ALL] as a wildcard for another Attribute.)`,
                },
                {
                    key: "livejoin",
                    question: `If the flipped Member card has a [Live Join] Skill that allows it to gain Pieces, can those Pieces be counted?`,
                    answer: `No. Pieces gained through [Live Join] Skills cannot be counted.`,
                },
                {
                    key: "bonus",
                    question: `Can I count Birthday Bonus Pieces?`,
                    answer: `If the requirement for the Birthday Bonus is met, the Pieces can be counted. For example, {{link:LL09-001}} has two types of Attribute if the Birthday Bonus is active, and one type of Attribute otherwise.`,
                },
                {
                    key: "order",
                    question: `How exactly should I resolve the Skill if the flipped Member card has three or more types of Attributes?`,
                    answer: `Do what the Skill says to do in the case of one types and the case of two types, in that order. So, add the Member card to your Hand, draw two cards, and after that you may ⟪ENTER⟫ one Member from your Hand.`,
                },
            ],
        },
        {
            subjects: ["LL09-052"],
            qa: [
                {
                    key: "self",
                    question: `I used a {{red:"take another turn"}} Skill. Is it possible to perform a ⟪LIVE⟫ using this Skill on my second turn?`,
                    answer: `No. Taking another turn means the previous turn was yours. That means that even if you performed a ⟪LIVE⟫ in the previous turn, it's not possible to meet the "another player" requirement.`,
                },
                {
                    key: "skip",
                    question: `If a {{red:"skip a turn"}} Skill was activated, what counts as the "previous turn"?`,
                    answer: `In that case, the "previous turn" is the turn taken by the player before the one who had to skip theirs.<br><ul><li>If the match is a one-on-one, that means the "previous turn" is your turn. (Meeting the requirement is impossible, as mentioned above.)</li><li>If you are playing with three or more players, that means the "previous turn" is the turn of the last player who wasn't skipped. (The requirement can be met.)</li></ul>`,
                },
                {
                    key: "won",
                    question: `In the previous turn, another player performed a ⟪LIVE⟫ and hit the Live Points Goal. Can I still perform a ⟪LIVE⟫ using this Skill?`,
                    answer: `Yes. The requirement is met even if the player who performed a ⟪LIVE⟫ in the previous turn won and went out.`,
                },
            ],
        },
        {
            subjects: ["LL09-053"],
            qa: [
                {
                    key: "donotuse",
                    question: `What exactly does "Do not use their [RUSH], [LIVE] or [Entry] Skill" mean?`,
                    answer: `Even if the Member card you ⟪ENTER⟫ed using this card's Skill has [RUSH], you cannot ⟪ENTER⟫ a card from your Hand. Similarly, even if the card has ⟪LIVE⟫ you cannot perform a ⟪LIVE⟫, and the card's [Entry] Skills have no effect.`,
                },
                {
                    key: "return",
                    question: `A Member card I ⟪ENTER⟫ed using this card's Skill returned to my Hand with another Skill. If that Member card is ⟪ENTER⟫ed again, can I use their [RUSH], [LIVE] or [Entry] Skill now?`,
                    answer: `Yes. Even if a Member card was ⟪ENTER⟫ed using this Skill before, they can use their Abilities or [Entry] Skills if the get ⟪ENTER⟫ed through other means later after returning to your Hand or Deck.`,
                },
                {
                    key: "sp",
                    question: `The Member card I ⟪ENTER⟫ed using this card's Skill has a [Special Practice] Skill. Since they are used when ⟪ENTER⟫ing, is that Skill also blocked by the "Do not use their [Entry] Skill" effect?`,
                    answer: `No. Only Skills with the [Entry] icon are blocked. [Special Practice] Skills have a different icon, so you can use it and perform [Special Practice] with that Member.`,
                },
                {
                    key: "instantsp",
                    question: `Using this card's Skill, I'm ⟪ENTER⟫ing {{link:LL15-035}} and a {{red:"Mari"}} with Stars. Can I immediately use {{red:"Mari"}}'s [Special Practice] by stacking onto the other {{red:"Mari"}}?`,
                    answer: `No. [Special Practice] Skills don't allow placing the Member card on a card that is ⟪ENTER⟫ing at the same time. You can only stack onto Members who are already on Stand-By on your Stage at the time the card ⟪ENTER⟫s.`,
                },
            ],
        },
        {
            subjects: ["LL09-054"],
            qa: [
                {
                    question: `If the next player does not have five or more cards in their Hand, can I still pick the "If the next player in turn order has five or more cards in their Hand, draw four cards" option?`,
                    answer: `Yes. You can choose it, and the Skill will resolve without any effect.<br>Similarly, even if you have no Members without Stars on your Hand, you can still pick the "⟪ENTER⟫ one Member without Stars from your Hand" option.`,
                },
            ],
        },
        {
            subjects: ["LL09-056"],
            qa: [
                {
                    question: `If all the Members with Live Costumes have the same Live Costume, will the Skill's requirement be met even if Members without Live Costumes participate?`,
                    answer: `No. All Members joining the ⟪LIVE⟫ must have a Live Costume and they must have the same Live Costume.`,
                },
            ],
        },
        {
            subjects: ["LL09-057"],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["LL09-058"],
            qa: [
                {
                    key: "ongoing",
                    question: `I already performed a ⟪LIVE⟫ with {{red:"Kimi no Hitomi o Meguru Bouken"}}, and am now performing another ⟪LIVE⟫ a Song card without a Skill. Will this increase the Live Points gained through this Skill by one?`,
                    answer: `Yes. As long as the requirement is met, you can earn additional Live Points even after the ⟪LIVE⟫ with {{red:"Kimi no Hitomi o Meguru Bouken"}} was successfully performed.`,
                },
                {
                    key: "lose_first",
                    question: `I'm playing a match with the Live Points Goal at 9. I performed ⟪LIVE⟫s with this card and {{link:EX03-031}}, which does not have any Skills, so my Live Points are currently at 6. I'm now performing a ⟪LIVE⟫ with {{link:LL08-055}}. Will I win the match?`,
                    answer: `No. The moment you successfully perform a ⟪LIVE⟫ with {{link:LL08-055}}, the requirement for the Skill of {{red:"Kimi no Hitomi o Meguru Bouken"}} is no longer met. That means your Live Points are at 8 after performing the ⟪LIVE⟫, and you have not won yet.`,
                },
            ],
        },
        {
            subjects: ["LL09-061"],
            qa: [
                {
                    key: "gained",
                    question: `A Member card who did not originally have [ALL] joined this ⟪LIVE⟫, but gained [ALL] from a [Live Join] Skill. Can I still take another turn?`,
                    answer: `No. Even if the [ALL] was gained from a Skill or another Piece turning into [ALL], it will block the Skill.`,
                },
                {
                    key: "not_optional",
                    question: `I want to activate this card's Skill, can I choose to not activate a Member's [Live Join] Skill if a card would gain [ALL] from it?`,
                    answer: `No. If the requirements for a Skill are met, it will be activated and [ALL] will be gained. (You can only choose to skip and effect if the Skill says "you may".)`,
                },
            ],
        },
        {
            subjects: ["LL09-063"],
            qa: [
                {
                    question: `What does "for each different Live Costume the "Aqours" Members joining this ⟪LIVE⟫ have" mean?`,
                    answer: `The types of Live Costumes in the lower left of your {{red:"Aqours"}} Member cards are counted.<br>For example, if you have Member cards with the Live Costumes {{red:"Aozora Jumping Heart"}}, {{red:"Aozora Jumping Heart"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} and {{red:"Koi ni Naritai AQUARIUM"}}, you have three different Live Costumes, so the Any Piece requirement will be reduced by 3.`,
                },
            ],
        },
    ],
    EX05: [
        {
            subjects: ["EX05-028"],
            qa: [
                {
                    key: "explain",
                    question: `What exactly does this Skill do?`,
                    answer: `If the Song card involves counting Members who have the {{red:"Mogyutto “love” de Sekkin chuu!"}} Live Costume, you can count every card participating in the ⟪LIVE⟫, including this card. For example, if this card joins a ⟪LIVE⟫ with {{link:LL01-065}}, every Member will count for the Song card's Skill, and you can reduce the Any Piece requirement accordingly.`,
                },
                {
                    key: "original",
                    question: `If Members who already have Live Costumes join the same ⟪LIVE⟫, what happens to their original Live Costumes?`,
                    answer: `Treat their Live Costumes as {{red:"Mogyutto “love” de Sekkin chuu!"}}. Their original Live Costume does not count for any Skills anymore.`,
                },
                {
                    key: "after",
                    question: `After I successfully perform the ⟪LIVE⟫, will the Members who joined still be treated as having the {{red:"Mogyutto “love” de Sekkin chuu!"}} Live Costume?`,
                    answer: `Yes. For the rest of the match, treat all the Members as having the {{red:"Mogyutto “love” de Sekkin chuu!"}} instead of having no/another Live Costume.`,
                },
            ],
        },
        {
            subjects: ["EX05-029"],
            qa: [
                {
                    question: `If two or more of this card join a ⟪LIVE⟫ with {{link:LL02-068}}, does the Skill become "If you used five or more Song cards for Lives, gain ♪Live Points +4♪" instead?`,
                    answer: `No. This card's Skill does not increase the Live Points gained from the Song card's Skill, but replaces the Skill. Hence, even if two or more of this card join the ⟪LIVE⟫, the resulting Skill does not change.`,
                },
            ],
        },
        {
            subjects: ["EX05-030"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["EX05-031", "EX05-032", "EX05-034"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    question: `When this card joins a ⟪LIVE⟫ with a Song card other than the one listed in the [Live Join] Skill, does the [Live Success] Skill still activate?`,
                    answer: `Yes. The [Live Join] and [Live Success] Skills are not related to each other, so you can draw a card using the [Live Success] Skill even if joining a ⟪LIVE⟫ with a different Song card.`,
                },
            ],
        },
        {
            subjects: ["EX05-035"],
            qa: [
                {
                    question: `If two or more of this card join a ⟪LIVE⟫ with {{link:LL02-066}}, can I draw three cards for each?`,
                    answer: `Yes. For example, if two {{red:"Hanayo"}}s are joining the ⟪LIVE⟫, you can draw eight cards in total (including the Skill of the Song card).`,
                },
            ],
        },
        {
            subjects: ["EX05-036"],
            qa: [
                {
                    key: "each",
                    question: `If two or more of this card join a ⟪LIVE⟫ with {{link:LL01-064}}, do I gain ♪Live Points +1♪ for each?`,
                    answer: `Yes. For each {{red:"Nico"}}, you will gain ♪Live Points +1♪.`,
                },
                {
                    key: "zero",
                    question: `If the Song card used for the ⟪LIVE⟫ would give me zero Live Points by itself (less than three Members who have the {{red:"Natsuiro Egao de 1,2,Jump!"}} Live Costume), do I still gain ♪Live Points +1♪ if this card joined the ⟪LIVE⟫?`,
                    answer: `Yes. Regardless of the Bonus Live Points of {{link:LL01-064}}, you will gain ♪Live Points +1♪.`,
                },
            ],
        },
        {
            subjects: ["EX05-037"],
            qa: [
                {
                    key: "explain",
                    question: `What does "For each differently named {{red:"µ's"}} Member in them, pick one of their cards to add to your Hand" mean?`,
                    answer: `From the three cards shown, pick Members to add to your Hand that don't share the same name. If there are multiple cards with the same name, you can only pick one of them.`,
                },
                {
                    key: "same",
                    question: `If all of the flipped cards are the same {{red:"µ's"}} Member, can I still add a card to my Hand?`,
                    answer: `Yes. For example, even if all three flipped cards are {{red:"Honoka"}} cards, you can still pick one of them to add to your Hand.`,
                },
            ],
        },
        {
            subjects: ["EX05-038"],
            qa: [
                {
                    key: "livejoin",
                    question: `If one of the flipped Member cards has a [Live Join] Skill that allows it to gain Pieces, can those Pieces be counted?`,
                    answer: `No. Pieces gained through [Live Join] Skills cannot be counted.`,
                },
                {
                    key: "bonus",
                    question: `If I ⟪ENTER⟫ed {{link:LL04-067}} with the Birthday Bonus active using this card's Skill, can I take another turn?`,
                    answer: `Yes. If the requirement for the Birthday Bonus is met, the Pieces can be counted, so in this example, you are allowed to take another turn.`,
                },
            ],
        },
        {
            subjects: ["EX05-039"],
            qa: [
                {
                    key: "original",
                    question: `If Members who already have Live Costumes join the same ⟪LIVE⟫, what happens to their original Live Costumes?`,
                    answer: `Treat their Live Costumes as the one matching the Song card used for the ⟪LIVE⟫. Their original Live Costume does not count for any Skills anymore.`,
                },
                {
                    key: "multiple",
                    question: `If this Member joins a ⟪LIVE⟫ with a Song card with multiple names, for example {{link:LL02-069}}, what happens to the Live Costumes of the joining Members?`,
                    answer: `You can choose one of the names on the Song card, and every Member joining the ⟪LIVE⟫ will have that Live Costume. Pick which song name you'd like to use when resolving the Skill.`,
                },
                {
                    key: "nonsong",
                    question: `If this Member joins a ⟪LIVE⟫ with a Song card like {{link:LL01-075}} or {{link:PR-012}}, will my cards have a Live Costume with that name?`,
                    answer: `Yes. These two Song cards are not actually songs, but the Members joining these ⟪LIVE⟫s will still be treated as having a Live Costume with the same name as the Song card used. (They will not keep their original Live Costume.)`,
                },
                {
                    key: "after",
                    question: `After I successfully perform the ⟪LIVE⟫, will the Members who joined still be treated as having a Live Costume with the same name as the Song card?`,
                    answer: `Yes. For the rest of the match, treat all the Members as having the Live Costume with the same name as the Song card instead of having no/another Live Costume.`,
                },
            ],
        },
        {
            subjects: ["EX05-040"],
            seeAlso: ["/faq/general#no_shuffle_facedown_song"],
        },
        {
            subjects: ["EX05-041"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "all",
                    question: `I have three Members with [RUSH] on my Stage who can join a ⟪LIVE⟫ with this card's [Entry] Skill. If they have enough Pieces between them, am I allowed to only use two of them to perform the ⟪LIVE⟫?`,
                    answer: `No. All Members with [RUSH] must join the ⟪LIVE⟫.`,
                },
                {
                    key: "blocked",
                    question: `There are two Members with [RUSH] on my Stage, with one of them being {{link:LL05-047}} who was ⟪ENTER⟫ed last turn (which means she cannot join ⟪LIVE⟫s this turn). If I use this card's [Entry] Skill now, can I perform a ⟪LIVE⟫ with just this card and the [RUSH] card that is not {{red:"Riko"}}?`,
                    answer: `No. All Members with [RUSH] must join the ⟪LIVE⟫. In this example, it is impossible to perform a ⟪LIVE⟫.`,
                },
            ],
        },
        {
            subjects: ["EX05-042"],
            seeAlso: ["/faq/general#muse_and_aqours_song_cards"],
            qa: [
                {
                    key: "all",
                    question: `I have three Members with [RUSH] on my Stage who can join a ⟪LIVE⟫ with this card's [Entry] Skill. If they have enough Pieces between them, am I allowed to only use two of them to perform the ⟪LIVE⟫?`,
                    answer: `No. All Members with [RUSH] must join the ⟪LIVE⟫.`,
                },
                {
                    key: "blocked",
                    question: `There are two Members with [RUSH] on my Stage, with one of them being {{link:LL05-047}} who was ⟪ENTER⟫ed last turn (which means she cannot join ⟪LIVE⟫s this turn). If I use this card's [Entry] Skill now, can I perform a ⟪LIVE⟫ with just this card and the [RUSH] card that is not {{red:"Riko"}}?`,
                    answer: `No. All Members with [RUSH] must join the ⟪LIVE⟫. In this example, it is impossible to perform a ⟪LIVE⟫.`,
                },
            ],
        },
        {
            subjects: ["EX05-043"],
            qa: [
                {
                    question: `Is it allowed to only reveal some of the cards in my Hand when using this Skill?`,
                    answer: `No. You must either show your entire Hand or not show it at all.`,
                },
            ],
        },
        {
            subjects: ["EX05-045"],
            seeAlso: ["/faq/general#skill_order_same_skill"],
            qa: [
                {
                    key: "neutral",
                    question: `If there's a face-up Song card with the Neutral Attribute, does that mean I can use all the effects for all three Attributes?`,
                    answer: `No. Unlike [ALL], Neutral is not a wildcard. It is it's own unique Attribute.`,
                },
                {
                    key: "may",
                    question: `Even if I have face-up Song cards with the Smile, Pure and Cool Attributes, can I choose to not ⟪ENTER⟫ a card or perform a ⟪LIVE⟫?`,
                    answer: `Yes. These effects say "you may", so you can choose to not use these effects.`,
                },
            ],
        },
    ],
    EX11: [
        {
            subjects: ["EX11-001"],
            seeAlso: ["/faq/general#flip_before_skills"],
        },
        {
            subjects: ["EX11-002"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    key: "base",
                    question: `What are "Base Live Points"?`,
                    answer: "It refers to the large number in the top right of the Song card. If there are Bonus Live Points on a card, like {{link:LL03-075}}, it only refers to the number on the left. (That means that {{link:LL03-075}} does not meet the requirement.)",
                },
                {
                    key: "none",
                    question: `When I ⟪ENTER⟫ed this card, there weren't any Song cards in my Set List with 4 or more Base Live Points. Can I still draw the additional card?`,
                    answer: `Yes. In that case, you can still draw a card.`,
                },
            ],
        },
        {
            subjects: ["EX11-003"],
            seeAlso: ["/faq/general#flip_before_skills", "/faq/general#muse_and_aqours_song_cards"],
            qa: [
                {
                    key: "twice",
                    question: `If I used this card's Skill when I ⟪ENTER⟫ed it, can I also use it after performing a ⟪LIVE⟫ with this card?`,
                    answer: "Yes. You can use it both times, after ⟪ENTER⟫ing and after performing a ⟪LIVE⟫.",
                },
                {
                    key: "multiple",
                    question: `If there is a face-up Song card with multiple names in my Set List, for example {{link:LL01-067}}, can I ⟪ENTER⟫ a Member who has the {{red:"Sore wa Bokutachi no Kiseki"}} Live Costume?`,
                    answer: `Yes. If a face-up Song card has multiple names, the requirement is met if the Live Costume has the same name as either song name.`,
                },
                {
                    key: "same",
                    question: `After performing a ⟪LIVE⟫, can I ⟪ENTER⟫ a Member who has a Live Costume with the same name as the Song card used for that ⟪LIVE⟫?`,
                    answer: `No. When a ⟪LIVE⟫ is performed, the Song card is placed on the Stage and is not part of the Set List anymore, but the Skill requires the Song card to be in your Set List.<br>(If you have a second Song card with the same name as the one used for the ⟪LIVE⟫, and it's face-up in your Set List, you can still ⟪ENTER⟫ a Member who has a Live Costume with that name.)`,
                },
            ],
        },
        {
            subjects: ["EX11-004"],
            qa: [
                {
                    key: "other",
                    question: `If I used {{link:LL01-058}}'s Skill to ⟪ENTER⟫ this card after it was revealed to everyone, can I use this card's [Entry] Skill?`,
                    answer: "Yes. The requirement is met. Even if the card is revealed, it is still in your Hand.",
                },
                {
                    key: "rush",
                    question: `Does [RUSH] count as an [Entry] Skill?`,
                    answer: `No. It is not a Skill. Only lines with the [Entry] icon are [Entry] Skills.`,
                },
            ],
        },
        {
            subjects: ["EX11-005"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What does "If there are exactly three differently named Members on your Stage" mean?`,
                    answer: `Count how many different names the Member cards on your Stage have.<br>For example, if you have Member cards named {{red:"Rin Hoshizora"}}, {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}} on your Stage, you have three differently named Members on your Stage - {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}}. Since that's three different names, the Skill's requirement is met.`,
                },
            ],
        },
        {
            subjects: ["EX11-006"],
            seeAlso: ["/faq/general#more_faceup_songs"],
        },
        {
            subjects: ["EX11-007"],
            qa: [
                {
                    question: `Is this Skill's requirement met if this card joins a ⟪LIVE⟫ with a Song card with {{red:"µ's"}} in its name, such as {{link:LL01-075}}?`,
                    answer: `No. {{red:"µ's"}} must be included in the card's Skill text (the text at the bottom of the card), so the requirement is not met.`,
                },
            ],
        },
        {
            subjects: ["EX11-008"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What does "If there are exactly three differently named Members joining this ⟪LIVE⟫" mean?`,
                    answer: `Count how many different names the Member cards joining this ⟪LIVE⟫ have.<br>For example, if you have Member cards joining this ⟪LIVE⟫ named {{red:"Rin Hoshizora"}}, {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}}, you have three differently named Members joining this ⟪LIVE⟫ - {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}}. Since that's three different names, the Skill's requirement is met.`,
                },
            ],
        },
        {
            subjects: ["EX11-009"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What does "If there are exactly three differently named Members on your Stage" mean?`,
                    answer: `Count how many different names the Member cards on your Stage have.<br>For example, if you have Member cards named {{red:"Rin Hoshizora"}}, {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}} on your Stage, you have three differently named Members on your Stage - {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}}. Since that's three different names, the Skill's requirement is met.`,
                },
            ],
        },
        {
            subjects: [{ from: "EX11-010", to: "EX11-018" }],
            qa: [
                {
                    question: `I'm the first player in turn order, and at the start of the match, I used {{link:LL07-064}}'s [Starter] Skill to ⟪ENTER⟫ a card. If I ⟪ENTER⟫ {{link:EX11-010}} on my first turn, can I draw two cards using the [Entry] Skill?`,
                    answer: `No. [Starter] Skills are counted as part of match preparation, before any turns are played, so once your first turn starts, there have been no Members who ⟪ENTER⟫ed that turn.`,
                },
            ],
        },
        {
            subjects: [{ from: "EX11-019", to: "EX11-027" }],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["EX11-028"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    key: "livejoin",
                    question: `If the flipped Member card has a [Live Join] Skill that allows it to gain [SMILE], can that Piece be counted?`,
                    answer: `No. Pieces gained through [Live Join] Skills cannot be counted. If the card has a normal [SMILE] shown in the top left, the card will be ⟪ENTER⟫ed, otherwise, it will be added to your Hand.`,
                },
                {
                    key: "bonus",
                    question: `If the flipped Member card has an active Birthday Bonus and it's [SMILE], can that Piece be counted?`,
                    answer: `Yes. If the requirement for the Birthday Bonus is met, the Pieces can be counted and if the Bonus Piece is [SMILE], the card will be ⟪ENTER⟫ed.`,
                },
            ],
        },
        {
            subjects: ["EX11-029"],
            qa: [
                {
                    question: `This Member has [COOL][COOL], and I have used three Song cards for Lives. What Pieces will the Member have in this case?`,
                    answer: `The Member will have [ALL][ALL]. (Even if you have more Song cards than [COOL], you can't treat [COOL] Pieces that don't exist as [ALL].)`,
                },
            ],
        },
        {
            subjects: ["EX11-030"],
            qa: [
                {
                    question: `A player used this Member's Skill. If they have no cards in their Hand, can I still grant the "⟪ENTER⟫ one Member from your Hand" request?`,
                    answer: `Yes. No matter how many cards the player has on their Hand, you can choose either request. (For the same reason, you can also grant the "draw three cards" request if they have less than three cards in their Deck.)`,
                },
            ],
        },
        {
            subjects: ["EX11-031"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    key: "attribute",
                    question: `How are Song cards with Attribute requirements counted for "highest requirement"?`,
                    answer: `Sum up the number of all Pieces required to perform a ⟪LIVE⟫. For example, {{link:EX11-047}} (4x [SMILE], 3x [PURE], 3x [COOL]) will be counted as <span class="whitespace-nowrap">4 + 3 + 3 = 10</span>.`,
                },
                {
                    key: "tied",
                    question: `If there are multiple cards with the same highest amount of Pieces needed, does performing a ⟪LIVE⟫ with any of them meet this Skill's requirement?`,
                    answer: `Yes. If no other Song card has a higher amount of Pieces needed to perform a ⟪LIVE⟫, the Skill's requirement is met.`,
                },
            ],
        },
        {
            subjects: ["EX11-032"],
            seeAlso: ["/faq/general#stand_by"],
            qa: [
                {
                    question: `If I return a Member with Stars to my Hand, can I ⟪ENTER⟫ a Member without Stars?`,
                    answer: `Yes. Members with Stars and Members without Stars count as having a different amount of Stars. Similarly, you can ⟪ENTER⟫ a Member with Stars after returning a Member without Stars to your Hand.`,
                },
            ],
        },
        {
            subjects: ["EX11-033"],
            qa: [
                {
                    question: `If the face-up Song cards in my Set List have four different Attributes, do I draw two cards?`,
                    answer: `Yes. If there are four Attributes, you both draw two cards and take another turn.`,
                },
            ],
        },
        {
            subjects: ["EX11-035"],
            seeAlso: ["/faq/general#stand_by"],
        },
        {
            subjects: ["EX11-036"],
            seeAlso: ["/faq/general#skill_impossible"],
        },
        {
            subjects: ["EX11-037"],
            seeAlso: ["/faq/general#more_faceup_songs"],
        },
        {
            subjects: ["EX11-038"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than {{red:"Honoka"}} and {{red:"Rin"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Honoka"}} card and a {{red:"Rin"}} card joining, the Skill's requirement is met, regardless of what other Members join.`,
                },
                {
                    key: "skip",
                    question: `If the Skill's requirement is met and I perform a ⟪LIVE⟫, can I choose not to ⟪SCOUT⟫?`,
                    answer: `No. If the requirement of the Skill is met, you must always ⟪SCOUT⟫.`,
                },
            ],
        },
        {
            subjects: ["EX11-039"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than {{red:"Nozomi"}} and {{red:"Nico"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Nozomi"}} card and a {{red:"Nico"}} card joining, the Skill's requirement is met, regardless of what other Members join.`,
                },
                {
                    key: "skip",
                    question: `If the Skill's requirement is met and I perform a ⟪LIVE⟫, can I choose not to add the bottom card of my Deck to my Hand?`,
                    answer: `No. If the requirement of the Skill is met, you must always add the bottom card of your Deck to your Hand.`,
                },
            ],
        },
        {
            subjects: ["EX11-040"],
            qa: [
                {
                    question: `What if Members other than {{red:"Kotori"}} and {{red:"Hanayo"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Kotori"}} card and a {{red:"Hanayo"}} card joining, the Skill's requirement is met, regardless of what other Members join.`,
                },
            ],
        },
        {
            subjects: ["EX11-041"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than {{red:"Eli"}}, {{red:"Umi"}} and {{red:"Maki"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Eli"}} card, a {{red:"Umi"}} card and a {{red:"Maki"}} card joining, the Skill's requirement is met, regardless of what other Members join.`,
                },
                {
                    key: "flipping",
                    question: `What exactly does the [While Live] Skill of this card do?`,
                    answer: `After this ⟪LIVE⟫ is performed, for every Song card in your Set List that is flipped face-up because of performing a ⟪LIVE⟫ or as the result of a Skill, flip an additional Song card face-up.<br>(This includes the Song card you flip face-up after performing the ⟪LIVE⟫ with this card.)`,
                },
                {
                    key: "multiple",
                    question: `What happens if I use a Skill that allows me to flip multiple Song cards face-up at once, such as the [Live Success] Skill of {{link:LL03-066}}, while {{red:"soldier game"}} is live its the Skill's requirement is met?`,
                    answer: `If you flip multiple Song cards face-up at the same time, you still flip one additional Song card face-up for each flipped card. (For example, if you flip three Song cards face-up at once, you flip three more Song cards face-up.)`,
                },
            ],
        },
        {
            subjects: ["EX11-042"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than {{red:"Nico"}}, {{red:"Rin"}} and {{red:"Hanayo"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Nico"}} card, a {{red:"Rin"}} card and a {{red:"Hanayo"}} card joining, the Skill's requirement is met, regardless of what other Members join.`,
                },
                {
                    key: "all",
                    question: `If the {{red:"Nico"}} cards, {{red:"Rin"}} cards and {{red:"Hanayo"}} cards joining this ⟪LIVE⟫ don't have Live Costumes, is the Skill's requirement met even if there are other Members with Live Costumes joining this ⟪LIVE⟫?`,
                    answer: `No. No Members joining the ⟪LIVE⟫ may have Live Costumes. If any Member joining has a Live Costume, the Skill's requirement is not met.`,
                },
            ],
        },
        {
            subjects: ["EX11-043"],
            qa: [
                {
                    key: "later",
                    question: `After performing a ⟪LIVE⟫ with {{red:"Binetsu kara Mystery"}} with the Skill's requirement met, I performed another ⟪LIVE⟫ with all three Members of {{red:"lily white"}}. Do I gain another Live Point?`,
                    answer: `Yes. If the Skill's requirement is met, you will gain Live Points even from ⟪LIVE⟫s performed after {{red:"Binetsu kara Mystery"}} was.`,
                },
                {
                    key: "others",
                    question: `What if Members other than those of {{red:"lily white"}} join the ⟪LIVE⟫? And if another Member joins a ⟪LIVE⟫ along with {{red:"Umi"}}, {{red:"Rin"}} and {{red:"Nozomi"}} cards, will I gain Live Points?`,
                    answer: `As long as there is a {{red:"Umi"}} card, a {{red:"Rin"}} card and a {{red:"Nozomi"}} card joining, the Skill's requirement is met, regardless of what other Members join. Similarly, as longs as there is at least a {{red:"Umi"}} card, a {{red:"Rin"}} card and a {{red:"Nozomi"}} card joining a ⟪LIVE⟫ with another Song card, you will gain a Live Point.`,
                },
            ],
        },
        {
            subjects: ["EX11-044"],
            seeAlso: ["/faq/general#collection", "/faq/general#flip_before_skills"],
            qa: [
                {
                    question: `What if Members other than those of {{red:"BiBi"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Eli"}} card, a {{red:"Maki"}} card and a {{red:"Nico"}} card joining, the Skill's requirement is met, regardless of what other Members join.`,
                },
            ],
        },
        {
            subjects: ["EX11-045"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than those of {{red:"Printemps"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Hanayo"}} card, a {{red:"Kotori"}} card and a {{red:"Hanayo"}} card joining, the Skill's requirement is met, regardless of what other Members join.`,
                },
                {
                    key: "skills",
                    question: `While this Song card is live and its Skill's requirement is met, {{link:LL08-050}} joined a ⟪LIVE⟫ with a Member of {{red:"Printemps"}} who did not originally have [PURE]. In this situation, can the {{red:"Printemps"}} Member gain +[PURE] through the Skill of the {{red:"You"}} card?`,
                    answer: `Yes. The Member will gain +[PURE] from this card's Skill before the [Live Join] Skill is resolved. Thus, you can gain +[PURE] again by using the Skill of the {{red:"You"}} card.`,
                },
            ],
        },
        {
            subjects: ["EX11-046"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `I used a "Take another turn" Skill. If I perform a ⟪LIVE⟫ with this Song card on my second turn, will {{red:"µ's"}} Members I ⟪ENTER⟫ed on my first turn count for the "have been on your Stage before this turn" requirement?`,
                    answer: `Yes. Since you have taken another turn, any Members who ⟪ENTER⟫ed before the extra turn meet this Skill's requirement.`,
                },
            ],
        },
        {
            subjects: ["EX11-047"],
            qa: [
                {
                    question: `Do [ALL] gained through [Live Join] Skills count for this card's [Live Success] Skill?`,
                    answer: `Yes. [ALL] gained through Skills or by treating other Pieces as [ALL] count.`,
                },
            ],
        },
        {
            subjects: ["EX11-048"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["EX11-049"],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["EX11-050"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `The Members joining this ⟪LIVE⟫ have 3x [SMILE] and 1x [ALL] in total. Will the Any Piece requirement be reduced?`,
                    answer: `No. The Skill of this Song card requires one Attribute, [SMILE] [PURE] [COOL] or [ALL], to have four or more Pieces. You cannot use [ALL] as a wildcard for another Attribute.`,
                },
            ],
        },
        {
            subjects: ["EX11-051"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: [{ from: "EX11-052", to: "EX11-069" }],
            seeAlso: ["/faq/general#skill_impossible"],
            qa: [
                {
                    question: `I'm using this Member's Skill while having no cards in my Hand. Can I still draw four cards?`,
                    answer: `Yes. You can draw four cards even if you have no cards in your Hand.`,
                },
            ],
        },
    ],
    EX12: [
        {
            subjects: ["EX12-019"],
            seeAlso: ["/faq/LL05#LL05-046"],
        },
        {
            subjects: ["EX12-020"],
            seeAlso: ["/faq/LL05#LL05-047"],
        },
        {
            subjects: ["EX12-021"],
            seeAlso: ["/faq/LL05#LL05-048"],
        },
        {
            subjects: ["EX12-022"],
            seeAlso: ["/faq/LL05#LL05-049"],
        },
        {
            subjects: ["EX12-023"],
            seeAlso: ["/faq/LL05#LL05-050"],
        },
        {
            subjects: ["EX12-024"],
            seeAlso: ["/faq/LL05#LL05-051"],
        },
        {
            subjects: ["EX12-025"],
            seeAlso: ["/faq/LL05#LL05-052"],
        },
        {
            subjects: ["EX12-026"],
            seeAlso: ["/faq/LL05#LL05-053"],
        },
        {
            subjects: ["EX12-027"],
            seeAlso: ["/faq/LL05#LL05-054"],
        },
        {
            subjects: ["EX12-028"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    key: `emptyscout`,
                    question: `I ⟪SCOUT⟫ed in my previous turn, but already had four or more cards on my Hand, so I didn't draw any cards. Will the "if you ⟪SCOUT⟫ed in your previous turn" requirement still be met?`,
                    answer: `Yes. Whether you draw cards or not, the Skill's requirement is met if you ⟪SCOUT⟫ed in the previous turn.`,
                },
                {
                    key: `idolization`,
                    question: `Using the [Entry] Skill, I ⟪ENTER⟫ed a {{red:"Chika"}} without Stars, and because I ⟪SCOUT⟫ed in the previous turn, I'm also ⟪ENTER⟫ing {{link:LL15-048}}. Can I flip the {{red:"Chika"}} without Stars face-down and place the second card on top of it?`,
                    answer: `Yes. By the time {{link:LL15-048}} is ⟪ENTER⟫ed, the {{red:"Chika"}} without Stars is already on Stand-By, so you can flip it face-down and place the card on top of it.`,
                },
            ],
        },
        {
            subjects: ["EX12-029"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `My opponent had to pass due to a "skip a turn" Skill, so it's my turn again. If I ⟪ENTER⟫ this Member in this turn, is the "if the previous turn was yours" requirement met?`,
                    answer: `Yes. If the opponent skipping a turn causes you to take two turns in a row, you can have the previous turn be yours, and the Skill's requirement can be met.`,
                },
            ],
        },
        {
            subjects: ["EX12-030"],
            seeAlso: [
                "/faq/general#members_on_stage",
                "/faq/general#member_counting",
                "/faq/general#skill_order_multiple_skills",
            ],
        },
        {
            subjects: ["EX12-031"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
        },
        {
            subjects: ["EX12-032"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    question: `My opponent had to pass due to a "skip a turn" Skill, so it's my turn again. If I ⟪ENTER⟫ this Member in this turn, is the "if the previous turn was yours" requirement met?`,
                    answer: `Count how many different Live Costumes the {{red:"You"}} cards on your Stage have (in the lower left).<br>For example, if you have {{red:"You"}} cards with the Live Costumes {{red:\"Aozora Jumping Heart\"}}, {{red:\"Aozora Jumping Heart\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}} and {{red:\"Koi ni Naritai AQUARIUM\"}}, you have three different Live Costumes, and you draw cards until you have three cards in your Hand. (If you already have three or more cards in your Hand, you don't draw any cards.)`,
                },
            ],
        },
        {
            subjects: ["EX12-033"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#skill_order_same_skill"],
            qa: [
                {
                    key: `explain`,
                    question: `What exactly does the Skill of this card do?`,
                    answer: `If all Members on your Stage are {{red:"Yoshiko"}} cards, resolve the three following effects. If you meet the requirement for all of them, you can get all three effects.`,
                },
                {
                    key: `others`,
                    question: `I was not allowed to draw cards because I did not have six or more Members on my Stage, but I still have six or more cards in my Hand. Am I allowed to ⟪ENTER⟫ a Member without Stars?`,
                    answer: `Yes. You can ⟪ENTER⟫ a Member without Stars from your Hand. When resolving an effect, it does not matter whether the requirements of the other two effects are met.<br>Similarly, even if you are unable to draw cards because your Deck is empty, or if you choose not to ⟪ENTER⟫ a Member, the requirements of the other effects are unaffected.`,
                },
                {
                    key: `combo`,
                    question: `I used this card's Skill when I had six Members on my Stage and four cards in my Hand. I draw two cards from the first effect and now have six cards in my Hand - can I ⟪ENTER⟫ a Member without Stars now?`,
                    answer: `Yes. You can ⟪ENTER⟫ a Member without Stars from your Hand. The requirements for the effects are checked in order when you resolve that effect, not all at once when the Skill starts to be resolved.`,
                },
            ],
        },
        {
            subjects: ["EX12-034"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#members_on_stage"],
        },
        {
            subjects: ["EX12-035"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#collection"],
            qa: [
                {
                    key: `skill`,
                    question: `Can I pick a Member like {{link:LL06-053}}, who has only [ALL] in the upper left, but might gain Pieces other than [ALL] from a [Live Join] Skill, from my Collection?`,
                    answer: `Yes. Pieces that can be gained from [Live Join] Skills are not considered for this Skill.`,
                },
                {
                    key: `bonus`,
                    question: `Can I pick a {{red:"Mari"}} card that has only [ALL] in the upper left, but has a Pieces that is not [ALL] as its Birthday Bonus, from my Collection?`,
                    answer: `If the Birthday Bonus is active, you must consider the Piece for this Skill. If a {{red:"Mari"}} card has a Birthday Bonus Piece that is not [ALL] and its Birthday Bonus is active, you cannot pick it from your Collection.`,
                },
            ],
        },
        {
            subjects: ["EX12-036"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    key: `one`,
                    question: `When I ⟪ENTER⟫ed this Member, I only had one card on my Hand. Can I return that one card to my Deck and then ⟪ENTER⟫ the top card of my Deck?`,
                    answer: `No. You must return two cards to your Deck, one to the top and one to the bottom, or you cannot ⟪ENTER⟫ the top card of your Deck.`,
                },
                {
                    key: `empty`,
                    question: `If my Deck is empty when this Member is ⟪ENTER⟫ed, can I still ⟪ENTER⟫ a card from the Deck?`,
                    answer: `Yes. As usual, the card you have placed on the top of the Deck will be ⟪ENTER⟫ed.`,
                },
            ],
        },
    ],
    LL10: [
        {
            subjects: ["LL10-046"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#more_faceup_songs"],
            qa: [
                {
                    question: `If I have no face-down cards in my Set List, can I still choose the "flip one face-down Song card in your Set List face-up" effect?`,
                    answer: `Yes. In that case, the Skill would be resolved without anything happening.<br>Similarly, you can choose to draw two cards even if you have no cards or only one card in your Deck, or choose to ⟪ENTER⟫ a Member without Stars and with a Live Costume from your Hand, even if you have no matching Member on your Hand.`,
                },
            ],
        },
        {
            subjects: ["LL10-047"],
            seeAlso: [
                "/faq/general#members_on_stage",
                "/faq/general#collection",
                "/faq/general#muse_and_aqours_song_cards",
                "/faq/general#more_faceup_songs",
            ],
            qa: [
                {
                    question: `Can I pick a Song card with the same name as a Song card in my Set List or a Song card used for a ⟪LIVE⟫ from my Collection?`,
                    answer: `Yes. You can pick Song cards with the same name, no matter whether their ID matches with one of the Song cards in play or not.`,
                },
            ],
        },
        {
            subjects: ["LL10-048"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    key: `cards`,
                    question: `Which cards have Skills that require "counting {{red:"Members currently in your Lives"}}"?`,
                    answer: `You can use <a href="/search/skill:Members%20currently%20in%20your%20Lives">the search function on this site</a> to find all cards affected by this Skill.`,
                },
                {
                    key: `samelive`,
                    question: `I'm performing a ⟪LIVE⟫ with this card and {{link:LL08-048}}. When counting {{red:"Members currently in your Lives"}} while resolving {{link:LL08-048}}'s [Live Success] Skill, does this card's Skill double the amount?`,
                    answer: `Yes. The [While Live] Skill is already active when resolving the [Live Success] Skill, so the amount is doubled.`,
                },
                {
                    key: `stack`,
                    question: `If there are two or more of this card in Lives, do you double the counted amounts of {{red:"Members currently in your Lives"}} for each card?`,
                    answer: `Yes. If there are two {{link:LL10-048}} currently in Lives, the amount will be quadrupled, and if there are three {{link:LL10-048}} currently in Lives, it will be multiplied by eight.`,
                },
            ],
        },
        {
            subjects: ["LL10-049"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `Does this card's Skill count the card itself as a "3rd Year" card with Stars?`,
                    answer: `Yes. If three or more "3rd Year" cards with Stars, including {{link:LL10-049}} itself, join this ⟪LIVE⟫, it will gain +[ALL].`,
                },
            ],
        },
        {
            subjects: ["LL10-050"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What exactly does the [Entry] Skill do?`,
                    answer: `You may ⟪ENTER⟫ a Member with a Live Costume and without Stars from your Hand if there is at least one card with the same Live Costume on your Stage.<br>For example, if you have cards with the Live Costumes {{red:"Aozora Jumping Heart"}}, {{red:"Aozora Jumping Heart"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} and {{red:"Koi ni Naritai AQUARIUM"}} on your Stage, you may ⟪ENTER⟫ up to one Member with the {{red:"Aozora Jumping Heart"}} Live Costume and without Stars, one Member with the {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} Live Costume and without Stars, and one Member with the {{red:"Koi ni Naritai AQUARIUM"}} Live Costume and without Stars from your Hand.`,
                },
            ],
        },
        {
            subjects: ["LL10-051"],
            seeAlso: ["/faq/general#member_counting", "/faq/general#stand_by"],
        },
        {
            subjects: ["LL10-052"],
            seeAlso: [
                "/faq/general#join_success_order",
                "/faq/general#flip_before_skills",
                "/faq/general#live_non_exact",
            ],
            qa: [
                {
                    question: `If the requirement of the Song card used in this ⟪LIVE⟫ was reduced by a Skill, does this Skill count the original or the reduced requirement? Additionally, if Members joining this ⟪LIVE⟫ gained Pieces from Skills, does this Skill count or ignore these additional Pieces?`,
                    answer: `If the ⟪LIVE⟫ is performed with a Song card with a reduced requirement, that changed requirement is counted. Similarly, any Pieces the joining Members gained from Skills are also counted in the total number of Pieces.`,
                },
            ],
        },
        {
            subjects: ["LL10-053"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"],
            qa: [
                {
                    question: `This Member performs a ⟪LIVE⟫ with a Member without [ALL]. If the other Member gains +[ALL] from a Skill, does that additional Piece fulfil the "If there is another Member with [ALL] who joined this ⟪LIVE⟫" requirement?`,
                    answer: `Yes. If another Member gains +[ALL] from a Skill, or a Skill allows you to treat another Piece as [ALL], the Skill's requirement is met.`,
                },
            ],
        },
        {
            subjects: ["LL10-054"],
            qa: [
                {
                    key: `same`,
                    question: `Can I pick two {{red:"1st Year"}} Members with the same name to add to my Hand?`,
                    answer: `Yes. As long as both cards are {{red:"1st Year"}} Members, you can add any card, no matter what their names are.`,
                },
                {
                    key: `optional`,
                    question: `If the cards shown from the Deck contain two or more {{red:"1st Year"}} Members, do I have to pick two cards to add to my Hand?`,
                    answer: `No. You can pick up to two cards, so you can add two Members, just one Member or no Members at all to your Hand.`,
                },
            ],
        },
        {
            subjects: ["LL10-059", "LL10-060"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `When exactly is the "If everyone of "Saint Aqours Snow" is on your Stage" requirement met?`,
                    answer: `You must have at least one card of each of these Members on your Stage: {{red:"Chika"}}, {{red:"Riko"}}, {{red:"Kanan"}}, {{red:"Dia"}}, {{red:"You"}}, {{red:"Yoshiko"}}, {{red:"Hanamaru"}}, {{red:"Mari"}}, {{red:"Ruby"}}, {{red:"Sarah"}} and {{red:"Leah"}}.`,
                },
            ],
        },
        {
            subjects: ["LL10-061"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL10-062"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `Can the requirement be met if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `Yes. As long as there is a {{red:"Sarah"}} card with [COOL] and a {{red:"Leah"}} card with [COOL] joining, the Any Piece requirement is reduced by 2, regardless of what other Members join.`,
                },
            ],
        },
        {
            subjects: ["LL10-063"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `I performed a ⟪LIVE⟫ with this Song card with two Members joining, who originally had three Pieces in total, but gained a fourth Piece from a [Live Join] Skill. Does this meet the "they must have four or more Pieces in total" requirement?`,
                    answer: `Yes. The Pieces gained from [Live Join] Skills remain for the rest of the match, so the Pieces will still be counted in the [While Live] Skill of this card and you will not lose a Live Point.`,
                },
            ],
        },
        {
            subjects: ["LL10-064"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL10-065"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL10-066"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL10-067"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `When performing a ⟪LIVE⟫ with this Song card, is it included when counting face-up Song cards in your Set List?`,
                    answer: `Yes. This card is counted, too.`,
                },
            ],
        },
        {
            subjects: ["LL10-068"],
            seeAlso: [
                "/faq/general#members_on_stage",
                "/faq/general#join_success_order",
                "/faq/general#member_counting",
            ],
        },
        {
            subjects: ["LL10-069"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL10-070"],
            seeAlso: [
                "/faq/general#members_on_stage",
                "/faq/general#join_success_order",
                "/faq/general#member_counting",
            ],
        },
        {
            subjects: ["LL10-071"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL10-072"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
        },
        {
            subjects: [{ from: "LL10-073", to: "LL10-090" }],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"],
        },
    ],
    LL11: [
        {
            subjects: [{ from: "LL11-039", to: "LL11-047" }],
            seeAlso: ["/faq/general#collection"],
        },
        {
            subjects: ["LL11-043", "LL11-044", "LL11-046"],
            qa: [
                {
                    question: `Does "Member with one Star" also include Members with two or more Stars?`,
                    answer: `No. "Member with one Star" refers to a Member card with exactly one Star.`,
                },
            ],
        },
        {
            subjects: ["LL11-050"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#join_success_order",
                "/faq/general#collection",
            ],
            qa: [
                {
                    question: `Between [LIVE] and the [Entry] Skill, which one should be used first?`,
                    answer: `Use all [Entry] Skills first, only then you may use [LIVE] to perform a ⟪LIVE⟫. You cannot use [LIVE] before that.`,
                },
            ],
        },
        {
            subjects: ["LL11-051"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#more_faceup_songs",
                "/faq/general#members_on_stage",
                "/faq/general#group",
                "/faq/general#group_skill_field",
            ],
            qa: [
                {
                    key: `paired`,
                    question: `When resolving the [Auto] Pair Skill, can I use the [Entry] Skill of the {{link:LL11-055}} card that is part of this pair to draw two cards?`,
                    answer: `Yes. It counts as a {{red:"Yoshiko"}} card on your Stage, so you can use its [Entry] Skill.`,
                },
                {
                    key: `target`,
                    question: `When using the [Entry] Skill of {{link:LL05-051}} when resolving the [Auto] Pair Skill, which cards can be counted as "Members on Stand-By"?`,
                    answer: `Any Members other than this card. (This includes both the {{link:LL05-051}} card whose Skill is being used, and the paired {{link:LL11-055}} card.)`,
                },
            ],
        },
        {
            subjects: ["LL11-052"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#group",
                "/faq/general#group_skill_field",
            ],
            qa: [
                {
                    key: `ability`,
                    question: `Between [LIVE] and the [Entry] Skill, which one should be used first?`,
                    answer: `Use all [Entry] Skills first, only then you may use [LIVE] to perform a ⟪LIVE⟫. You cannot use [LIVE] before that.`,
                },
                {
                    key: `extraturns`,
                    question: `When performing a ⟪LIVE⟫ with {{link:LL05-063}} while paired with {{link:LL11-057}}, two [Live Success] Skills will activate that say "take another turn". In that case, can I take two extra turns?`,
                    answer: `Yes. Take as many extra turns as "take another turn" Skills you have activated.`,
                },
            ],
        },
        {
            subjects: ["LL11-053"],
            seeAlso: ["/faq/general#collection", "/faq/general#skill_order_multiple_skills"],
        },
        {
            subjects: ["LL11-054"],
            seeAlso: ["/faq/general#stand_by"],
            qa: [
                {
                    question: `If the Member I told {{red:"I love you"}} has no Stars, can I still draw two cards?`,
                    answer: `Yes. Members without Stars count as Members with two or less Stars.`,
                },
            ],
        },
        {
            subjects: ["LL11-055"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#members_on_stage",
                "/faq/general#group",
                "/faq/general#group_skill_field",
            ],
            qa: [
                {
                    key: `paired`,
                    question: `When resolving the [Auto] Pair Skill, can I use the [Entry] Skill of this card to draw two cards?`,
                    answer: `Yes. It counts as a {{red:"Yoshiko"}} card on your Stage, so you can use its [Entry] Skill.`,
                },
                {
                    key: `target`,
                    question: `When using the [Entry] Skill of {{link:LL05-051}} when resolving the [Auto] Pair Skill, which cards can be counted as "Members on Stand-By"?`,
                    answer: `Any Members other than the {{link:LL11-051}} card that is part of this pair. (This includes both the {{link:LL05-051}} card whose Skill is being used, and this card.)`,
                },
            ],
        },
        {
            subjects: ["LL11-056"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#join_success_order",
                "/faq/general#members_on_stage",
                "/faq/general#member_counting",
            ],
            qa: [
                {
                    key: `inactive`,
                    question: `Does "Member with a {{red:"Birthday Bonus"}}" include only Members whose Birthday Bonus is active?`,
                    answer: `No. All Members with a Birthday Bonus are included, no matter whether it is active or not.`,
                },
                {
                    key: `nodouble`,
                    question: `If a Member with an already active Birthday Bonus joins this ⟪LIVE⟫, do they gain another Birthday Bonus Piece?`,
                    answer: `No. Skills that activate the Birthday Bonus on cards where it is already active will not add more Pieces.`,
                },
            ],
        },
        {
            subjects: ["LL11-057"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#group",
                "/faq/general#group_skill_field",
            ],
            qa: [
                {
                    key: `ability`,
                    question: `Between [RUSH] and the [Entry] Skill, which one should be used first?`,
                    answer: `Use all [Entry] Skills first, only then you may use [RUSH] to perform a ⟪LIVE⟫. You cannot use [RUSH] before that.`,
                },
                {
                    key: `extraturns`,
                    question: `When performing a ⟪LIVE⟫ with {{link:LL05-063}} while paired with {{link:LL11-052}}, two [Live Success] Skills will activate that say "take another turn". In that case, can I take two extra turns?`,
                    answer: `Yes. Take as many extra turns as "take another turn" Skills you have activated.`,
                },
            ],
        },
        {
            subjects: ["LL11-058"],
            seeAlso: [
                "/faq/general#join_success_order",
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#more_faceup_songs",
                "/faq/general#collection",
                "/faq/general#group",
                "/faq/general#group_skill_field",
            ],
        },
        {
            subjects: ["LL11-059"],
            seeAlso: [
                "/faq/general#join_success_order",
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#flip_before_skills",
                "/faq/general#top_deck_card_faceup",
            ],
        },
        {
            subjects: ["LL11-060"],
            seeAlso: [
                "/faq/general#join_success_order",
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#more_faceup_songs",
                "/faq/general#collection",
                "/faq/general#group",
                "/faq/general#group_skill_field",
            ],
            qa: [
                {
                    question: `When ⟪ENTER⟫ing "up to two differently named Members without Stars" with the [Entry] Skill, can I also ⟪ENTER⟫ just one Member?`,
                    answer: `Yes. You can ⟪ENTER⟫ just one or even no Members.`,
                },
            ],
        },
        {
            subjects: ["LL11-061"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"],
        },
        {
            subjects: ["LL11-062"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting"],
        },
        {
            subjects: ["LL11-063"],
            seeAlso: ["/faq/general#flip_before_skills", "/faq/general#muse_and_aqours_song_cards"],
            qa: [
                {
                    question: `A pair with {{link:LL11-052}} and {{link:LL11-057}} are joining a ⟪LIVE⟫ with this card. Between the "take another turn" from their [Live Success] Pair Skill and the "you may perform a ⟪LIVE⟫" from this card's [Live Success] Skill, which comes first?`,
                    answer: `Perform a ⟪LIVE⟫ in this turn first, then you can take the extra turn after this turn is over. (This applies regardless of the order in which you resolved the [Live Success] Skills.)`,
                },
            ],
        },
        {
            subjects: ["LL11-065"],
            qa: [
                {
                    question: `The Skill text for this card says {{red:"Saint Aqours Snow"}}, but if {{link:LL05-049}} joins this ⟪LIVE⟫, does she still gain +[ALL] from her [Live Join] Skill?`,
                    answer: `Yes. {{red:"Saint Aqours Snow"}} includes the word {{red:"Aqours"}}, so the Skill's requirement is met.`,
                },
            ],
        },
        {
            subjects: ["LL11-066"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills", "/faq/general#collection"],
        },
        {
            subjects: ["LL11-067"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#collection"],
            qa: [
                {
                    question: `If a Song card has two or more Skills, can I use both?`,
                    answer: `Yes. You can use both Skills.`,
                },
            ],
        },
        {
            subjects: ["LL11-068"],
            qa: [
                {
                    question: `What does this Memory do if it has no Skills?`,
                    answer: `The Skills of cards such as {{link:LL11-039}} or {{link:LL11-067}} refer to this card being on your Stage.`,
                },
            ],
        },
        {
            subjects: ["LL11-069"],
            qa: [
                {
                    question: `What exactly does the [Auto] Skill do?`,
                    answer: `When using the Skills of <a href="/search/skill:Dia-chan">certain cards</a>, the other players get a chance to call Dia {{red:"Dia-chan"}}. If all other players do so, the requirement is met.<br>For example, if {{link:LL08-049}}'s Skill is resolved and all other players call Dia {{red:"Dia-chan"}}, you may ⟪ENTER⟫ one Member without Stars from your Hand, and then draw two cards. If even one of the other players does not call Dia {{red:"Dia-chan"}}, the top card of your Deck is ⟪ENTER⟫ed and no cards are drawn.`,
                },
            ],
        },
        {
            subjects: ["LL11-070"],
            qa: [
                {
                    question: `In what order should this card's [Auto] Skill and the [Live Success] Skills of the Song card and Member cards joining this ⟪LIVE⟫ be resolved?`,
                    answer: `You can resolve them in any order of your choice. If there is more than one [Live Success] Skill, you can even resolve the [Auto] Skill in-between them, like [Live Success][Auto][Live Success].`,
                },
            ],
        },
        {
            subjects: ["LL11-071"],
            qa: [
                {
                    key: `order`,
                    question: `In what order should this card's [Auto] Skill and the [Live Success] Skills of the Song card and Member cards joining this ⟪LIVE⟫ be resolved?`,
                    answer: `You can resolve them in any order of your choice.`,
                },
                {
                    key: `later`,
                    question: `I used this card's Skill to ⟪ENTER⟫ enough Members to meet the requirement of {{link:LL11-065}}. Will I gain ♪Live Points +9♪?`,
                    answer: `Yes. If the Skill's requirement is met, you will gain the extra Live Points.`,
                },
                {
                    key: `requirement`,
                    question: `With this Memory card on Stage, I want to perform a ⟪LIVE⟫ with {{red:"Awaken the Power"}}, and both {{red:"Ruby"}} and {{red:"Leah"}} joining it. Can I use this card's [Auto] Skill to ⟪ENTER⟫ Members and add their Pieces to the Pieces the joining Members have?`,
                    answer: `No. The [Auto] Skill only allows you to ⟪ENTER⟫ Members and have them join the performed ⟪LIVE⟫. Since the [Auto] Skill will only trigger after a ⟪LIVE⟫ was successfully performed, you must have Members on Stand-By join the ⟪LIVE⟫ so the requirement of {{red:"Awaken the Power"}} can be reached.`,
                },
            ],
        },
        {
            subjects: ["LL11-072"],
            qa: [
                {
                    key: `noattribute`,
                    question: `With this Memory card on Stage, I performed a ⟪LIVE⟫ with {{link:LL05-053}} joining it, together with a Member with [SMILE], a Member with [PURE] and a Member with [COOL] joining. Will {{red:"Mari"}} gain +[ALL] from her Skill?`,
                    answer: `No. The [Auto] Skill of this card applies before resolving [Live Join] Skills, so the [SMILE][PURE][COOL] Pieces of the joining Members must already be treated as [ALL]. In this case, the requirement of {{red:"Mari"}}'s Skill is not met and she will not gain +[ALL].`,
                },
                {
                    key: `additional`,
                    question: `With this Memory card on Stage, I performed a ⟪LIVE⟫ with a Member who gained +[SMILE] from a [Live Join] Skill. Is that Piece treated as [ALL], too?`,
                    answer: `Yes. The Piece will be treated as [ALL] after it is gained.`,
                },
            ],
        },
        {
            subjects: ["LL11-073"],
            qa: [
                {
                    question: `With this Memory card on Stage, I performed another ⟪LIVE⟫. Do I gain another Live Point?`,
                    answer: `Yes. Even after this Memory has been brought on Stage, you will gain a Live Point every time you perform another ⟪LIVE⟫.`,
                },
            ],
        },
        {
            subjects: [{ from: "LL11-074", to: "LL11-091" }],
            seeAlso: [
                "/faq/general#join_success_order",
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#flip_before_skills",
            ],
            qa: [
                {
                    question:
                        "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                    answer: "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the first player in the turn order can begin.",
                },
            ],
        },
    ],
    LL12: [
        {
            subjects: [{ from: "LL12-037", to: "LL12-045" }],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#collection", "/faq/general#more_faceup_songs"],
        },
        {
            subjects: ["LL12-039", "LL12-040", "LL12-043"],
            qa: [
                {
                    key: `songs`,
                    question: `Which Song cards are {{red:"AZALEA"}} Song cards?`,
                    answer: `You can find <a href="/search/song/azalea">a list of all {{red:"AZALEA"}} Song cards here</a>.`,
                },
                {
                    key: `dupes`,
                    question: `Can I bring a Song card with the same name as a Song card in my Set List or a Song card used for a ⟪LIVE⟫ from my Collection to my Set List? And can I perform ⟪LIVE⟫s with both of them?`,
                    answer: `Yes. You can being Song cards with the same name to your Set List, no matter whether their ID matches with one of the Song cards in play or not, and perform ⟪LIVE⟫s with them.`,
                },
            ],
        },
        {
            subjects: ["LL12-046"],
            seeAlso: ["/faq/general#member_counting", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL12-047"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    key: `explain`,
                    question: `How exactly should I resolve the [Live Success] Skill?`,
                    answer: `In this example, let's assume you have performed a ⟪LIVE⟫ and the Members who joined it have [SMILE] x 2, [PURE] x 2, [COOL] x 2 and [ALL] x 1 in total.<br>If the Song card used for the ⟪LIVE⟫ is {{link:LL07-057}}, there will be one [PURE] remaining when checking the Piece total against the requirement, so you can draw two cards.<br>If the Song card used for the ⟪LIVE⟫ is {{link:LL12-055}}, there will be two Pieces remaining when checking the Piece total against the requirement. Since this Song card has an Any Piece requirement, you can decide which Pieces should be considered used and which ones remain unused, so you can draw up to four cards.`,
                },
                {
                    key: `count`,
                    question: `How do I count how many Attributes have remaining Pieces?`,
                    answer: `For each Attribute, [SMILE][PURE][COOL] and [ALL], count the leftover Pieces after subtracting the Song card's requirement from the total Pieces of the Members joining the ⟪LIVE⟫. [ALL] counts as a seperate Attribute, so if, for example, you have [COOL][ALL][ALL] remaining, there are two Attribute with remaining Pieces.`,
                },
                {
                    key: `skills`,
                    question: `If the requirement of the Song card used in this ⟪LIVE⟫ was reduced by a Skill, does this Skill count the original or the reduced requirement? Additionally, if Members joining this ⟪LIVE⟫ gained Pieces from Skills, does this Skill count or ignore these additional Pieces?`,
                    answer: `If the ⟪LIVE⟫ is performed with a Song card with a reduced requirement, that changed requirement is counted. Similarly, any Pieces the joining Members gained from Skills are also counted in the total number of Pieces.`,
                },
            ],
        },
        {
            subjects: ["LL12-048"],
            seeAlso: [
                "/faq/general#more_faceup_songs",
                "/faq/general#no_shuffle_facedown_song",
                "/faq/general#skill_order_multiple_skills",
            ],
            qa: [
                {
                    question: `If I turn a face-up Song card face-down, I will have zero face-up Song cards in my Set List. Can I still perform ⟪LIVE⟫s like that?`,
                    answer: `No. If there are no face-up Song cards in your Set List, you cannot perform ⟪LIVE⟫s. As such, unless you have a Skill that allows you to turn a face-down Song card face-up again, you should avoid flipping your last Song card face-down.`,
                },
            ],
        },
        {
            subjects: ["LL12-049"],
            qa: [
                {
                    question: `When resolving this card's [Entry] Skill, I chose to not draw two cards. What happens next?`,
                    answer: `If you don't draw two cards, the [Entry] Skill finishes resolving, after which you can use [RUSH] or [LIVE].`,
                },
            ],
        },
        {
            subjects: ["LL12-050"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `What happens if I apply the effect of this card's [Live Join] Skill to a Member with an active Birthday Bonus?`,
                    answer: `Members with active Birthday Bonuses will also only have three Pieces, [SMILE][PURE][COOL], after the effect is applied to them.<br>For example, {{link:PR-134}} has two Pieces, [SMILE][ALL], if her Birthday Bonus is active, but after this Skill's effect is applied, she will have three Pieces, [SMILE][PURE][COOL].`,
                },
            ],
        },
        {
            subjects: ["LL12-051"],
            qa: [
                {
                    key: `off`,
                    question: `This card was taken off the Stage during the turn in which this Member's [Entry] Skill was used. Do I still have to return all of the cards in my Hand to my Deck?`,
                    answer: `Yes. When performing the [Entry] Skill, you must return all of the cards in your Hand to your Deck at the end of the turn, no matter whether the Member is still on the Stage at that point or not.`,
                },
                {
                    key: `facedown`,
                    question: `This card was flipped face-down due to another card's [Special Practice] during the turn in which this Member's [Entry] Skill was used. Do I still have to return all of the cards in my Hand to my Deck?`,
                    answer: `Yes. When performing the [Entry] Skill, you must return all of the cards in your Hand to your Deck at the end of the turn, no matter whether the Member is face-up at that point or not.`,
                },
            ],
        },
        {
            subjects: ["LL12-052"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: `nowildcard`,
                    question: `The Members joining this ⟪LIVE⟫ have [SMILE] x 3 and [ALL] x 1 in total. In this case, will this Member gain +[SMILE] from the first [Live Join] Skill?`,
                    answer: `No. The first [Live Join] Skill requires four or more Pieces of one Attribute, [SMILE], [PURE], [COOL] or [ALL]. [ALL] cannot be used as a wildcard for other Attributes.`,
                },
                {
                    key: `order`,
                    question: `The other Members joining this ⟪LIVE⟫ have [SMILE] x 3 in total. Can I first use the second [Live Join] Skill to have this Member gain +[SMILE], so I can then meet the requirement for the first [Live Join] Skill?`,
                    answer: `No. If a Member has two or more Skills with the same icon, you must use them in the given order. In this case, the requirement of the first [Live Join] Skill fails.`,
                },
            ],
        },
        {
            subjects: ["LL12-053"],
            qa: [
                {
                    key: `notchosen`,
                    question: `What happens to the card that was not chosen?`,
                    answer: `If the top card of the Deck was not chosen, it is left face-up on top of the Deck until it is drawn. If the card from the Hand was not chosen, it is returned to the Hand and you can hide it from the other players again.`,
                },
                {
                    key: `empty`,
                    question: `If my Hand or my Deck is empty, can I use this Skill?`,
                    answer: `No. If there is no card in the Deck to flip, or no card from your Hand to show, you cannot use the Skill.`,
                },
                {
                    key: `alreadyopen`,
                    question: `The top card of my Deck is already face-up because of another Skill. Can I still use this Skill?`,
                    answer: `Yes. In that case, leave the top card of your Deck face-up, and show one Member from your Hand to everyone.`,
                },
            ],
        },
        {
            subjects: ["LL12-054"],
            qa: [
                {
                    key: `explain`,
                    question: `How exactly should I resolve the [Auto] Skill?`,
                    answer: `Take the [Entry] Skill of {{link:LL11-050}}, for example. You must choose a Member to return to the bottom your Deck. If you choose this Member, you can ⟪ENTER⟫ it instead of returning it to the Deck. (You don't have to choose another Member to return to your deck after ⟪ENTER⟫ing this Member.)`,
                },
                {
                    key: `ifyoudo`,
                    question: `For Skills like {{link:LL08-064}}'s Skill, where returning a card to the Deck is optional and you can activate an additional effect if doing so, does it still activate if I choose to return this Member and then ⟪ENTER⟫ it instead by using the [Auto] Skill?`,
                    answer: `Yes. No cards are returned to the Deck, but the requirement is still met.<br>Similarly, when a Skill like {{link:LL07-051}}'s Skill requires multiple cards to be returned to the Deck, the requirement is met even if some or all of the returned cards are this Member.`,
                },
                {
                    key: `order`,
                    question: `When resolving a Skill that requires returning multiple cards to the Deck, and either arranging them in a chosen order (like {{link:EX10-009}}) or shuffling them (like {{link:LL12-051}}), how should this Member be handled?`,
                    answer: `After picking the Members to return to the Deck, ⟪ENTER⟫ the {{link:LL12-054}}s among them first, then put the rest of the cards into the Deck as described. (You don't have to pick a position in the order for this card, and you don't have to shuffle it with the other returning cards before ⟪ENTER⟫ing it.)`,
                },
                {
                    key: `live`,
                    question: `For Skills like {{link:EX10-009}}'s [Entry] Skill, which allow you to perform a ⟪LIVE⟫ after returning cards to the Deck, if I use this Member and ⟪ENTER⟫ it instead of returning it to the Deck, can it join the ⟪LIVE⟫ that will be performed as a result of the Skill?`,
                    answer: `Yes. The Member was ⟪ENTER⟫ed by the time the ⟪LIVE⟫ is being performed, so it can perform in that ⟪LIVE⟫.`,
                },
                {
                    key: `livejoin`,
                    question: `For Skills like {{link:PR-125}} [Live Join] Skill, which require returning cards to the Deck when performing a ⟪LIVE⟫, if I use this Member and ⟪ENTER⟫ it instead of returning it to the Deck, can it join the ⟪LIVE⟫ that is being performed?`,
                    answer: `No. [Live Join] Skills are resolved after the Members who join the ⟪LIVE⟫ are picked. As such, Members who are ⟪ENTER⟫ed from [Live Join] Skills cannot join that ⟪LIVE⟫.`,
                },
            ],
        },
        {
            subjects: ["LL12-055"],
            qa: [
                {
                    question: `How exactly should I resolve the [While Live] Skill?`,
                    answer: `Using {{link:LL05-063}} as an example, if this card's [While Live] Skill is active, the [Live Success] Skill of {{red:"MIRAI TICKET"}} will turn from "If all Members who joined this ⟪LIVE⟫ are {{red:"Aqours"}} cards, take another turn" into "If all Members who joined this ⟪LIVE⟫ are {{red:"Aqours"}} cards, ⟪SCOUT⟫". So, if any player performs a ⟪LIVE⟫ with {{red:"MIRAI TICKET"}} and only {{red:"Aqours"}} Members join, instead of taking another turn, they will ⟪SCOUT⟫.`,
                },
            ],
        },
        {
            subjects: ["LL12-056"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting"],
            qa: [
                {
                    key: `order`,
                    question: `In what order should this card's [Auto] Skill and the [Live Success] Skills of the Song card and Member cards joining this ⟪LIVE⟫ be resolved?`,
                    answer: `You can resolve them in any order of your choice. If there is more than one [Live Success] Skill, you can even resolve the [Auto] Skill in-between them, like [Live Success][Auto][Live Success].`,
                },
                {
                    key: `between`,
                    question: `While resolving the Skills of a Member with two or more Skills with the same icon, such as {{link:EX10-002}}, this Song card was flipped face-up by their first Skill. Can I use this card's [Auto] Skill before moving on to the other card's next Skill?`,
                    answer: `No. If a card has two or more Skills with the same icon, they must be resolved from in order, top to bottom, and you cannot use the Skills of other cards until all Skills are resolved.`,
                },
                {
                    key: `interrupt`,
                    question: `This Song card was flipped up in the middle of resolving a Skill, such as {{link:LL03-058}}'s [Entry] Skill. Can I immediately use this card's [Auto] Skill?`,
                    answer: `No. You can't use another Skill until the current Skill is fully resolved.`,
                },
            ],
        },
        {
            subjects: ["LL12-057"],
            qa: [
                {
                    question: `Which Song cards are {{red:"CYaRon!"}} Song cards?`,
                    answer: `You can find <a href="/search/song/cyaron">a list of all {{red:"CYaRon!"}} Song cards here</a>.`,
                },
            ],
        },
        {
            subjects: ["LL12-058"],
            qa: [
                {
                    question: `Which Song cards are {{red:"AZALEA"}} Song cards?`,
                    answer: `You can find <a href="/search/song/azalea">a list of all {{red:"AZALEA"}} Song cards here</a>.`,
                },
            ],
        },
        {
            subjects: ["LL12-059"],
            qa: [
                {
                    question: `Which Song cards are {{red:"Guilty Kiss"}} Song cards?`,
                    answer: `You can find <a href="/search/song/guiltykiss">a list of all {{red:"Guilty Kiss"}} Song cards here</a>.`,
                },
            ],
        },
        {
            subjects: ["LL12-061"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `How exactly should I resolve the [Live Success] Skill?`,
                    answer: `As an example, assume you have {{red:"Chika"}}, {{red:"Riko"}}, {{red:"Kanan"}}, {{red:"You"}}, {{red:"Dia"}} and {{red:"Ruby"}} on your Stage. Since all three Members of {{red:"CYaRon!"}}, {{red:"Chika"}}, {{red:"You"}} and {{red:"Ruby"}}, are there, it counts as one complete subunit. On the other hand, {{red:"Guilty Kiss"}} ({{red:"Riko"}}, {{red:"Yoshiko"}} and {{red:"Mari"}}) and {{red:"AZALEA"}} ({{red:"Kanan"}}, {{red:"Dia"}} and {{red:"Hanamaru"}}) cannot be counted, since you don't have all three Members of the subunits on Stage.<br>As a result, in this example, you would be allowed to ⟪ENTER⟫ one Member without Stars from your Hand.`,
                },
            ],
        },
        {
            subjects: ["LL12-063"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting"],
            qa: [
                {
                    question: `How exactly should I resolve the [Live Success] Skill?`,
                    answer: `Take the number of Members on your Stage, while counting yourself, the player, as another Member. If there are nine Member cards on your Stage, the total number, including yourself, will be ten, which is the exact amount you need.`,
                },
            ],
        },
        {
            subjects: [{ from: "LL12-064", to: "LL12-081" }],
            seeAlso: [
                "/faq/general#stand_by",
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#join_success_order",
            ],
            qa: [
                {
                    question: `How exactly should I resolve the [On Stand-By] Skill?`,
                    answer: `Each time you take a turn, you may look at the top card of your Deck before choosing between ⟪ENTER⟫ing a Member, performing a ⟪LIVE⟫, or ⟪SCOUT⟫ing. (You don't have to show the card to the other players, you can just put it back after looking at it.) After you have returned the card to the Deck, you can perform your chosen action.`,
                },
            ],
        },
    ],
    LL13: [
        {
            subjects: [{ from: "LL13-037", to: "LL13-045" }],
            seeAlso: ["/faq/general#stand_by"],
        },
        {
            subjects: ["LL13-046"],
            qa: [
                {
                    question: `When I ⟪ENTER⟫ed this Member, I had no cards in my Hand. Even if can't ⟪ENTER⟫ a {{red:"µ's"}} Member from my Hand, can I still ⟪SCOUT⟫?`,
                    answer: `Yes. Regardless of whether you ⟪ENTER⟫ a Member or not, as long as you have no cards in your Hand, do a ⟪SCOUT⟫.`,
                },
            ],
        },
        {
            subjects: ["LL13-047"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"],
            qa: [
                {
                    question: `Does this Skill activate if performing a ⟪LIVE⟫ using a Song card which awards something like {{red:"3+1"}} Live Points, like {{link:LL02-075}}?`,
                    answer: `Yes. It will activate if the total of both base and bonus Live Points gained is 4 or more. However, you must meet the conditions to gain the bonus Live Points.`,
                },
            ],
        },
        {
            subjects: ["LL13-048"],
            qa: [
                {
                    question: `What exactly does "pick up to one {{red:"µ's"}} Member with [RUSH], [LIVE], or a Live Costume each from them" mean?`,
                    answer: `Pick up to one {{red:"µ's"}} Member with [RUSH], up to one {{red:"µ's"}} Member with [LIVE], and up to one {{red:"µ's"}} Member with a Live Costume. You cannot pick more than one Member having one of these traits.<br>For example, if the cards your show from your Deck are {{link:EX01-001}}, {{link:LL13-053}}, {{link:LL13-049}} and {{link:LL02-012}}, you can add either {{red:"Honoka"}} or {{red:"Hanayo"}} as the Member with [RUSH], {{red:"Umi"}} as the Member with [LIVE], and {{red:"Kotori"}} as the Member with a Live Costume to your Hand.`,
                },
            ],
        },
        {
            subjects: ["LL13-049"],
            seeAlso: ["/faq/general#more_faceup_songs"],
            qa: [
                {
                    question: `When performing a ⟪LIVE⟫ using this Member's [LIVE], can I use the Song card that was flipped face-up by this Member's [Entry] Skill?`,
                    answer: `Yes. You can use that Song card for the ⟪LIVE⟫.`,
                },
            ],
        },
        {
            subjects: ["LL13-050"],
            qa: [
                {
                    question: `How exactly should I resolve the [Entry] Skill?`,
                    answer: `[RUSH] allows you to ⟪ENTER⟫ a Member from your Hand, but usually, only one [RUSH] can be used per turn. However, if you use this Skill, you can use more than one [RUSH] in the same turn to ⟪ENTER⟫ more Members.<br>For example, if you use this Member's [RUSH] to ⟪ENTER⟫ {{link:LL13-032}} from your Hand, you can use that Member's [RUSH] to ⟪ENTER⟫ another Member from your Hand. Similarly, if you ⟪ENTER⟫ this Member using another Member's [RUSH], you are allowed to use this Member's [RUSH] to ⟪ENTER⟫ another Member from your Hand.`,
                },
            ],
        },
        {
            subjects: ["LL13-052"],
            seeAlso: ["/faq/general#top_deck_card_faceup"],
        },
        {
            subjects: ["LL13-053"],
            seeAlso: ["/faq/general#flip_before_skills"],
            qa: [
                {
                    question: `There are no Members with three Stars that are Live on any player's Stage. If I perform a ⟪LIVE⟫ with this Member and a Member with three Stars, can I draw two cards using this Member's [Live Success] Skill?`,
                    answer: `Yes. At the time this Member's [Live Success] Skill is resolved, the ⟪LIVE⟫ has been performed, and now there is a Member with three Stars that is Live, so the requirement is met.`,
                },
            ],
        },
        {
            subjects: ["LL13-054"],
            seeAlso: [
                "/faq/general#live_join_pieces",
                "/faq/general#join_success_order",
                "/faq/general#flip_before_skills",
            ],
            qa: [
                {
                    question: `Can I count [ALL] as another Piece to meet the requirement of this Member's [Live Success] Skill?`,
                    answer: `No. You must have two or more [SMILE], two or more [PURE], and two or more [COOL]. [ALL] are not counted.`,
                },
            ],
        },
        {
            subjects: ["LL13-055"],
            qa: [
                {
                    question: `What is the Attribute of this Song card?`,
                    answer: `The Attribute of this Song card is Orange.<br>This Attribute is different from the Smil, Pure, Cool and Neutral Attributes. For example, when resolving {{link:LL03-060}}'s Skill and counting the amount of different Attributes, this Song card's Attribute is counted as a separate Attribute from the other four. (If you have Smile, Pure, Cool, Neutral, and Orange Song cards face-up, the amount of different Attributes is five.)`,
                },
            ],
        },
        {
            subjects: ["LL13-056"],
            seeAlso: [
                "/faq/general#live_join_pieces",
                "/faq/general#join_success_order",
                "/faq/general#flip_before_skills",
            ],
            qa: [
                {
                    key: `added`,
                    question: `If a Member who is joining this ⟪LIVE⟫ did not have [ALL] originally, but gained +[ALL] from a [Live Join] Skill, am I allowed to ⟪ENTER⟫?`,
                    answer: `No. Even if [ALL] is gained later through Skills, or another Piece must be treated as [ALL] as the result of a Skill, the requirement is failed.`,
                },
                {
                    key: `notoptional`,
                    question: `If a Skill would cause this card's [Live Success] Skill to fail, because it adds an [ALL] Piece or makes you treat another Piece as [ALL], can I choose not to use that Skill?`,
                    answer: `No. Unless the Skill says "you may", you must resolve the Skill's effects.`,
                },
            ],
        },
        {
            subjects: ["LL13-057"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#join_success_order",
                "/faq/general#flip_before_skills",
            ],
            qa: [
                {
                    question: `If a Song card has two or more Skills, can I use both if both of their requirements are met?`,
                    answer: `Yes. In that case, you can use both Skills.`,
                },
            ],
        },
        {
            subjects: ["LL13-058"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL13-059", "LL13-062", "LL13-063"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `The Skill says "all three are on your Stage", does that mean there must be exactly three Member cards on my Stage?`,
                    answer: `No. As long as there are only cards of the three mentioned Members and at least one card of each of them, the Skill is active no matter how many cards there are on your Stage.`,
                },
            ],
        },
        {
            subjects: ["LL13-060"],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["LL13-061"],
            qa: [
                {
                    question: `What Attribute is {{link:LL13-055}} counted as?`,
                    answer: `It is counted as "Orange". See <a href="#055">the FAQ section for {{red:"Snow halation"}}</a> for details.`,
                },
            ],
        },
        {
            subjects: ["LL13-064", "LL13-069", "LL13-070"],
            qa: [
                {
                    key: `order`,
                    question: `In what order should this card's [Auto] Skill and the [Live Success] Skills of the Song card and Member cards joining this ⟪LIVE⟫ be resolved?`,
                    answer: `You can resolve them in any order of your choice. If there is more than one [Live Success] Skill, you can even resolve the [Auto] Skill in-between them, like [Live Success][Auto][Live Success].`,
                },
                {
                    key: `changed`,
                    question: `If the requirement of the Song card used in this ⟪LIVE⟫ was reduced by a Skill, does this Skill count the original or the reduced requirement? Additionally, if Members joining this ⟪LIVE⟫ gained Pieces from Skills, does this Skill count or ignore these additional Pieces?`,
                    answer: `If the ⟪LIVE⟫ is performed with a Song card with a reduced requirement, that changed requirement is counted. Similarly, any Pieces the joining Members gained from Skills are also counted in the total number of Pieces.`,
                },
            ],
        },
        {
            subjects: ["LL13-065", "LL13-066", "LL13-068"],
            qa: [
                {
                    question: `In what order should this card's [Auto] Skill and the [Live Join] Skills of the Song card and Member cards joining this ⟪LIVE⟫ be resolved?`,
                    answer: `You can resolve them in any order of your choice. If there is more than one [Live Join] Skill, you can even resolve the [Auto] Skill in-between them, like [Live Join][Auto][Live Join].`,
                },
            ],
        },
        {
            subjects: ["LL13-067", "LL13-071", "LL13-072"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `In what order should this card's [Auto] Skill and the [Live Success] Skills of the Song card and Member cards joining this ⟪LIVE⟫ be resolved?`,
                    answer: `You can resolve them in any order of your choice. If there is more than one [Live Success] Skill, you can even resolve the [Auto] Skill in-between them, like [Live Success][Auto][Live Success].`,
                },
            ],
        },
    ],
    LL14: [
        {
            subjects: ["LL14-041", "LL14-042", "LL14-045", "LL14-046", "LL14-047", "LL14-049"],
            seeAlso: ["/faq/general#collection"],
        },
        {
            subjects: ["LL14-043", "LL14-044", "LL14-048"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
        },
        {
            subjects: ["LL14-050", "LL14-051"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#group",
                "/faq/general#flip_before_skills",
                "/faq/general#join_success_order",
                "/faq/general#group_skill_field",
                "/faq/general#more_faceup_songs",
                "/faq/general#muse_and_aqours_song_cards",
            ],
            qa: [
                {
                    question: `With exactly two face-up Song cards in my Set List, I form a Pair with {{link:LL14-050}} and {{link:LL14-051}}, and use their [Auto] Skill to flip one face-down Song card face-up, which means there are now three face-up Song cards. Can I perform a ⟪LIVE⟫ with this Pair?`,
                    answer: `No. Only one of the two effects of the [Auto] Skill is used, depending on the amount of face-up Song cards at the time this Pair was formed.`,
                },
            ],
        },
        {
            subjects: ["LL14-052", "LL14-053", "LL14-057"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#group",
                "/faq/general#group_skill_field",
                "/faq/general#member_counting",
                "/faq/general#collection",
            ],
            qa: [
                {
                    key: `double`,
                    question: `Two trios of {{link:LL14-052}}, {{link:LL14-053}} and {{link:LL14-057}} each join the same ⟪LIVE⟫. Will both of the trios give the Song card ♪Live Points +1♪?`,
                    answer: `Yes. There are two [Auto] Skills granting ♪Live Points +1♪ each, so in total, the Song card will gain ♪Live Points +2♪.`,
                },
                {
                    key: `pair`,
                    question: `With {{link:LL14-052}} on Stand-By, but {{link:LL14-053}} not on Stand-By, I'm ⟪ENTER⟫ing {{link:LL14-057}} and use her "Form a Trio" [Entry] Skill. In this situation, can I still form a Group with just {{red:"Kanan"}} and {{red:"Mari"}}?`,
                    answer: `No. You can only form the Trio when both {{link:LL14-052}} and {{link:LL14-053}} are on Stand-By and they are not part of a Trio already.`,
                },
            ],
        },
        {
            subjects: ["LL14-054"],
            seeAlso: ["/faq/general#collection"],
        },
        {
            subjects: ["LL14-055"],
            seeAlso: ["/faq/general#collection"],
            qa: [
                {
                    question: `With {{link:LL14-069}} not on my Stage yet, I ⟪ENTER⟫ed this Member, and brought {{link:LL14-069}} to my Stage. Which Ability will this Member be able to use, [RUSH] or [LIVE]?`,
                    answer: `The Member can use [RUSH]. The Memory's [Auto] Skill is applied before the Member's Ability can be used.`,
                },
            ],
        },
        {
            subjects: ["LL14-058"],
            seeAlso: ["/faq/general#collection"],
            qa: [
                {
                    question: `How can I activate this Member's [Live Join] Skill?`,
                    answer: `Using Skills like the [Auto] Skill of {{link:LL14-071}}, or the [Live Success] Skill of {{link:LL07-055}}, you can perform a second ⟪LIVE⟫ in the same turn. You can have this Member participate in that second ⟪LIVE⟫.<br>Note that Skills that allow you to take another turn, such as {{link:LL05-063}}, will not activate the Skill, as the extra turn counts as a new turn. In that case, you are performing two ⟪LIVE⟫s in two separate turns, and the requirement is not met.`,
                },
            ],
        },
        {
            subjects: ["LL14-059", "LL14-060"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#group",
                "/faq/general#more_faceup_songs",
                "/faq/general#group_skill_field",
                "/faq/general#collection",
            ],
        },
        {
            subjects: ["LL14-061"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL14-062"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL14-063"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `If I have Memories on my Stage, can I perform a ⟪LIVE⟫ with this Song card and resolve the [Live Join] Skill without returning the Memories to my Collection?`,
                    answer: `No. If you have any Memories on your Stage, you must return them all to your Collection.`,
                },
            ],
        },
        {
            subjects: ["LL14-065"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#live_join_pieces"],
            qa: [
                {
                    question: `I used the [Live Join] Skill to treat the Pieces of Members with the {{red:"Brightest Melody"}} Live Costume as [ALL]. After successfully performing the ⟪LIVE⟫, I used the [Auto] Skill of {{link:LL14-074}} to have additional Members with the {{red:"Brightest Melody"}} Live Costume join that ⟪LIVE⟫. Can I also treat their Pieces as [ALL]?`,
                    answer: `No. [Live Join] Skills only affect Members who have joined the ⟪LIVE⟫ at the time the Skill is resolved, so only those Members will have their Pieces treated as [ALL].`,
                },
            ],
        },
        {
            subjects: ["LL14-066"],
            qa: [
                {
                    question: `The Members joining this ⟪LIVE⟫ have 10 or more Stars in total. What happens to the Any Piece requirement?`,
                    answer: `It becomes 0. (Any Piece requirements cannot drop below 0.) You can perform a ⟪LIVE⟫ with this Song card with as many Members joining as you want, even if they have 10 or more Stars in total.`,
                },
            ],
        },
        {
            subjects: ["LL14-067"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `I performed a ⟪LIVE⟫ with this Song card with six differently named Members joining. After successfully performing the ⟪LIVE⟫, I used the [Auto] Skill of {{link:LL14-074}} to have additional Members join that ⟪LIVE⟫, so there are nine differently named Members in the Live and the requirement of the [While Live] Skill is met. Will I gain ♪Live Points +1♪?`,
                    answer: `Yes. Even if the requirement of a [While Live] is only met after successfully performing a ⟪LIVE⟫ with that card, it can activate.`,
                },
            ],
        },
        {
            subjects: ["LL14-068"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    key: `nodeckenter`,
                    question: `What exactly does "You may not ⟪ENTER⟫ Members from your Deck" mean?`,
                    answer: `You cannot ⟪ENTER⟫ any Member cards directly from your Deck, both through your turn action and Skills. (You can still ⟪ENTER⟫ Members from your Hand.)<br>For Skills that involve ⟪ENTER⟫ing cards from your Deck, ignore only that part. For example, when ⟪ENTER⟫ing {{link:LL05-046}} and resolving her [Entry] Skill with no cards in your Hand and no Members on Stand-By, you are not allowed to ⟪ENTER⟫ the top card of your Deck, but you can still draw three cards.`,
                },
                {
                    key: `order`,
                    question: `I successfully performed a ⟪LIVE⟫, and can now resolve this card's [Auto] Skills and other card's [Live Success] Skills. In that case, can I use this card's [Auto] Skills to return this Memory and draw cards before resolving the [Live Success] Skills?`,
                    answer: `Yes. If multiple Skills become resolvable at the same time, you can resolve them in any order you want.<br>For example, if you successfully performed a ⟪LIVE⟫ with {{link:LL10-080}} joining, and her [Live Success] Skill becomes resolvable at the same time as this Memory's [Auto] Skills, you can resolve the [Auto] Skills first to draw cards that you can then ⟪ENTER⟫ using {{red:"Mari"}}'s Skill.`,
                },
            ],
        },
        {
            subjects: ["LL14-069"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    key: `explain`,
                    question: `What exactly does "treat [RUSH] as [LIVE], and treat [LIVE] as [RUSH]" mean?`,
                    answer: `Members that originally had [RUSH] will be able to use [LIVE] instead, and Members that originally had [LIVE] will be able to use [RUSH] instead.`,
                },
                {
                    key: `return`,
                    question: `If I perform a ⟪LIVE⟫ without any {{red:"Yoshiko"}} cards joining it, do I still have to return this Memory to my Collection?`,
                    answer: `Yes. No matter whether there are {{red:"Yoshiko"}} cards joining the ⟪LIVE⟫ or not, this Memory must be returned to your Collection. (If there are no {{red:"Yoshiko"}} cards joining, no cards will gain +[COOL][COOL].)`,
                },
                {
                    key: `offstage`,
                    question: `{{link:LL14-055}} was on the Stage, and had her [LIVE] treated as [RUSH] due to this card's [Auto] Skill, but was returned to my Hand or my Deck. After returning, does should the Ability of the {{red:"Yoshiko"}} card be treated as [RUSH] or [LIVE]?`,
                    answer: `Treat it as [LIVE]. This Memory's Skill only affects Members on your Stage, so cards that leave the Stage are not affected anymore.`,
                },
            ],
        },
        {
            subjects: ["LL14-070"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    key: `explain`,
                    question: `What exactly does "replace this Memory with {{red:"Student Council President, Tsuki Watanabe"}} from your Collection" mean?`,
                    answer: `Return this Memory to your Collection, and bring {{link:LL14-073}} from your Collection to your Stage. (You cannot return this Memory without bringing {{red:"Student Council President, Tsuki Watanabe"}} to your Stage, or bring {{red:"Student Council President, Tsuki Watanabe"}} to your Stage without returning this Memory.)`,
                },
                {
                    key: `bonus`,
                    question: `Does this Skill activate if performing a ⟪LIVE⟫ using a Song card which awards something like {{red:"3+1"}} Live Points, like {{link:LL05-056}}?`,
                    answer: `Yes. It will activate if the total of both base and bonus Live Points gained is 4 or more. However, you must meet the conditions to gain the bonus Live Points.`,
                },
                {
                    key: `later`,
                    question: `I successfully performed a ⟪LIVE⟫ using a Song card which awards something like {{red:"3+1"}} Live Points, like {{link:LL05-056}}, but didn't meet the requirement. I then used the [Auto] Skill of {{link:LL14-074}} to meet the requirement of the [While Live] Skill of {{red:"Kimeta yo Hand in Hand"}}. Can I replace this Memory with {{link:LL14-073}} now?`,
                    answer: `Yes. As long as the requirement is met when this card's [Auto] Skill is resolved, you can replace it.`,
                },
            ],
        },
        {
            subjects: ["LL14-071"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `With this Memory on my Stage, I performed a ⟪LIVE⟫ with a card that has a [Live Success] Skill that allows me to perform another ⟪LIVE⟫, like {{link:LL11-063}}. Can I perform ⟪LIVE⟫s with both this card's [Auto] Skill and the [Live Success] Skill of the other card?`,
                    answer: `Yes. You can use both the [Auto] Skill and the [Live Success] Skill to perform a ⟪LIVE⟫ each, in any order you want.`,
                },
            ],
        },
        {
            subjects: ["LL14-072"],
            qa: [
                {
                    question: `With this Memory on my Stage, I performed a ⟪LIVE⟫ with a Song card with an Attribute Piece requirement, and {{link:LL10-060}} joining it, who gained +[COOL] from her [Live Join] Skill. Will this [COOL] also be affected by the [Auto] Skill of this Memory, and be treated as [ALL]?`,
                    answer: `Yes. Any [COOL] that {{red:"Leah"}} cards joining this ⟪LIVE⟫ gain will be treated as [ALL].`,
                },
            ],
        },
        {
            subjects: ["LL14-073"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL14-074"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    key: "later",
                    question: `I performed a ⟪LIVE⟫ with {{link:LL14-067}} with six differently named Members joining. After successfully performing the ⟪LIVE⟫, I used the [Auto] Skill of this card to have additional Members join that ⟪LIVE⟫, so there are nine differently named Members in the Live and the requirement of the [While Live] Skill is met. Will I gain ♪Live Points +1♪?`,
                    answer: `Yes. Even if the requirement of a [While Live] is only met after successfully performing a ⟪LIVE⟫ with that card, it can activate.`,
                },
                {
                    key: `order`,
                    question: `If the [Live Success] Skills of other cards in a ⟪LIVE⟫ use the amount of Members who joined that ⟪LIVE⟫, can I use this Memory's [Auto] Skill first to increase the amount of Members that is counted?`,
                    answer: `Yes. The Members you add to a ⟪LIVE⟫ using this [Auto] Skill count towards Skills that count Members who joined the ⟪LIVE⟫.<br>For example, if you perform a ⟪LIVE⟫ with {{link:LL07-063}}, and you add three more Members with the {{red:"HAPPY PARTY TRAIN"}} Live Costume to the ⟪LIVE⟫ using this card's [Auto] Skill before resolving the Song card's [Live Success] Skill, you can take one more additional turn.`,
                },
                {
                    key: `exactly`,
                    question: `When resolving the [Auto] Skill, can I ⟪ENTER⟫ only one or two Members?`,
                    answer: `No. If you choose to ⟪ENTER⟫ Members, you must always ⟪ENTER⟫ three Members. If you don't have three Members in your Collection that meet the requirement, you cannot ⟪ENTER⟫ Members.`,
                },
            ],
        },
        {
            subjects: [{ from: "LL14-075", to: "LL14-092" }],
            qa: [
                {
                    question: `What does "[Starter][Entry]" mean?`,
                    answer: `You can use this Skill both at the start of the match if you chose this Member as your starting Member, or when ⟪ENTER⟫ing this Member.`,
                },
            ],
        },
    ],
    LL15: [
        {
            subjects: [{ from: "LL15-028", to: "LL15-036" }],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown"],
        },
        {
            subjects: [{ from: "LL15-037", to: "LL15-045" }],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL15-046", "LL15-047"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#group", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL15-048", "LL15-077"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown"],
        },
        {
            subjects: ["LL15-049", "LL15-078"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown", "/faq/general#more_faceup_songs"],
        },
        {
            subjects: ["LL15-050", "LL15-079"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown"],
        },
        {
            subjects: ["LL15-051", "LL15-080"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown", "/faq/general#do_either"],
        },
        {
            subjects: ["LL15-052", "LL15-081"],
            seeAlso: [
                "/faq/general#collection",
                "/faq/general#idolization",
                "/faq/general#member_facedown",
                "/faq/general#do_either",
            ],
        },
        {
            subjects: ["LL15-053", "LL15-082"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL15-054", "LL15-083"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown"],
        },
        {
            subjects: ["LL15-055", "LL15-084"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown", "/faq/general#join_success_order"],
        },
        {
            subjects: ["LL15-056", "LL15-085"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown"],
        },
        {
            subjects: ["LL15-057"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL15-059"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL15-060"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `What exactly does "only one type of Pieces" mean?`,
                    answer: `Members that have only one type of Pieces would be, for example, a Member with [SMILE] x 2 or a Member with [ALL] x 1. They have either only [SMILE] or only [ALL] respectively, so they have "only one type of Pieces".<br>On the other hand, a Member with [SMILE] x 1 and [ALL] x 1, for example, would not could as a Member who has "only one type of Pieces", as there are two different attributes in their Pieces. ([ALL] cannot be used as a wildcard.)`,
                },
            ],
        },
        {
            subjects: ["LL15-061"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#member_counting"],
        },
        {
            subjects: ["LL15-062"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#member_counting"],
            qa: [
                {
                    question: `I performed a ⟪LIVE⟫ with this Song card, and all three members of both {{red:"CYaRon!"}} and {{red:"AZALEA"}} joining it. Does this mean I can draw six cards using the [Live Success] Skill?`,
                    answer: `No. Even if all three members of more than one subunit join the ⟪LIVE⟫, you can only draw three cards.`,
                },
            ],
        },
        {
            subjects: ["LL15-063"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#join_success_order",
                "/faq/general#live_join_pieces",
            ],
        },
        {
            subjects: ["LL15-064"],
            seeAlso: ["/faq/general#idolization"],
        },
        {
            subjects: ["LL15-065"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: [{ from: "LL15-066", to: "LL15-076" }],
            qa: [
                {
                    key: `trigger`,
                    question: `What does "[Starter][Entry]" mean?`,
                    answer: `You can use this Skill both at the start of the match if you chose this Member as your starting Member, or when ⟪ENTER⟫ing this Member.`,
                },
                {
                    key: `order`,
                    question:
                        "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                    answer: "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the first player in the turn order can begin.",
                },
            ],
        },
        {
            subjects: ["LL15-088", "LL15-089", "LL15-090", "LL15-091"],
            qa: [
                {
                    question: `What Attribute does this Song card count as?`,
                    answer: `Treat these cards' Attributes as the same as the corresponding M Rarity card with the same ID.`,
                },
            ],
        },
    ],
    LL16: [
        {
            subjects: ["LL16-046", "LL16-073"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown", "/faq/general#do_either"],
            qa: [
                {
                    key: `youmay`,
                    question: `If I use this [Entry] Skill while the card is Idolized, can I draw cards without performing a ⟪LIVE⟫?`,
                    answer: `Yes. If you are doing both effects, you draw two cards with ①, and then ② allows you to choose whether you want to perform a ⟪LIVE⟫ or not.`,
                },
                {
                    key: `firstturn`,
                    question: `I'm the first player in turn order, and at the start of the match, I used {{link:LL07-064}}'s [Starter] Skill to ⟪ENTER⟫ a {{red:"Chika"}} card. If I ⟪ENTER⟫ this card on my first turn, does the other card meet the "a {{red:"Chika"}} that was ⟪ENTER⟫ed this turn" requirement?`,
                    answer: `No. [Starter] Skills are counted as part of match preparation, before any turns are played, so once your first turn starts, there have been no Members who ⟪ENTER⟫ed that turn.`,
                },
            ],
        },
        {
            subjects: ["LL16-047", "LL16-074"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown"],
            qa: [
                {
                    question: `Do {{red:"Riko"}} cards that have one Piece and Birthday Bonus Piece, like {{link:LL15-011}}, meet the "a {{red:"Riko"}} with exactly one Piece" requirement?`,
                    answer: `The requirement is met if the Birthday Bonus is not active. If the Birthday Bonus is active, the card will have two Pieces, and the requirement is not met.`,
                },
            ],
        },
        {
            subjects: ["LL16-048", "LL16-075"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown", "/faq/general#join_success_order"],
            qa: [
                {
                    question: `I ⟪ENTER⟫ed {{link:LL16-066}}, who has [RUSH/LIVE], and used [RUSH]. Does that card still meet the "a {{red:"Kanan"}} with [LIVE]" requirement?`,
                    answer: `Yes. Even if you used [RUSH] to ⟪ENTER⟫ another Member, the card still has a [LIVE], so the requirement is met.`,
                },
            ],
        },
        {
            subjects: ["LL16-049", "LL16-076"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown"],
            qa: [
                {
                    key: "name",
                    question: "If this card joins a ⟪LIVE⟫ with {{link:LL04-057}}, can I draw two cards?",
                    answer: "No. The Song name is not part of the Skill text, so the requirement is not met.",
                },
                {
                    key: `then`,
                    question: `I don't have any Song cards in my Set List that contains "Aqours" in it's Skill text, but this Member is Idolized. Can I ⟪ENTER⟫ a card from my Hand?`,
                    answer: `No. Since this part of the Skill begins with "Then", the previous requirement must also be met. Even if this Member is Idolized, if there are no Song cards in yout Set List that contain "Aqours" in their Skill text, you cannot ⟪ENTER⟫ a Member.`,
                },
            ],
        },
        {
            subjects: ["LL16-050", "LL16-077"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#idolization", "/faq/general#member_facedown"],
            qa: [
                {
                    key: `any`,
                    question: `If there are multiple Song cards in my Set List whose name matches the name of a Live Costume of one of the Members on my Stage, which one can I perform a ⟪LIVE⟫ with?`,
                    answer: `If there are multiple Song cards that meet the requirement, you can pick whichever one you'd like to use, and perform a ⟪LIVE⟫ with it.`,
                },
                {
                    key: `multiple`,
                    question: `If there is a face-up Song card with multiple names in my Set List, for example {{link:LL02-071}}, can I perform a ⟪LIVE⟫ with it even if the Members on my Stage only have a Live Costume matching with one of those names?`,
                    answer: `Yes. If a face-up Song card has multiple names, the requirement is met if the Live Costume has the same name as either song name.`,
                },
            ],
        },
        {
            subjects: ["LL16-051", "LL16-078"],
            seeAlso: [
                "/faq/general#stand_by",
                "/faq/general#member_counting",
                "/faq/general#idolization",
                "/faq/general#member_facedown",
            ],
            qa: [
                {
                    question: `I'm ⟪ENTER⟫ing this Member while the number of Members on Stand-By on my Stage is even. If I'm using it's [Special Practice] Skill while ⟪ENTER⟫ing this Member, how does the amount of Members change?`,
                    answer: `If you ⟪ENTER⟫ this Member and use it's [Special Practice] Skill, the number of Members on Stand-By does not change. If the amount was even before, it is still even afterwards. (Similarly, an odd amount of Members will remain odd after a [Special Practice] Skill.)`,
                },
            ],
        },
        {
            subjects: ["LL16-052", "LL16-079"],
            seeAlso: ["/faq/general#collection", "/faq/general#idolization", "/faq/general#member_facedown"],
            qa: [
                {
                    question: `Using this Member's [Entry] Skill, can I add a card with [RUSH/LIVE], like {{link:LL16-070}}, to my Hand?`,
                    answer: `Yes. As long as the Member has [RUSH], it doesn't matter whether they also have [LIVE] or not.`,
                },
            ],
        },
        {
            subjects: ["LL16-053", "LL16-080"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown", "/faq/general#join_success_order"],
            qa: [
                {
                    question: `In addition to two Members with only [ALL], one of them being this Member while Idolized, there are other Members who have Pieces other than [ALL] who are joining the same ⟪LIVE⟫. In this case, will this Member still gain +[ALL][ALL]?`,
                    answer: `Yes. As long as there are at least two Members with only [ALL], the requirement is met, no matter what Pieces the other Members who are joining the ⟪LIVE⟫ have.`,
                },
            ],
        },
        {
            subjects: ["LL16-054", "LL16-081"],
            seeAlso: ["/faq/general#idolization", "/faq/general#member_facedown"],
            qa: [
                {
                    key: `order`,
                    question: `After ⟪ENTER⟫ing this Member without Idolizing, I used the [Entry] Skill to ⟪ENTER⟫ the top card of my Deck, which was {{link:LL15-036}}. Can I use that card's [Special Practice] to stack it on top of the this card before returning it to my Hand?`,
                    answer: `No. The order of actions within a Skill must be followed, so you must return this Member to your Hand before you can ⟪ENTER⟫ the top card of my Deck. So, when {{link:LL15-036}} is ⟪ENTER⟫ed, it cannot be stacked on top of this Member, as it has already left the Stage.`,
                },
                {
                    key: `extra`,
                    question: `Do {{red:"Ruby"}} cards that have one Piece and a Birthday Bonus Piece, like {{link:LL15-018}}, or {{red:"Ruby"}} cards that have one Piece and have Idolized Pieces, like {{link:LL15-056}}, meet the "a {{red:"Ruby"}} with exactly one Piece" requirement?`,
                    answer: `In both cases, the requirement is met if the extra Pieces are not active. If the Birthday Bonus is active or the Member is Idolized, the card will have two Pieces, and the requirement is not met.`,
                },
                {
                    key: `firstturn`,
                    question: `I'm the first player in turn order, and at the start of the match, I used {{link:LL07-072}}'s [Starter] Skill to ⟪ENTER⟫ a {{red:"Ruby"}} card with exactly one Piece. If I ⟪ENTER⟫ this card on my first turn, does the other card meet the "a {{red:"Ruby"}} that was ⟪ENTER⟫ed this turn and with exactly one Piece" requirement?`,
                    answer: `No. [Starter] Skills are counted as part of match preparation, before any turns are played, so once your first turn starts, there have been no Members who ⟪ENTER⟫ed that turn.`,
                },
            ],
        },
        {
            subjects: ["LL16-055"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL16-056"],
            seeAlso: ["/faq/general#member_counting", "/faq/general#join_success_order"],
            qa: [
                {
                    question: `If I return a Member without Stars to my Hand while resolving the [Live Success] Skill, can I ⟪ENTER⟫ that Member again?`,
                    answer: `Yes. The actions are resolved in order as written in the Skill text, so the card you are returning to your Hand is available when you can choose which Members from your Hand to ⟪ENTER⟫.`,
                },
            ],
        },
        {
            subjects: ["LL16-057"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#join_success_order",
                "/faq/general#no_shuffle_facedown_song",
            ],
            qa: [
                {
                    question: `While resolving the [Live Success] Skill, the Song card I flipped face-up was {{link:LL12-056}}. Can I draw cards using that Song card's [Auto] Skill before I continue with ⟪ENTER⟫ing a Member from my Hand?`,
                    answer: `No. You can't use another Skill until the current Skill is fully resolved.`,
                },
            ],
        },
        {
            subjects: ["LL16-058"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL16-059"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `When Skills that cause you to treat other Pieces as [ALL], like {{link:LL07-056}} or {{link:LL11-072}}, are active, can I still gain +[ALL][ALL][ALL][ALL] from this card's [Live Join] Skill?`,
                    answer: `No. The [While Live] and [Auto] Skills of the other cards are already in effect when counting Pieces for the [Live Join] Skill.`,
                },
            ],
        },
        {
            subjects: ["LL16-060"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["LL16-061"],
            qa: [
                {
                    question: `Which Song cards are {{red:"Guilty Kiss"}} Song cards?`,
                    answer: `You can find <a href="/search/song/guiltykiss">a list of all {{red:"Guilty Kiss"}} Song cards here</a>.`,
                },
            ],
        },
        {
            subjects: ["LL16-062"],
            qa: [
                {
                    question: `Which Song cards are {{red:"CYaRon!"}} Song cards?`,
                    answer: `You can find <a href="/search/song/cyaron">a list of all {{red:"CYaRon!"}} Song cards here</a>.`,
                },
            ],
        },
        {
            subjects: ["LL16-063"],
            qa: [
                {
                    question: `Which Song cards are {{red:"AZALEA"}} Song cards?`,
                    answer: `You can find <a href="/search/song/azalea">a list of all {{red:"AZALEA"}} Song cards here</a>.`,
                },
            ],
        },
        {
            subjects: ["LL16-082", "LL16-083", "LL16-084", "LL16-085"],
            qa: [
                {
                    question: `What Attribute does this Song card count as?`,
                    answer: `Treat these cards' Attributes as the same as the corresponding M Rarity card with the same ID.`,
                },
            ],
        },
    ],
    LL17: [
        {
            subjects: ["LL17-046", "LL17-076"],
            qa: [
                {
                    question: `When I ⟪ENTER⟫ed this Member and ⟪SCOUT⟫ed, I already had four or more cards in my Hand. Even if I don't draw any cards, can I ⟪ENTER⟫ the top card of my Deck?`,
                    answer: `Yes. Since the number of cards you drew from the ⟪ENTER⟫ was two or less, you can ⟪ENTER⟫ the top card of your Deck.`,
                },
            ],
        },
        {
            subjects: ["LL17-047", "LL17-077"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#collection"],
            qa: [
                {
                    key: `look`,
                    question: `After bringing a face-down Song card to my Collection, am I allowed to look at it to check which Song card it is?`,
                    answer: `Yes. You are allowed to check the cards in your Collection at any time, and you don't have to show it to the other players.`,
                },
                {
                    key: `nofaceup`,
                    question: `If I bring a face-up Song card to my Collection, I will have zero face-up Song cards in my Set List. Can I still perform ⟪LIVE⟫s like that?`,
                    answer: `No. If there are no face-up Song cards in your Set List, you cannot perform ⟪LIVE⟫s. You are not allowed to flip a face-down Song card face-up if you choose a face-up Song card to bring to your Collection. As such, unless you have a Skill that allows you to turn a face-down Song card face-up again, you should avoid removing your last Song card from your Set List.`,
                },
            ],
        },
        {
            subjects: ["LL17-048", "LL17-078"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `How can I use this Member's [Live Join] Skill?`,
                    answer: `You can use this Member's [RUSH] to ⟪ENTER⟫ a Member with [LIVE], or a Member with a Skill that allows you perform a ⟪LIVE⟫, like {{link:EX14-030}}. If you have this Member join that ⟪LIVE⟫, you can activate the [Live Join] Skill.`,
                },
            ],
        },
        {
            subjects: ["LL17-049", "LL17-079"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL17-050", "LL17-080"],
            seeAlso: ["/faq/general#stand_by"],
            qa: [
                {
                    question: `How exactly should I resolve the [Entry] Skill?`,
                    answer: `If you return one other Member on Stand-By on your Stage to the bottom of your Deck, you may ⟪ENTER⟫ a Member, either from your Hand or from the top of your Deck. If that Member you ⟪ENTER⟫ed this way has a Live Costume, draw two cards.`,
                },
            ],
        },
        {
            subjects: ["LL17-051", "LL17-081"],
            qa: [
                {
                    key: `bonus`,
                    question: `Does a card with one Piece and a Birthday Bonus Piece, like {{link:LL15-015}}, meet the "exactly one Piece" requirement?`,
                    answer: `The requirement is met if the Birthday Bonus is not active. If the Birthday Bonus is active, the card will have two Pieces, and the requirement is not met.`,
                },
                {
                    key: `idolizable`,
                    question: `Does a card with one Piece and Idolized Pieces, like {{link:LL16-051}}, meet the "exactly one Piece" requirement?`,
                    answer: `Yes. Members cannot be Idolized while they are in your Hand, so the Idolized Pieces are not active and the requirement is met.`,
                },
            ],
        },
        {
            subjects: ["LL17-052", "LL17-082"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL17-053", "LL17-083"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL17-054", "LL17-084"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `What does "[Entry][Live Success]" mean?`,
                    answer: `You can use this Skill both when ⟪ENTER⟫ing this Member, and when this Member has joined a successful ⟪LIVE⟫.`,
                },
            ],
        },
        {
            subjects: ["LL17-055", { from: "LL17-085", to: "LL17-087" }],
            qa: [
                {
                    question: `A Member with [RUSH/LIVE], like {{link:LL16-064}}, is joining a ⟪LIVE⟫ with this Song card. I chose to use [RUSH] when ⟪ENTER⟫ing that Member, but can it still meet both the "Member with [RUSH]" and the "Member with [LIVE]" requirements?`,
                    answer: `Yes. If a Member has both [RUSH] and [LIVE], the requirements of both Skills are met, and the Any Piece requirement will be reduced by 4 in total. It doesn't matter whether you chose to use [RUSH] or [LIVE] when ⟪ENTER⟫ing that Member.`,
                },
            ],
        },
        {
            subjects: ["LL17-057"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `What does "you may ⟪ENTER⟫ one Member without Stars for each member of {{red:"Saint Snow"}}" mean?`,
                    answer: `You may ⟪ENTER⟫ up to one {{red:"Sarah"}} and up to one {{red:"Leah"}}. That means you can ⟪ENTER⟫ both, or just one, either {{red:"Sarah"}} or {{red:"Leah"}}.`,
                },
            ],
        },
        {
            subjects: ["LL17-058"],
            seeAlso: ["/faq/general#join_success_order"],
        },
        {
            subjects: ["LL17-059"],
            seeAlso: [
                "/faq/general#join_success_order",
                "/faq/general#flip_before_skills",
                "/faq/general#muse_and_aqours_song_cards",
            ],
            qa: [
                {
                    question: `Before using this card's Skill, I flipped a Song card face-down using a Skill like {{link:LL12-048}}'s [Entry] Skill, and separated it from the other face-down Song cards to remember that I know what that card is. Do I have to shuffle that card with the other face-down Song cards when resolving this card's Skill?`,
                    answer: `Yes. You must shuffle all face-down Song cards, including those that were flipped face-down by other Skills.`,
                },
            ],
        },
        {
            subjects: ["LL17-060"],
            qa: [
                {
                    question: `Can the requirement met if Members other than {{red:"Hanamaru"}} and {{red:"Ruby"}} join the ⟪LIVE⟫? Similarly, if other {{red:"Hanamaru"}} or {{red:"Ruby"}} cards that don't have the same amount of Stars join the ⟪LIVE⟫ together with the ones that do, is the requirement met?`,
                    answer: `Yes. In both cases, the requirement can be met. As long as there is a {{red:"Hanamaru"}} card and a {{red:"Ruby"}} card who have the same amount of Stars joining, the Any Piece requirement is reduced by 3, regardless of what other Members join.`,
                },
            ],
        },
        {
            subjects: ["LL17-061"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `Can the requirement be met if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `Yes. As long as there is a {{red:"Kanan"}} card with [COOL] and a {{red:"Mari"}} card with [COOL] joining, the Any Piece requirement is reduced by 3, regardless of what other Members join.`,
                },
            ],
        },
        {
            subjects: ["LL17-062"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    key: `explain`,
                    question: `How exactly should this Skill be resolved?`,
                    answer: `If the {{red:"Riko"}} card and the {{red:"You"}} card joining this ⟪LIVE⟫ do not share any Pieces, the requirement is met.<br>For example, if the {{red:"Riko"}} card has [SMILE][COOL] and the {{red:"You"}} card has [PURE][ALL], the requirement is met.<br>However, if the {{red:"Riko"}} card has [COOL][ALL] and the {{red:"You"}} card has [PURE][ALL], the requirement is not met, as they share [ALL]. You cannot use [ALL] as a wildcard for another Attribute.`,
                },
                {
                    key: `extra`,
                    question: `What if the {{red:"Riko"}} card or the {{red:"You"}} card joining this ⟪LIVE⟫ have Birthday Bonus Pieces or [Idolized] Pieces?`,
                    answer: `In both cases, you must include the extra Pieces in the requirement check if they are active. Otherwise, you can ignore them.`,
                },
            ],
        },
        {
            subjects: ["LL17-063"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"],
            qa: [
                {
                    question: `While resolving the [Live Success] Skill, the Song card I flipped face-up was {{link:LL12-056}}. Can I draw cards using that Song card's [Auto] Skill before I continue with ⟪ENTER⟫ing a Member from my Hand?`,
                    answer: `No. You can't use another Skill until the current Skill is fully resolved.`,
                },
            ],
        },
        {
            subjects: ["LL17-064"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#live_join_pieces"],
        },
        {
            subjects: ["LL17-065"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `Can the requirement be met if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `Yes. As long as there are at least two {{red:"Aqours"}} cards joining, the Any Piece requirement is reduced by 2, even if other Members are part {{red:"µ's"}} or {{red:"Saint Snow"}}.`,
                },
            ],
        },
        {
            subjects: ["LL17-066"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `I am performing a ⟪LIVE⟫ with this Song card, and the Members joining it have [SMILE] x 6 and [ALL] x 1 in total. Does the Any Piece requirement get reduced by 5?`,
                    answer: `No. The Skill of this Song card requires the Members joining the ⟪LIVE⟫ to only have Pieces of one Attribute, [SMILE] [PURE] [COOL] or [ALL]. You cannot use [ALL] as a wildcard for another Attribute.`,
                },
            ],
        },
        {
            subjects: [{ from: "LL17-067", to: "LL17-075" }],
            seeAlso: ["/faq/general#collection"],
            qa: [
                {
                    question: `What does "[Starter][Entry]" mean?`,
                    answer: `You can use this Skill both at the start of the match if you chose this Member as your starting Member, or when ⟪ENTER⟫ing this Member.`,
                },
            ],
        },
    ],
    EX15: [
        {
            subjects: [{ from: "EX15-010", to: "EX15-018" }],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["EX15-019"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `I'm the first player in turn order, and at the start of the match, I used {{link:EX15-037}}'s [Starter] Skill to ⟪ENTER⟫ a card. If I ⟪ENTER⟫ this Member on my first turn, can I perform a ⟪LIVE⟫ using the [Entry] Skill?`,
                    answer: `No. [Starter] Skills are counted as part of match preparation, before any turns are played, so once your first turn starts, there have been no Members who ⟪ENTER⟫ed that turn.`,
                },
            ],
        },
        {
            subjects: ["EX15-020"],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["EX15-021"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting"],
        },
        {
            subjects: ["EX15-022", "EX15-024", "EX15-026", "EX15-027"],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["EX15-023"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `I flipped the top card of my Deck, and it was a Member with an active Birthday Bonus Piece. Can I count that Piece?`,
                    answer: `Yes. If the Birthday Bonus is active, you can count that Piece. If it is not active, the Piece does not count.<br>For example, if the card you flipped is {{link:LL13-005}}, it has two Pieces if the Birthday Bonus is active, and one Piece otherwise.`,
                },
            ],
        },
        {
            subjects: ["EX15-025"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `Can I use the [Entry] Skill if I have only one card left in my Deck?`,
                    answer: `Yes. In case you have only one card in your Deck, you can show that card to everyone and add it to your Hand. The extra effect for having 3 or more Stars in total also still applies, so you can ⟪ENTER⟫ a Member if the one card from your Deck meets the requirement.`,
                },
            ],
        },
        {
            subjects: ["EX15-029"],
            seeAlso: ["/faq/LL02#LL02-056"],
        },
        {
            subjects: ["EX15-030"],
            seeAlso: ["/faq/LL02#LL02-057"],
        },
        {
            subjects: ["EX15-032"],
            seeAlso: ["/faq/LL02#LL02-059"],
        },
        {
            subjects: ["EX15-034"],
            seeAlso: ["/faq/LL02#LL02-061"],
        },
        {
            subjects: ["EX15-036"],
            seeAlso: ["/faq/LL02#LL02-063"],
        },
        {
            subjects: ["EX15-E02"],
            seeAlso: ["/faq/LL03#LL03-065"],
        },
        {
            subjects: ["EX15-E09"],
            seeAlso: ["/faq/LL03#LL03-071"],
        },
        {
            subjects: ["EX15-E10", "EX15-E16"],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["EX15-E11"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What are "Base Live Points"?`,
                    answer: `It refers to the large number in the top right of the Song card. If there are Bonus Live Points, as in "4 + 1", it only refers to the number on the left.`,
                },
            ],
        },
        {
            subjects: ["EX15-E12"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting"],
        },
        {
            subjects: ["EX15-E13"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `If I perform a ⟪LIVE⟫ with this Song card, does this card count as a face-up Song card in my Set List?`,
                    answer: `Yes. Until the ⟪LIVE⟫ has been successfully performed, the Song card remains in the Set List.`,
                },
            ],
        },
        {
            subjects: ["EX15-E14"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting"],
        },
        {
            subjects: ["EX15-E15"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `If I perform a ⟪LIVE⟫ with this Song card, does this card count as a face-up Song card in my Set List?`,
                    answer: `Yes. Until the ⟪LIVE⟫ has been successfully performed, the Song card remains in the Set List.`,
                },
            ],
        },
        {
            subjects: ["EX15-E17"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
            qa: [
                {
                    question: `When resolving the [Live Join] Skill, can I count [ALL] as [PURE]?`,
                    answer: `No. You must have three or more [PURE], not counting [ALL].`,
                },
            ],
        },
        {
            subjects: ["EX15-E18"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
            qa: [
                {
                    question: `When resolving the [Live Join] Skill, can I count [ALL] as [SMILE], [PURE] or [COOL]?`,
                    answer: `No. You must have at least one [SMILE], at least one [PURE], and at least one [COOL], not counting [ALL].`,
                },
            ],
        },
        {
            subjects: [{ from: "EX15-037", to: "EX15-054" }],
            qa: [
                {
                    key: `explain`,
                    question: `What does "[Starter][Entry]" mean?`,
                    answer: `You can use this Skill both at the start of the match if you chose this Member as your starting Member, or when ⟪ENTER⟫ing this Member.`,
                },
                {
                    key: `order`,
                    question:
                        "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                    answer: "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the first player in the turn order can begin.",
                },
            ],
        },
    ],
    other: [
        {
            subjects: ["EX01-033"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: [{ from: "EX04-001", to: "EX04-009" }],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["PR-011"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: ["PR-016", "PR-020", "PR-021"],
            seeAlso: ["/faq/general#more_less"],
        },
        {
            subjects: ["PR-022"],
            seeAlso: ["/faq/general#more_less"],
        },
        {
            subjects: ["PR-032"],
            seeAlso: ["/faq/general#member_counting"],
        },
        {
            subjects: [{ from: "PR-070", to: "PR-078" }],
            seeAlso: ["/faq/general#members_on_stage"],
        },
        {
            subjects: ["PR-106", "PR-111", "PR-114"],
            seeAlso: ["/faq/general#member_counting"],
        },
    ],
};

export const load: PageServerLoad = (async ({ params, locals }) => {
    if (_data.hasOwnProperty(params.faqPage)) {
        return await prepareFaq(await locals.DB, _data[params.faqPage]);
    } else {
        throw error(404, "This FAQ page does not exist.");
    }
}) satisfies PageServerLoad;
