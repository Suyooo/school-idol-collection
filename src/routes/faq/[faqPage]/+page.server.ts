import {error} from "@sveltejs/kit";
import prepareFaq from "../prepareFaq.js";
import type {Faq} from "../prepareFaq.js";
import type {PageServerLoad} from "./$types.js";

export const data: { [key: string]: Faq } = {
    "LL01": [
        {
            subjects: [{from: "LL01-046", to: "LL01-054"}],
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
            seeAlso: ["/faq/general#more_less"]
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
            seeAlso: ["/faq/general#top_deck_card_faceup"]
        },
        {
            subjects: ["LL01-058"],
            seeAlso: ["/faq/general#top_deck_card_faceup"]
        },
        {
            subjects: ["LL01-060"],
            seeAlso: ["/faq/general#more_faceup_songs"]
        },
        {
            subjects: ["LL01-063"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#more_less"]
        },
        {
            subjects: ["LL01-064", "LL01-065", "LL01-072", "LL01-073", "LL01-074"],
            seeAlso: ["/faq/general#member_counting"]
        }
    ],
    "LL02": [
        {
            subjects: [{from: "LL02-046", to: "LL02-054"}],
            qa: [
                {
                    question: "Does this Skill require both of the listed Members to join the ⟪LIVE⟫?",
                    answer: "No. If, for example, {{link:LL02-046}} is joining a ⟪LIVE⟫ with either a {{red:\"Kotori\"}} or {{red:\"Hanayo\"}} card, she will gain +[ALL]."
                }
            ]
        },
        {
            subjects: ["LL02-055"],
            qa: [
                {
                    question: "If I don't have two {{red:\"Honoka\"}} cards in my Hand, can I keep my Hand hidden?",
                    answer: "Yes. Because the Skill says \"You may\", you are not forced to reveal your Hand."
                }
            ]
        },
        {
            subjects: ["LL02-056"],
            seeAlso: ["/faq/general#entry_at_start", "/faq/general#stand_by"],
            qa: [
                {
                    key: "only",
                    question: "If this card is the only {{red:\"Eli\"}} card on Stand-By after ⟪ENTER⟫ing, do I have to return it to my Hand?",
                    answer: "Yes. Return the ⟪ENTER⟫ed Member to your Hand."
                },
                {
                    key: "none",
                    question: "Can I return an {{red:\"Eli\"}} card without Stars to my Hand?",
                    answer: "Yes. You can't draw any cards, but you can return the Member to your Hand."
                }
            ]
        },
        {
            subjects: ["LL02-057"],
            qa: [
                {
                    key: "live",
                    question: "Can I only use this Skill if I perform a ⟪LIVE⟫ using this card's [LIVE] ?",
                    answer: "No. You can use this skill in any ⟪LIVE⟫ this Member is joining."
                },
                {
                    key: "may",
                    question: "Do I have to return a Member to the bottom of my Deck if this card joins a ⟪LIVE⟫?",
                    answer: "No. Because the Skill says \"You may return\", you do not have to return a Member if you already have enough Pieces."
                }
            ]
        },
        {
            subjects: ["LL02-059"],
            qa: [
                {
                    question: "After entering this Member using a {{red:\"Rin\"}} card's [RUSH], I ⟪ENTER⟫ed a card with an [Entry] Skill (such as {{link:LL02-055}}), and I also drew a card. Can I use the card I drew for the ⟪ENTER⟫ed card's Skill?",
                    answer: "Yes. You draw the card before resolving the ⟪ENTER⟫ed card's [Entry] Skill, so you can use that card for it."
                }
            ]
        },
        {
            subjects: ["LL02-060"],
            seeAlso: ["/faq/general#stand_by"],
            qa: [
                {
                    key: "other",
                    question: "Which Members are meant by \"Members other than {{red:\"Maki\"}}\"?",
                    answer: "Any Member whose name is not {{red:\"Maki Nishikino\"}}."
                },
                {
                    key: "rush",
                    question: "If this Member was ⟪ENTER⟫ed using another card's [RUSH], can I return the Member who has [RUSH] to my Hand?",
                    answer: "Yes. That Member is on Stand-By, so you can return it to your Hand. If they are the only Member other than {{red:\"Maki\"}}, you have to return it."
                }
            ]
        },
        {
            subjects: ["LL02-061"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#top_deck_card_faceup"],
            qa: [
                {
                    key: "scout",
                    question: "When I ⟪SCOUT⟫ using this Member's Skill, do I draw the card I flipped face-up?",
                    answer: "Yes. It is still the top card of your Deck, so you should draw it. After drawing it, you can hide the front side again."
                },
                {
                    key: "matchthis",
                    question: "There is no other {{red:\"Nozomi\"}} card on Stand-By besides this card that just ⟪ENTER⟫ed. If I flip over a {{red:\"Nozomi\"}} card using this Skill, can I ⟪SCOUT⟫?",
                    answer: "Yes. The {{red:\"Nozomi\"}} card you just ⟪ENTER⟫ed is on Stand-By, so you can ⟪SCOUT⟫."
                }
            ]
        },
        {
            subjects: ["LL02-062"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#top_deck_card_faceup"],
            qa: [
                {
                    question: "There is was another Member with the same name as the flipped card on Stand-By, and it's not a {{red:\"Hanayo\"}} card. What happens in this case?",
                    answer: "Nothing happens. The flipped card remains face-up on top of your Deck."
                }
            ]
        },
        {
            subjects: ["LL02-063"],
            qa: [
                {
                    question: "If, for example, I perform a ⟪LIVE⟫ with this {{red:\"Nico\"}} card and two {{red:\"Honoka\"}} cards, does this Skill add the extra Piece?",
                    answer: "No. This Skill counts the amount of Member cards, not different Members. In this case, the {{red:\"Nico\"}} card is one of three total Members, so the condition is not met and the Piece is not added."
                }
            ]
        },
        {
            subjects: ["LL02-064"],
            qa: [
                {
                    key: "each",
                    question: "If multiple Lives use this Song card, is the Live Points goal increased for each one?",
                    answer: "Yes. One point is added for each card used."
                },
                {
                    key: "increase_first",
                    question: "I performed a ⟪LIVE⟫ with this Song when the Live Points goal was 9, and hit 9 Live Points. Do I win?",
                    answer: "No. The Live Points goal was increased by one, so you need another point."
                },
                {
                    key: "win",
                    question: "If playing with three or more players, what happens if a Live using this Song card is performed when one of the players already won with 9 Live Points?",
                    answer: "The players who have already won will remain winners. The Live Points goal increases for the remaining players."
                },
                {
                    key: "out",
                    question: "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                    answer: "Yes. [While Live] Skills will be active until the end of the game."
                }
            ]
        },
        {
            subjects: ["LL02-065"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#flip_before_skills"
            ]
        },
        {
            subjects: ["LL02-067"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        },
        {
            subjects: ["LL02-073", "LL02-074", "LL02-075"],
            qa: [
                {
                    question: "The Skill says \"all three\" Members must join this ⟪LIVE⟫ - does that mean I can't use this Skill of this Song card unless I perform the ⟪LIVE⟫ with exactly three Member cards?",
                    answer: "No. As long as at least one card of each mentioned Member is joining, you can use as many Member cards for this ⟪LIVE⟫ as you want."
                }
            ]
        }
    ],
    "LL03": [
        {
            subjects: ["LL03-056"],
            qa: [
                {
                    question: "What are \"Base Live Points\"?",
                    answer: "It refers to the large number in the top right of the Song card. If there are Bonus Live Points, as in \"2 + 1\", it only refers to the number on the left."
                }
            ]
        },
        {
            subjects: ["LL03-057"],
            seeAlso: [
                "/faq/general#join_success_order"
            ]
        },
        {
            subjects: ["LL03-058"],
            qa: [
                {
                    key: "three",
                    question: "When I ⟪ENTER⟫ed this Member, there already were three face-up Song card in my Set List. Can I still ⟪ENTER⟫ the top card of my Deck?",
                    answer: "Yes. No matter whether you flipped cards or not, as long as you meet the Attribute requirement, you can ⟪ENTER⟫ the top card of your deck."
                },
                {
                    key: "flip",
                    question: "There was only one face-up Song card in my Set List when I ⟪ENTER⟫ed this Member. Which Song cards should I flip and how?",
                    answer: "Flip face-down cards one by one until there are three face-up cards.<br>If there are any Song cards that were flipped face-down by another Skill, you can, but don't have to choose them.<br>After you have flipped your first card, you may choose your second card after seeing which Song card you just turned over."
                }
            ]
        },
        {
            subjects: ["LL03-061"],
            qa: [
                {
                    question: "Which Members are meant by \"other Members\"?",
                    answer: "Any card that is not this one. For example, you may use this Member's Skill to give +[ALL][ALL] to any other {{red:\"Nozomi\"}} card, including another {{link:LL03-061}}."
                }
            ]
        },
        {
            subjects: ["LL03-062"],
            qa: [
                {
                    question: "If this Skill's requirement is not met, but there's a Member with three Stars joining the same ⟪LIVE⟫, will this card gain +[ALL][ALL]?",
                    answer: "No. At the time the [Live Join] Skill is resolved, there are no Members in Lives with three or more Stars, so this card will not gain +[ALL][ALL]."
                }
            ]
        },
        {
            subjects: ["LL03-065"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        },
        {
            subjects: ["LL03-066"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#flip_before_skills"
            ]
        },
        {
            subjects: ["LL03-068"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        },
        {
            subjects: ["LL03-071"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        },
        {
            subjects: ["LL03-072", "LL03-073", "LL03-074"],
            qa: [
                {
                    question: "Are the Skill requirements for these Song cards only met if all three Members of the unit join?",
                    answer: "No. It is not neccessary for all three to be there. For example, if you perform a ⟪LIVE⟫ with {{link:LL03-072}} with only {{red:\"Honoka\"}} cards, the Any Piece requirement is still reduced by 3."
                }
            ]
        }
    ],
    "LL04": [
        {
            subjects: [{from: "LL04-037", to: "LL04-045"}],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: "When counting \"differently named {{red:\"Aqours\"}} Members\", should I count the card that has this Skill, too?",
                    answer: "Yes. They count as well."
                }
            ]
        },
        {
            subjects: ["LL04-046"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#member_counting", "/faq/general#more_less"],
            qa: [
                {
                    question: "At the time I ⟪ENTER⟫ed this Member, there were eight other Members on Stand-By. Can I ⟪SCOUT⟫using this Skill?",
                    answer: "No. This Member counts as well, so there are nine Members on Stand-By and the Skill's condition is not met."
                }
            ]
        },
        {
            subjects: ["LL04-047"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#join_success_order"],
            qa: [
                {
                    question: "If two or more of this card join a ⟪LIVE⟫, can I flip further Song cards?",
                    answer: "Yes. For example, if two of this {{red:\"Riko\"}} card join a ⟪LIVE⟫, you can, together with the one Song card you flip from performing a ⟪LIVE⟫ by default, flip a total of three cards."
                }
            ]
        },
        {
            subjects: ["LL04-048"],
            qa: [
                {
                    question: "The card I returned from my Hand to the bottom of my Deck to use the [Entry] Skill was the last card in my Hand. Can I still choose the ⟪ENTER⟫ option?",
                    answer: "Yes. As long as you return a card to the bottom of your Deck, you can choose either.<br>If you don't have any cards in your Hand, you can't ⟪ENTER⟫ a card from your Hand, which means you can't do anything when picking that option."
                }
            ]
        },
        {
            subjects: ["LL04-049"],
            qa: [
                {
                    question: "What happens if the top card of the Deck is flipped face-up, or the Deck is empty?",
                    answer: "Even if the card is visible to them, the next player must \"guess\" whether it has Stars or not, then use the effect corresponding to the answer.<br>If your Deck is empty, you cannot use this Skill."
                }
            ]
        },
        {
            subjects: ["LL04-050"],
            seeAlso: [
                "/faq/general#skill_order_same_skill"
            ]
        },
        {
            subjects: ["LL04-051"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        },
        {
            subjects: ["LL04-052"],
            qa: [
                {
                    question: "Can the other players choose to not draw a card?",
                    answer: "No. You always draw three cards, and the other players always draw one card each."
                }
            ]
        },
        {
            subjects: ["LL04-060"],
            seeAlso: [
                "/faq/general#join_success_order"
            ]
        },
        {
            subjects: ["LL04-061"],
            qa: [
                {
                    key: "member",
                    question: "Is the draw limit increased by one even if I ⟪SCOUT⟫ using a Skill like the one of {{link:LL04-046}} ?",
                    answer: "Yes. Even if you use a Skill to do so, ⟪SCOUT⟫ing will always get +1 extra card. Note that Skills such as \"Draw X cards\" are not ⟪SCOUT⟫s, so you cannot draw extra cards."
                },
                {
                    key: "out",
                    question: "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                    answer: "Yes. [While Live] Skills will be active until the end of the game."
                }
            ]
        },
        {
            subjects: ["LL04-062"],
            qa: [
                {
                    question: "{{link:LL04-053}} is joining this ⟪LIVE⟫, after I chose to use [RUSH] when I ⟪ENTER⟫ed her. Will she still gain +[ALL] from this Song card's Skill?",
                    answer: "Yes. She has a [LIVE] icon, so she will gain +[ALL]."
                }
            ]
        },
        {
            subjects: ["LL04-064"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#flip_before_skills"
            ]
        },
        {
            subjects: ["LL04-065"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: "The Members joining this ⟪LIVE⟫ have 3x [SMILE] and 1x [ALL] in total. Will the requirement be reduced to 2?",
                    answer: "No. This Skill requires four or more Pieces of one of the Attribute types [SMILE], [PURE], [COOL] or [ALL]. You cannot count [ALL] as a Piece of an Attribute of your choice."
                }
            ]
        }
    ],
    "LL05": [
        {
            subjects: ["LL05-046"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#skill_order_same_skill"],
            qa: [
                {
                    question: "There are three conditions and effects each, can I use multiple effects of the [Entry] Skill if the respective conditions are met?",
                    answer: "Yes. For example, if you have no cards in your Hand and no Song cards used for Lives when this card is ⟪ENTER⟫ed, you may both draw three cards and perform a ⟪LIVE⟫ with this card."
                }
            ]
        },
        {
            subjects: ["LL05-047"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "other",
                    question: "On the turn after this card was ⟪ENTER⟫ed, another {{link:LL05-047}} was ⟪ENTER⟫ed. Can this card join a ⟪LIVE⟫ in my next turn?",
                    answer: "Yes. The [Entry] Skills are handled seperately for each card, so the first card can join a ⟪LIVE⟫. However, the second {{red:\"Riko\"}} will not be able to join yet in that turn."
                },
                {
                    key: "live",
                    question: "I used this card's [RUSH] to ⟪ENTER⟫ another Member with [LIVE]. Can I perform a ⟪LIVE⟫?",
                    answer: "Yes. This card cannot join the ⟪LIVE⟫ due to the Skill, but you can still perform ⟪LIVE⟫s using other Members' [LIVE]."
                }
            ]
        },
        {
            subjects: ["LL05-048"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#stand_by"],
            qa: [
                {
                    question: "I ⟪ENTER⟫ed this card using the [RUSH] from the [RUSH]/[LIVE] of {{link:LL04-053}}. In this case, can I perform a ⟪LIVE⟫ with those two cards?",
                    answer: "Yes. The {{red:\"Mari\"}} card has a [LIVE] icon, so you can use this card's Skill to perform a ⟪LIVE⟫."
                }
            ]
        },
        {
            subjects: ["LL05-049"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "both",
                    question: "If both Skill's requirements are met, does this card get both Pieces?",
                    answer: "Yes. In that case, you will get two Pieces, one from each Skill."
                },
                {
                    key: "name",
                    question: "If this card joins a ⟪LIVE⟫ with {{link:LL04-057}} as the Song card, does it get +[ALL] from the second Skill?",
                    answer: "No. The Song title is not part of the Skill text, so the requirement for the second Skill is not met."
                }
            ]
        },
        {
            subjects: ["LL05-050"],
            seeAlso: [
                "/faq/general#stand_by"
            ]
        },
        {
            subjects: ["LL05-051"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#stand_by"
            ]
        },
        {
            subjects: ["LL05-052"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "rush",
                    question: "If this card is ⟪ENTER⟫ed using a [RUSH], can I use it's own [RUSH] in addition to it's [On Entry] Skill?",
                    answer: "No. You can only use one [RUSH] per turn, so you cannot use this card's [RUSH]."
                },
                {
                    key: "icon",
                    question: "Using this card's [On Entry] Skill, I ⟪ENTER⟫ed another {{link:LL05-052}}. Does this count as being ⟪ENTER⟫ed using [RUSH]?",
                    answer: "No. The Skill requires this card to have been ⟪ENTER⟫ed as the direct result of a [RUSH]. It does not depend on whether the card you used to ⟪ENTER⟫ this card has a [RUSH] icon or not."
                }
            ]
        },
        {
            subjects: ["LL05-053"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: "Can Pieces gained through [Live Join] Skills be used for this Skill's requirement?<br>For example, could {{link:LL05-039}} be used as not only the Member for [PURE], but also for [SMILE] or [COOL] if her Skill is activated?",
                    answer: "Yes. If their requirements are met, Pieces gained through [Live Join] Skills can be used for this Skill's requirement."
                }
            ]
        },
        {
            subjects: ["LL05-054"],
            qa: [
                {
                    question: "I ⟪ENTER⟫ed this card through {{link:LL04-054}}'s Skill. In that case, since {{link:LL04-054}} is placed at the bottom of the deck, can I ⟪ENTER⟫ it by choosing to show the bottom card of my deck with this card's Skill?",
                    answer: "Yes. {{link:LL04-054}} is at the bottom of the Deck at the time the [Entry] Skill is resolved, so you can ⟪ENTER⟫ it from there."
                }
            ]
        },
        {
            subjects: ["LL05-056"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        },
        {
            subjects: ["LL05-057"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        },
        {
            subjects: ["LL05-059"],
            qa: [
                {
                    question: "We have counted the number of differently named Members on our Stages, but there's a tie between players for the lowest number. What happens in that case?",
                    answer: "The Skill resolves without anyone drawing cards."
                }
            ]
        },
        {
            subjects: ["LL05-060"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        },
        {
            subjects: ["LL05-061"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        }
    ],
    "LL06": [
        {
            subjects: [{from: "LL06-028", to: "LL06-036"}],
            seeAlso: [
                "/faq/general#members_on_stage"
            ]
        },
        {
            subjects: ["LL06-046"],
            qa: [
                {
                    key: "one",
                    question: "When I ⟪ENTER⟫ed this card, I only had one card in my Hand. I want to empty my Hand, so can I return only one card to the bottom my Deck?",
                    answer: "No. You cannot return only one card."
                },
                {
                    key: "empty",
                    question: "When I ⟪ENTER⟫ed this card, my Deck was empty. Can I use this Skill to ⟪ENTER⟫ one of the cards I returned?",
                    answer: "Yes. In that case, you ⟪ENTER⟫ the upper card of the two cards you returned."
                }
            ]
        },
        {
            subjects: ["LL06-047"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: "What does \"If the face-up Song cards in your Set List have two or more different Attributes\" mean?",
                    answer: "Count how many different colors the face-up Song cards in your Set List have (Red/Smile, Green/Pure, Blue/Cool, Yellow/Neutral). If there are two or more, the requirement is met.<br>For example, if you have {{link:EX03-028}}, {{link:LL04-064}} and {{link:LL06-058}} in your Set List, since their attributes are Pure / Neutral / Neutral, you have two different Attributes."
                }
            ]
        },
        {
            subjects: ["LL06-048"],
            qa: [
                {
                    question: "What happens if I ⟪ENTER⟫ this card with less than three cards in my Deck?",
                    answer: "If you have two cards in your Deck, show those two cards, pick one of them to add to your Hand, and return the other to the bottom of your Deck.<br>If the card you returned was a {{red:\"Kanan\"}} card, you can ⟪ENTER⟫ a {{red:\"Kanan\"}} card with [LIVE] from your Hand.<br>If you have only one card in your Deck, you can show it and add it to your Hand. However, since you can't return a card to your Deck, you cannot ⟪ENTER⟫ a {{red:\"Kanan\"}} card with [LIVE] from your Hand. (Also, you cannot choose not to add a card to your Hand.)<br>If your Deck is empty, nothing happens."
                }
            ]
        },
        {
            subjects: ["LL06-049"],
            qa: [
                {
                    question: "Does the \"⟪ENTER⟫ed from your Hand\" requirement also count ⟪ENTER⟫ing using [RUSH] and ⟪ENTER⟫ ing using Skills such as {{link:LL04-048}} ?",
                    answer: "Yes. The requirement is not only met if you pick ⟪ENTER⟫ as your turn action, but also if you use a [RUSH] or a Skill to ⟪ENTER⟫ this card."
                }
            ]
        },
        {
            subjects: ["LL06-050"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#skill_order_same_skill"],
            qa: [
                {
                    key: "count",
                    question: "What does \"three or more different Live Costumes\" mean?",
                    answer: "Count how many different Live Costumes your Member cards have (in the lower left).<br>For example, if you have Member cards with the Live Costumes {{red:\"Aozora Jumping Heart\"}}, {{red:\"Aozora Jumping Heart\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}} and {{red:\"Koi ni Naritai AQUARIUM\"}}, you have three different Live Costumes."
                },
                {
                    key: "live",
                    question: "If I perform a ⟪LIVE⟫ using this card's Skill, do the {{red:\"You\"}} cards I counted for the requirement have to join?",
                    answer: "No. They do not have to join the ⟪LIVE⟫."
                },
                {
                    key: "order",
                    question: "Not all of my Members on my Stage are {{red:\"You\"}} cards, but the {{red:\"You\"}} cards have three or more different Live Costumes. Can I use this Skill to perform a ⟪LIVE⟫?",
                    answer: "No. If the first part of the requirement is not met, you cannot use the second part of the Skill past the \"Then...\"."
                }
            ]
        },
        {
            subjects: ["LL06-051"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#member_counting"],
            qa: [
                {
                    key: "skip",
                    question: "What does \"skipped a turn\" or \"haven't skipped a turn\" mean?",
                    answer: "You might have to skip a turn due to some Skills (such as {{link:LL01-071}} and {{link:LL04-051}}). If you were affects by such a Skill at least once in this match, you have \"skipped a turn\". Otherwise, if you haven't had a Skill like that affect you in this match so far, you \"haven't skipped a turn\"."
                },
                {
                    key: "intent",
                    question: "Can I intentionally skip a turn by not choosing an action on my turn?",
                    answer: "No. You must either ⟪SCOUT⟫, ⟪ENTER⟫ a card or perform a ⟪LIVE⟫."
                }
            ]
        },
        {
            subjects: ["LL06-052"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: "If two or more of this card join the same ⟪LIVE⟫, can I treat their Pieces as [ALL], too?",
                    answer: "Yes. Their Skills will affect each other's [SMILE], so this results in treating all Pieces of all {{red:\"Hanamaru\"}} cards as [ALL]."
                }
            ]
        },
        {
            subjects: ["LL06-053"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#top_deck_card_faceup",
                "/faq/general#join_success_order"
            ]
        },
        {
            subjects: ["LL06-054"],
            qa: [
                {
                    key: "skills",
                    question: "Does the \"⟪ENTER⟫ed from your Deck\" requirement also count ⟪ENTER⟫ing using Skills such as {{link:LL04-054}} ?",
                    answer: "Yes. The requirement is not only met if you pick ⟪ENTER⟫ as your turn action, but also if you use a Skill to ⟪ENTER⟫ this card."
                },
                {
                    key: "sameturn",
                    question: "If I ⟪ENTER⟫ this card using a {{red:\"Ruby\"}} card's Skill, can the card I ⟪ENTER⟫ from my Hand be one of the cards I drew from the first part of the Skill?",
                    answer: "Yes. The drawn cards can be ⟪ENTER⟫ed."
                }
            ]
        },
        {
            subjects: ["LL06-058"],
            seeAlso: ["/faq/general#flip_before_skills"],
            qa: [
                {
                    key: "lowest",
                    question: "What does \"Member with the lowest number of cards in this ⟪LIVE⟫\" mean?",
                    answer: "Count how many cards of each differently named Member you have used for this ⟪LIVE⟫.<br>For example, if there are three {{red:\"Chika\"}} cards, two {{red:\"You\"}} cards, and one {{red:\"Riko\"}} card joining a ⟪LIVE⟫, {{red:\"Riko\"}} is the Member with the lowest number of cards in this ⟪LIVE⟫."
                },
                {
                    key: "none",
                    question: "When choosing a \"Member with the lowest number of cards in this ⟪LIVE⟫\", can I pick a Member with no cards in this ⟪LIVE⟫?",
                    answer: "No. You cannot choose a Member who didn't join the ⟪LIVE⟫ at all."
                },
                {
                    key: "tie",
                    question: "If there are multiple Members who meet the \"Member with the lowest number of cards in this ⟪LIVE⟫\" requirement, can I pick and ⟪ENTER⟫ cards for each of them?",
                    answer: "No. You must choose one of the tied Members. You cannot ⟪ENTER⟫ cards of the other Members."
                }
            ]
        },
        {
            subjects: ["LL06-059"],
            qa: [
                {
                    key: "two",
                    question: "In a two-player game, can the second player use this Skill?",
                    answer: "Yes. No matter how many people are playing in the match, the requirement is met for whoever is the last to take their turn."
                },
                {
                    key: "move",
                    question: "There are three players in the match, and the third player in the turn order won. Can the second player now use this Skill?",
                    answer: "No. Only the order as it was decided during setup counts, so the player who is last in the turn order doesn't change."
                }
            ]
        },
        {
            subjects: ["LL06-061"],
            seeAlso: [
                "/faq/general#no_shuffle_facedown_song",
                "/faq/general#join_success_order"
            ]
        },
        {
            subjects: ["LL06-062"],
            seeAlso: [
                "/faq/general#join_success_order"
            ]
        }
    ],
    "LL07": [
        {
            subjects: [{from: "LL07-037", to: "LL07-045"}],
            seeAlso: [
                "/faq/general#stand_by"
            ]
        },
        {
            subjects: ["LL07-046"],
            qa: [
                {
                    question: "What happens if I ⟪ENTER⟫ this card with less than three cards in my Deck?",
                    answer: "Even if you have less than three cards in your Deck, you can add one Member without Stars to your Hand and return the rest to the bottom of your Deck. However, even if all of them have no Stars, you cannot take another turn, as the requirement for that effect calls for \"three cards without Stars\" to be shown."
                }
            ]
        },
        {
            subjects: ["LL07-047"],
            qa: [
                {
                    question: "If I only have one face-up Song card in my Set List, can I flip one face-down Song card face-up?",
                    answer: "Yes. The \"all your face-up Song cards have the same Attribute\" requirement is met in this case, so you can flip one face-down Song card face-up."
                }
            ]
        },
        {
            subjects: ["LL07-048"],
            qa: [
                {
                    key: "same",
                    question: "What does \"Member with the same Pieces\" mean?",
                    answer: "It means a Member who has the exact same number including Piece attributes as another Member. The order of Pieces does not matter, so if you ⟪ENTER⟫ed a Member with [SMILE][PURE], you can ⟪ENTER⟫ another Member with [PURE][SMILE]."
                },
                {
                    key: "bday",
                    question: "If I ⟪ENTER⟫ {{link:LL06-008}} with the Birthday Bonus active using this card's Skill, can I ⟪ENTER⟫ {{link:LL07-051}} from my Hand?",
                    answer: "Yes. When the Birthday Bonus is active, the bonus Pieces are added to that card, so in this example, you can ⟪ENTER⟫ {{link:LL07-051}}."
                }
            ]
        },
        {
            subjects: ["LL07-049"],
            qa: [
                {
                    question: "Can I choose not to draw a card if the designated player decides to let everyone draw cards?",
                    answer: "No. If they decided to have everyone draw cards, all players must draw a card."
                }
            ]
        },
        {
            subjects: ["LL07-050"],
            qa: [
                {
                    question: "When I ⟪ENTER⟫ed this card, my Deck was empty. Can I use this Skill to ⟪ENTER⟫ the card I returned?",
                    answer: "Yes. Since it's the only card you can look at from your Deck, you will only be to ⟪ENTER⟫ the card your returned to your Deck."
                }
            ]
        },
        {
            subjects: ["LL07-052"],
            seeAlso: ["/faq/general#more_less", "/faq/general#join_success_order"],
            qa: [
                {
                    question: "In a two-player match, both players have the same amount of cards in their Hand. What happens in case there are two or more of this Member participating in a ⟪LIVE⟫?",
                    answer: "The first {{red:\"Hanamaru\"}} 's Skill will result in the player drawing a card. After that, when the Skills of the other {{red:\"Hanamaru\"}} cards are resolved, the player will have more cards in their Hand than the other player, so the cards will gain +[ALL]."
                }
            ]
        },
        {
            subjects: ["LL07-053"],
            qa: [
                {
                    key: "hand",
                    question: "If a Member doesn't have [ALL], but has a Skill such as [Live Join] that allows them to gain [ALL], can I use this card's Skill to ⟪ENTER⟫ them?",
                    answer: "No. Skills such as [Live Join] will only be resolved at that time, so when the card is still in your Hand, it does not have [ALL]."
                },
                {
                    key: "idolize",
                    question: "The Member I ⟪ENTER⟫ed using this card's Skill has a [Special Practice] Skill, and after being Idolized, they have three or more [ALL]. Can I draw three cards in this case?",
                    answer: "Yes. This [Entry] Skill counts the number of Pieces after the Member was ⟪ENTER⟫ed. If a Member is Idolized through a [Special Practice] Skill, [Idolized (Piece Bonus)] will be active when the card appears on the Stage, so including those, the Member has three or more [ALL] and the requirement is met."
                }
            ]
        },
        {
            subjects: ["LL07-055"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#flip_before_skills"],
            qa: [
                {
                    key: "end",
                    question: "With this ⟪LIVE⟫, I've reached the Live Points target. If the Skill Requirement is met, can I still perform another ⟪LIVE⟫?",
                    answer: "No. When they reach the Live Points target, the winner is removed from the rest of the match, so they cannot perform a ⟪LIVE⟫."
                },
                {
                    key: "other",
                    question: "What happens if non- {{red:\"CYaRon!\"}} Members are participating in this ⟪LIVE⟫?",
                    answer: "As long as {{red:\"Chika\"}}, {{red:\"You\"}} and {{red:\"Ruby\"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating."
                }
            ]
        },
        {
            subjects: ["LL07-056"],
            qa: [
                {
                    key: "noall",
                    question: "{{link:LL05-053}} is joining a ⟪LIVE⟫ with this Song card while this card's Skill requirement is met. There are also members with [SMILE], [PURE] and [COOL]. Will the {{red:\"Mari\"}} card gain +[ALL] from it's [Live Join] Skill?",
                    answer: "No. The Skill of this Song card changes all [SMILE][PURE][COOL] of the Members joining this ⟪LIVE⟫ into [ALL] before [Live Join] Skills are resolved. That means that in this case, {{red:\"Mari\"}} does not gain +[ALL]."
                },
                {
                    key: "later",
                    question: "A member who joined a ⟪LIVE⟫ with this Song card gained +[SMILE] through a [Live Join] Skill. If the requirement for this card's Skill is met, does that Piece also become [ALL] ?",
                    answer: "Yes. Pieces gained through Skills become [ALL], too."
                },
                {
                    key: "other",
                    question: "What happens if non- {{red:\"AZALEA\"}} Members are participating in this ⟪LIVE⟫?",
                    answer: "As long as {{red:\"Kanan\"}}, {{red:\"Dia\"}} and {{red:\"Hanamaru\"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating."
                }
            ]
        },
        {
            subjects: ["LL07-057"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"],
            qa: [
                {
                    key: "each",
                    question: "What does \"⟪ENTER⟫ one Member of each Member of {{red:\"Guilty Kiss\"}} \" mean?",
                    answer: "It means that you may ⟪ENTER⟫ up to one {{red:\"Riko\"}}, one {{red:\"Yoshiko\"}}, and one {{red:\"Mari\"}}. That means you can for example ⟪ENTER⟫ three Members, one of each, or ⟪ENTER⟫ only a {{red:\"Riko\"}} and a {{red:\"Yoshiko\"}} card."
                },
                {
                    key: "other",
                    question: "What happens if non- {{red:\"Guilty Kiss\"}} Members are participating in this ⟪LIVE⟫?",
                    answer: "As long as {{red:\"Riko\"}}, {{red:\"Yoshiko\"}} and {{red:\"Mari\"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating."
                }
            ]
        },
        {
            subjects: ["LL07-058"],
            seeAlso: ["/faq/general#members_on_stage"]
        },
        {
            subjects: ["LL07-059"],
            qa: [
                {
                    key: "each",
                    question: "If multiple Lives use this Song card, is the Live Points goal increased for each one?",
                    answer: "Yes. One point is added for each card used."
                },
                {
                    key: "increase_first",
                    question: "I performed a ⟪LIVE⟫ with this Song when the Live Points goal was 9, and hit 9 Live Points. Do I win?",
                    answer: "No. The Live Points goal was increased by one, so you need another point."
                },
                {
                    key: "win",
                    question: "If playing with three or more players, what happens if a Live using this Song card is performed when one of the players already won with 9 Live Points?",
                    answer: "The players who have already won will remain winners. The Live Points goal increases for the remaining players."
                },
                {
                    key: "out",
                    question: "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                    answer: "Yes. [While Live] Skills will be active until the end of the game."
                }
            ]
        },
        {
            subjects: ["LL07-062"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting"]
        },
        {
            subjects: ["LL07-063"],
            seeAlso: ["/faq/general#member_counting"]
        },
        {
            subjects: [{from: "LL07-064", to: "LL07-081"}],
            qa: [
                {
                    question: "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                    answer: "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the first player in the turn order can begin."
                }
            ]
        }
    ],
    "LL08": [
        {
            subjects: ["LL08-046"],
            qa: [
                {
                    question: `If I ⟪ENTER⟫ this card with three or more Live Points, am I forced to perform a ⟪LIVE⟫?`,
                    answer: `No. Since that option says "you may", you don't have to perform a ⟪LIVE⟫. However, you must draw cards.`
                }
            ]
        },
        {
            subjects: ["LL08-047"],
            qa: [
                {
                    question: `What does "For each different Attribute of the face-up Song cards in your Set List" mean?`,
                    answer: `The Attribute of a Song card refers to the background color of the card. There are four colors: Red (Smile), Green (Pure), Blue (Cool) and Yellow (Neutral).<br>For example, if you have {{link:LL08-055}} and {{link:LL08-058}} face-up in your Set List, there's one Neutral and one Smile Song card, so you draw two cards.`
                }
            ]
        },
        {
            subjects: ["LL08-048"],
            seeAlso: ["/faq/general#member_counting", "/faq/general#join_success_order", "/faq/general#flip_before_skills"]
        },
        {
            subjects: ["LL08-049"],
            qa: [
                {
                    question: `How exactly should this Skill be resolved?`,
                    answer: `Starting from the next player in turn order, every player may choose whether to call Dia "Dia-chan". The player after them can make their choice after hearing what the previous player decided on. Once everyone chose, you can resolve the Skill, choosing the effect based on whether everyone called Dia "Dia-chan".`
                }
            ]
        },
        {
            subjects: ["LL08-050"],
            seeAlso: ["/faq/general#join_success_order"]
        },
        {
            subjects: ["LL08-051"],
            qa: [
                {
                    key: "win",
                    question: `What does "treat the loss as a win" mean?`,
                    answer: `You can change the result of the rock-paper-scissors match to a win for you. That means you can take another turn, because you now meet the "if you win" requirement.`
                },
                {
                    key: "less",
                    question: `If I don't have three cards in my hand, can I still treat the loss as a win if I return all the cards in my Hand to the bottom of my Deck?`,
                    answer: `No. If you can't return three cards from your Hand to your Deck, you can't meet the requirement to change the loss to a win. (You must either return three cards to your Deck or none at all.)`
                }
            ]
        },
        {
            subjects: ["LL08-052"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `If I have both no cards in my Hand and no Song cards used in Lives, does this cards still gain +[SMILE]?`,
                    answer: `Yes. If either requirement is met, this card gains +[SMILE], so meeting both requirements is fine. However, even if both requirements are met, the card will not gain +[SMILE][SMILE].`
                }
            ]
        },
        {
            subjects: ["LL08-053"],
            seeAlso: ["/faq/general#more_faceup_songs", "/faq/general#no_shuffle_facedown_song"],
            qa: [
                {
                    question: `If I turn a face-up Song card face-down, I will have zero face-up Song cards in my Set List. Can I still perform ⟪LIVE⟫s like that?`,
                    answer: `No. If there are no face-up Song cards in your Set List, you cannot perform ⟪LIVE⟫s. As such, unless you have a Skill that allows you to turn a face-down Song card face-up again, you should avoid flipping your last Song card face-down.`
                }
            ]
        },
        {
            subjects: ["LL08-054"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What does "if the Members on your Stage have three or more different Live Costumes" mean?`,
                    answer: `Count the number of different Live Costumes, shown in the bottom left of the Member cards. For example, if you have five cards with the Live Costumes {{red:"Aozora Jumping Heart"}}, {{red:"Aozora Jumping Heart"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} and {{red:"Koi ni Naritai AQUARIUM"}}, you have three different Live Costumes.`
                }
            ]
        },
        {
            subjects: ["LL08-056"],
            qa: [
                {
                    question: `Using {{link:LL05-047}}'s [RUSH], I entered a Member with [LIVE]. ({{red:"Riko"}} cannot join a ⟪LIVE⟫ this turn.) If I perform a ⟪LIVE⟫ with {{red:"Yuuki wa Doko ni? Kimi no Mune ni!"}} in this situation and have every Member on my Stage except for {{red:"Riko"}} join, can I still meet this Skill's requirement?`,
                    answer: `No. Regardless of whether Members are blocked from joining ⟪LIVE⟫ or not, if there are Members on Stage who are not joining the ⟪LIVE⟫, the Skill does not activate.`
                }
            ]
        },
        {
            subjects: ["LL08-057"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `What does "exactly three Members, {{red:"Riko"}}, {{red:"Hanamaru"}} and {{red:"Mari"}}" mean?`,
                    answer: `If one {{red:"Riko"}} card, one {{red:"Hanamaru"}} card and one {{red:"Mari"}} card join this ⟪LIVE⟫, the requirement is met. If a Member with a name other than those three joins, or one of those three does not join, or two or more cards with the same name join, the Skill will not activate.`
                }
            ]
        },
        {
            subjects: ["LL08-058"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Dia"}} card with [SMILE] and a {{red:"Ruby"}} card with [SMILE] joining, the Any Piece requirement is reduced by three, regardless of what other members join.`
                }
            ]
        },
        {
            subjects: ["LL08-059"],
            qa: [
                {
                    question: `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"You"}} card with a Live Costume and a {{red:"Yoshiko"}} with a Live Costume joining, the Any Piece requirement is reduced by three, regardless of what other Members join.`
                }
            ]
        },
        {
            subjects: ["LL08-060"],
            qa: [
                {
                    question: `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `As long as there is a "Chika" card with [RUSH] or [LIVE] and a "Kanan" card with [RUSH] or [LIVE] joining, the Any Piece requirement is reduced by three, regardless of what other Members join.`
                }
            ]
        },
        {
            subjects: [{from: "LL08-064", to: "LL08-081"}],
            qa: [
                {
                    question: "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                    answer: "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the first player in the turn order can begin."
                }
            ]
        }
    ]
};

export const load: PageServerLoad = (async ({params, locals}) => {
    if (data.hasOwnProperty(params.faqPage)) {
        return await prepareFaq(locals.DB, data[params.faqPage]);
    } else {
        error(404, "This FAQ page does not exist.");
    }
}) satisfies PageServerLoad;