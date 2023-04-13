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
                }, {
                    key: "other",
                    question: `Does the condition for {{link:LL01-046}}'s Skill include cards other than this "Honoka" card?`,
                    answer: `No. It means all {{red:"Honoka"}} cards are excluded. She only gains +[ALL] if a {{red:"Kotori"}} or {{red:"Umi"}} card joins the same ⟪LIVE⟫. No other joining Members have an effect.`
                }
            ]
        }, {
            subjects: ["LL01-055"],
            seeAlso: ["/faq/general#more_less"]
        }, {
            subjects: ["LL01-056"],
            qa: [
                {
                    question: `Does this Skill activate if performing a ⟪LIVE⟫ using a Song card which awards {{red:"3+1"}} Live Points?`,
                    answer: `Yes. It will activate if the total of both base and bonus Live Points gained is 4 or more. However, you must meet the conditions to gain the bonus Live Points.`
                }
            ]
        }, {
            subjects: ["LL01-057"],
            seeAlso: ["/faq/general#top_deck_card_faceup"]
        }, {
            subjects: ["LL01-060"],
            seeAlso: ["/faq/general#more_faceup_songs"]
        }, {
            subjects: ["LL01-063"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#more_less"]
        }, {
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
        }, {
            subjects: ["LL02-055"],
            qa: [
                {
                    question: "If I don't have two {{red:\"Honoka\"}} cards in my Hand, can I keep my Hand hidden?",
                    answer: "Yes. Because the Skill says \"You may\", you are not forced to reveal your Hand."
                }
            ]
        }, {
            subjects: ["LL02-056"],
            seeAlso: ["/faq/general#entry_at_start", "/faq/general#stand_by"],
            qa: [
                {
                    key: "only",
                    question: "If this card is the only {{red:\"Eli\"}} card on Stand-By after ⟪ENTER⟫ing, do I have to return it to my Hand?",
                    answer: "Yes. Return the ⟪ENTER⟫ed Member to your Hand."
                }, {
                    key: "none",
                    question: "Can I return an {{red:\"Eli\"}} card without Stars to my Hand?",
                    answer: "Yes. You can't draw any cards, but you can return the Member to your Hand."
                }
            ]
        }, {
            subjects: ["LL02-057"],
            qa: [
                {
                    key: "live",
                    question: "Can I only use this Skill if I perform a ⟪LIVE⟫ using this card's [LIVE] ?",
                    answer: "No. You can use this skill in any ⟪LIVE⟫ this Member is joining."
                }, {
                    key: "may",
                    question: "Do I have to return a Member to the bottom of my Deck if this card joins a ⟪LIVE⟫?",
                    answer: "No. Because the Skill says \"You may return\", you do not have to return a Member if you already have enough Pieces."
                }
            ]
        }, {
            subjects: ["LL02-059"],
            qa: [
                {
                    question: "After entering this Member using a {{red:\"Rin\"}} card's [RUSH], I ⟪ENTER⟫ed a card with an [Entry] Skill (such as {{link:LL02-055}}), and I also drew a card. Can I use the card I drew for the ⟪ENTER⟫ed card's Skill?",
                    answer: "Yes. You draw the card before resolving the ⟪ENTER⟫ed card's [Entry] Skill, so you can use that card for it."
                }
            ]
        }, {
            subjects: ["LL02-060"],
            seeAlso: ["/faq/general#stand_by"],
            qa: [
                {
                    key: "other",
                    question: "Which Members are meant by \"Members other than {{red:\"Maki\"}}\"?",
                    answer: "Any Member whose name is not {{red:\"Maki Nishikino\"}}."
                }, {
                    key: "rush",
                    question: "If this Member was ⟪ENTER⟫ed using another card's [RUSH], can I return the Member who has [RUSH] to my Hand?",
                    answer: "Yes. That Member is on Stand-By, so you can return it to your Hand. If they are the only Member other than {{red:\"Maki\"}}, you have to return it."
                }
            ]
        }, {
            subjects: ["LL02-061"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#top_deck_card_faceup"],
            qa: [
                {
                    key: "scout",
                    question: "When I ⟪SCOUT⟫ using this Member's Skill, do I draw the card I flipped face-up?",
                    answer: "Yes. It is still the top card of your Deck, so you should draw it. After drawing it, you can hide the front side again."
                }, {
                    key: "matchthis",
                    question: "There is no other {{red:\"Nozomi\"}} card on Stand-By besides this card that just ⟪ENTER⟫ed. If I flip over a {{red:\"Nozomi\"}} card using this Skill, can I ⟪SCOUT⟫?",
                    answer: "Yes. The {{red:\"Nozomi\"}} card you just ⟪ENTER⟫ed is on Stand-By, so you can ⟪SCOUT⟫."
                }
            ]
        }, {
            subjects: ["LL02-062"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#top_deck_card_faceup"],
            qa: [
                {
                    question: "There is was another Member with the same name as the flipped card on Stand-By, and it's not a {{red:\"Hanayo\"}} card. What happens in this case?",
                    answer: "Nothing happens. The flipped card remains face-up on top of your Deck."
                }
            ]
        }, {
            subjects: ["LL02-063"],
            qa: [
                {
                    question: "If, for example, I perform a ⟪LIVE⟫ with this {{red:\"Nico\"}} card and two {{red:\"Honoka\"}} cards, does this Skill add the extra Piece?",
                    answer: "No. This Skill counts the amount of Member cards, not different Members. In this case, the {{red:\"Nico\"}} card is one of three total Members, so the condition is not met and the Piece is not added."
                }
            ]
        }, {
            subjects: ["LL02-064"],
            qa: [
                {
                    key: "each",
                    question: "If multiple Lives use this Song card, is the Live Points goal increased for each one?",
                    answer: "Yes. One point is added for each card used."
                }, {
                    key: "increase_first",
                    question: "I performed a ⟪LIVE⟫ with this Song when the Live Points goal was 9, and hit 9 Live Points. Do I win?",
                    answer: "No. The Live Points goal was increased by one, so you need another point."
                }, {
                    key: "win",
                    question: "If playing with three or more players, what happens if a Live using this Song card is performed when one of the players already won with 9 Live Points?",
                    answer: "The players who have already won will remain winners. The Live Points goal increases for the remaining players."
                }, {
                    key: "out",
                    question: "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                    answer: "Yes. [While Live] Skills will be active until the end of the game."
                }
            ]
        }, {
            subjects: ["LL02-065"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#flip_before_skills"
            ]
        }, {
            subjects: ["LL02-067"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        }, {
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
        }, {
            subjects: ["LL03-057"],
            seeAlso: [
                "/faq/general#join_success_order"
            ]
        }, {
            subjects: ["LL03-058"],
            qa: [
                {
                    key: "three",
                    question: "When I ⟪ENTER⟫ed this Member, there already were three face-up Song card in my Set List. Can I still ⟪ENTER⟫ the top card of my Deck?",
                    answer: "Yes. No matter whether you flipped cards or not, as long as you meet the Attribute requirement, you can ⟪ENTER⟫ the top card of your deck."
                }, {
                    key: "flip",
                    question: "There was only one face-up Song card in my Set List when I ⟪ENTER⟫ed this Member. Which Song cards should I flip and how?",
                    answer: "Flip face-down cards one by one until there are three face-up cards.<br>If there are any Song cards that were flipped face-down by another Skill, you can, but don't have to choose them.<br>After you have flipped your first card, you may choose your second card after seeing which Song card you just turned over."
                }
            ]
        }, {
            subjects: ["LL03-061"],
            qa: [
                {
                    question: "Which Members are meant by \"other Members\"?",
                    answer: "Any card that is not this one. For example, you may use this Member's Skill to give +[ALL][ALL] to any other {{red:\"Nozomi\"}} card, including another {{link:LL03-061}}."
                }
            ]
        }, {
            subjects: ["LL03-062"],
            qa: [
                {
                    question: "If this Skill's requirement is not met, but there's a Member with three Stars joining the same ⟪LIVE⟫, will this card gain +[ALL][ALL]?",
                    answer: "No. At the time the [Live Join] Skill is resolved, there are no Members in Lives with three or more Stars, so this card will not gain +[ALL][ALL]."
                }
            ]
        }, {
            subjects: ["LL03-065"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        }, {
            subjects: ["LL03-066"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#flip_before_skills"
            ]
        }, {
            subjects: ["LL03-068"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        }, {
            subjects: ["LL03-071"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        }, {
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
        }, {
            subjects: ["LL04-046"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#member_counting", "/faq/general#more_less"],
            qa: [
                {
                    question: "At the time I ⟪ENTER⟫ed this Member, there were eight other Members on Stand-By. Can I ⟪SCOUT⟫using this Skill?",
                    answer: "No. This Member counts as well, so there are nine Members on Stand-By and the Skill's condition is not met."
                }
            ]
        }, {
            subjects: ["LL04-047"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#join_success_order"],
            qa: [
                {
                    question: "If two or more of this card join a ⟪LIVE⟫, can I flip further Song cards?",
                    answer: "Yes. For example, if two of this {{red:\"Riko\"}} card join a ⟪LIVE⟫, you can, together with the one Song card you flip from performing a ⟪LIVE⟫ by default, flip a total of three cards."
                }
            ]
        }, {
            subjects: ["LL04-048"],
            qa: [
                {
                    question: "The card I returned from my Hand to the bottom of my Deck to use the [Entry] Skill was the last card in my Hand. Can I still choose the ⟪ENTER⟫ option?",
                    answer: "Yes. As long as you return a card to the bottom of your Deck, you can choose either.<br>If you don't have any cards in your Hand, you can't ⟪ENTER⟫ a card from your Hand, which means you can't do anything when picking that option."
                }
            ]
        }, {
            subjects: ["LL04-049"],
            qa: [
                {
                    question: "What happens if the top card of the Deck is flipped face-up, or the Deck is empty?",
                    answer: "Even if the card is visible to them, the next player must \"guess\" whether it has Stars or not, then use the effect corresponding to the answer.<br>If your Deck is empty, you cannot use this Skill."
                }
            ]
        }, {
            subjects: ["LL04-050"],
            seeAlso: [
                "/faq/general#skill_order_same_skill"
            ]
        }, {
            subjects: ["LL04-051"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        }, {
            subjects: ["LL04-052"],
            qa: [
                {
                    question: "Can the other players choose to not draw a card?",
                    answer: "No. You always draw three cards, and the other players always draw one card each."
                }
            ]
        }, {
            subjects: ["LL04-060"],
            seeAlso: [
                "/faq/general#join_success_order"
            ]
        }, {
            subjects: ["LL04-061"],
            qa: [
                {
                    key: "member",
                    question: "Is the draw limit increased by one even if I ⟪SCOUT⟫ using a Skill like the one of {{link:LL04-046}}?",
                    answer: "Yes. Even if you use a Skill to do so, ⟪SCOUT⟫ing will always get +1 extra card. Note that Skills such as \"Draw X cards\" are not ⟪SCOUT⟫s, so you cannot draw extra cards."
                }, {
                    key: "out",
                    question: "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                    answer: "Yes. [While Live] Skills will be active until the end of the game."
                }
            ]
        }, {
            subjects: ["LL04-062"],
            qa: [
                {
                    question: "{{link:LL04-053}} is joining this ⟪LIVE⟫, after I chose to use [RUSH] when I ⟪ENTER⟫ed her. Will she still gain +[ALL] from this Song card's Skill?",
                    answer: "Yes. She has a [LIVE] icon, so she will gain +[ALL]."
                }
            ]
        }, {
            subjects: ["LL04-064"],
            seeAlso: [
                "/faq/general#member_counting",
                "/faq/general#flip_before_skills"
            ]
        }, {
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
        }, {
            subjects: ["LL05-047"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "other",
                    question: "On the turn after this card was ⟪ENTER⟫ed, another {{link:LL05-047}} was ⟪ENTER⟫ed. Can this card join a ⟪LIVE⟫ in my next turn?",
                    answer: "Yes. The [Entry] Skills are handled seperately for each card, so the first card can join a ⟪LIVE⟫. However, the second {{red:\"Riko\"}} will not be able to join yet in that turn."
                }, {
                    key: "live",
                    question: "I used this card's [RUSH] to ⟪ENTER⟫ another Member with [LIVE]. Can I perform a ⟪LIVE⟫?",
                    answer: "Yes. This card cannot join the ⟪LIVE⟫ due to the Skill, but you can still perform ⟪LIVE⟫s using other Members' [LIVE]."
                }
            ]
        }, {
            subjects: ["LL05-048"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#stand_by"],
            qa: [
                {
                    question: "I ⟪ENTER⟫ed this card using the [RUSH] from the [RUSH]/[LIVE] of {{link:LL04-053}}. In this case, can I perform a ⟪LIVE⟫ with those two cards?",
                    answer: "Yes. The {{red:\"Mari\"}} card has a [LIVE] icon, so you can use this card's Skill to perform a ⟪LIVE⟫."
                }
            ]
        }, {
            subjects: ["LL05-049"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "both",
                    question: "If both Skill's requirements are met, does this card get both Pieces?",
                    answer: "Yes. In that case, you will get two Pieces, one from each Skill."
                }, {
                    key: "name",
                    question: "If this card joins a ⟪LIVE⟫ with {{link:LL04-057}}, does it get +[ALL] from the second Skill?",
                    answer: "No. The Song title is not part of the Skill text, so the requirement for the second Skill is not met."
                }
            ]
        }, {
            subjects: ["LL05-050"],
            seeAlso: [
                "/faq/general#stand_by"
            ]
        }, {
            subjects: ["LL05-051"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#stand_by"
            ]
        }, {
            subjects: ["LL05-052"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "rush",
                    question: "If this card is ⟪ENTER⟫ed using a [RUSH], can I use it's own [RUSH] in addition to it's [On Entry] Skill?",
                    answer: "No. You can only use one [RUSH] per turn, so you cannot use this card's [RUSH]."
                }, {
                    key: "icon",
                    question: "Using this card's [On Entry] Skill, I ⟪ENTER⟫ed another {{link:LL05-052}}. Does this count as being ⟪ENTER⟫ed using [RUSH]?",
                    answer: "No. The Skill requires this card to have been ⟪ENTER⟫ed as the direct result of a [RUSH]. It does not depend on whether the card you used to ⟪ENTER⟫ this card has a [RUSH] icon or not."
                }
            ]
        }, {
            subjects: ["LL05-053"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: "Can Pieces gained through [Live Join] Skills be used for this Skill's requirement?<br>For example, could {{link:LL05-039}} be used as not only the Member for [PURE], but also for [SMILE] or [COOL] if her Skill is activated?",
                    answer: "Yes. If their requirements are met, Pieces gained through [Live Join] Skills can be used for this Skill's requirement."
                }
            ]
        }, {
            subjects: ["LL05-054"],
            qa: [
                {
                    question: "I ⟪ENTER⟫ed this card through {{link:LL04-054}}'s Skill. In that case, since {{link:LL04-054}} is placed at the bottom of the deck, can I ⟪ENTER⟫ it by choosing to show the bottom card of my deck with this card's Skill?",
                    answer: "Yes. {{link:LL04-054}} is at the bottom of the Deck at the time the [Entry] Skill is resolved, so you can ⟪ENTER⟫ it from there."
                }
            ]
        }, {
            subjects: ["LL05-056"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        }, {
            subjects: ["LL05-057"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        }, {
            subjects: ["LL05-059"],
            qa: [
                {
                    question: "We have counted the number of differently named Members on our Stages, but there's a tie between players for the lowest number. What happens in that case?",
                    answer: "The Skill resolves without anyone drawing cards."
                }
            ]
        }, {
            subjects: ["LL05-060"],
            seeAlso: [
                "/faq/general#member_counting"
            ]
        }, {
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
        }, {
            subjects: ["LL06-046"],
            qa: [
                {
                    key: "one",
                    question: "When I ⟪ENTER⟫ed this card, I only had one card in my Hand. I want to empty my Hand, so can I return only one card to the bottom my Deck?",
                    answer: "No. You cannot return only one card."
                }, {
                    key: "empty",
                    question: "When I ⟪ENTER⟫ed this card, my Deck was empty. Can I use this Skill to ⟪ENTER⟫ one of the cards I returned?",
                    answer: "Yes. In that case, you ⟪ENTER⟫ the upper card of the two cards you returned."
                }
            ]
        }, {
            subjects: ["LL06-047"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: "What does \"If the face-up Song cards in your Set List have two or more different Attributes\" mean?",
                    answer: "Count how many different colors the face-up Song cards in your Set List have (Red/Smile, Green/Pure, Blue/Cool, Yellow/Neutral). If there are two or more, the requirement is met.<br>For example, if you have {{link:EX03-028}}, {{link:LL04-064}} and {{link:LL06-058}} in your Set List, since their attributes are Pure / Neutral / Neutral, you have two different Attributes."
                }
            ]
        }, {
            subjects: ["LL06-048"],
            qa: [
                {
                    question: "What happens if I ⟪ENTER⟫ this card with less than three cards in my Deck?",
                    answer: "If you have two cards in your Deck, show those two cards, pick one of them to add to your Hand, and return the other to the bottom of your Deck.<br>If the card you returned was a {{red:\"Kanan\"}} card, you can ⟪ENTER⟫ a {{red:\"Kanan\"}} card with [LIVE] from your Hand.<br>If you have only one card in your Deck, you can show it and add it to your Hand. However, since you can't return a card to your Deck, you cannot ⟪ENTER⟫ a {{red:\"Kanan\"}} card with [LIVE] from your Hand. (Also, you cannot choose not to add a card to your Hand.)<br>If your Deck is empty, nothing happens."
                }
            ]
        }, {
            subjects: ["LL06-049"],
            qa: [
                {
                    question: "Does the \"⟪ENTER⟫ed from your Hand\" requirement also count ⟪ENTER⟫ing using [RUSH] and ⟪ENTER⟫ ing using Skills such as {{link:LL04-048}}?",
                    answer: "Yes. The requirement is not only met if you pick ⟪ENTER⟫ as your turn action, but also if you use a [RUSH] or a Skill to ⟪ENTER⟫ this card."
                }
            ]
        }, {
            subjects: ["LL06-050"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#skill_order_same_skill"],
            qa: [
                {
                    key: "count",
                    question: "What does \"three or more different Live Costumes\" mean?",
                    answer: "Count how many different Live Costumes your Member cards have (in the lower left).<br>For example, if you have Member cards with the Live Costumes {{red:\"Aozora Jumping Heart\"}}, {{red:\"Aozora Jumping Heart\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}} and {{red:\"Koi ni Naritai AQUARIUM\"}}, you have three different Live Costumes."
                }, {
                    key: "live",
                    question: "If I perform a ⟪LIVE⟫ using this card's Skill, do the {{red:\"You\"}} cards I counted for the requirement have to join?",
                    answer: "No. They do not have to join the ⟪LIVE⟫."
                }, {
                    key: "order",
                    question: "Not all of my Members on my Stage are {{red:\"You\"}} cards, but the {{red:\"You\"}} cards have three or more different Live Costumes. Can I use this Skill to perform a ⟪LIVE⟫?",
                    answer: "No. If the first part of the requirement is not met, you cannot use the second part of the Skill past the \"Then...\"."
                }
            ]
        }, {
            subjects: ["LL06-051"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#member_counting"],
            qa: [
                {
                    key: "skip",
                    question: "What does \"skipped a turn\" or \"haven't skipped a turn\" mean?",
                    answer: "You might have to skip a turn due to some Skills (such as {{link:LL01-071}} and {{link:LL04-051}}). If you were affects by such a Skill at least once in this match, you have \"skipped a turn\". Otherwise, if you haven't had a Skill like that affect you in this match so far, you \"haven't skipped a turn\"."
                }, {
                    key: "intent",
                    question: "Can I intentionally skip a turn by not choosing an action on my turn?",
                    answer: "No. You must either ⟪SCOUT⟫, ⟪ENTER⟫ a card or perform a ⟪LIVE⟫."
                }
            ]
        }, {
            subjects: ["LL06-052"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: "If two or more of this card join the same ⟪LIVE⟫, can I treat their Pieces as [ALL], too?",
                    answer: "Yes. Their Skills will affect each other's [SMILE], so this results in treating all Pieces of all {{red:\"Hanamaru\"}} cards as [ALL]."
                }
            ]
        }, {
            subjects: ["LL06-053"],
            seeAlso: [
                "/faq/general#skill_order_multiple_skills",
                "/faq/general#top_deck_card_faceup",
                "/faq/general#join_success_order"
            ]
        }, {
            subjects: ["LL06-054"],
            qa: [
                {
                    key: "skills",
                    question: "Does the \"⟪ENTER⟫ed from your Deck\" requirement also count ⟪ENTER⟫ing using Skills such as {{link:LL04-054}}?",
                    answer: "Yes. The requirement is not only met if you pick ⟪ENTER⟫ as your turn action, but also if you use a Skill to ⟪ENTER⟫ this card."
                }, {
                    key: "sameturn",
                    question: "If I ⟪ENTER⟫ this card using a {{red:\"Ruby\"}} card's Skill, can the card I ⟪ENTER⟫ from my Hand be one of the cards I drew from the first part of the Skill?",
                    answer: "Yes. The drawn cards can be ⟪ENTER⟫ed."
                }
            ]
        }, {
            subjects: ["LL06-058"],
            seeAlso: ["/faq/general#flip_before_skills"],
            qa: [
                {
                    key: "lowest",
                    question: "What does \"Member with the lowest number of cards in this ⟪LIVE⟫\" mean?",
                    answer: "Count how many cards of each differently named Member you have used for this ⟪LIVE⟫.<br>For example, if there are three {{red:\"Chika\"}} cards, two {{red:\"You\"}} cards, and one {{red:\"Riko\"}} card joining a ⟪LIVE⟫, {{red:\"Riko\"}} is the Member with the lowest number of cards in this ⟪LIVE⟫."
                }, {
                    key: "none",
                    question: "When choosing a \"Member with the lowest number of cards in this ⟪LIVE⟫\", can I pick a Member with no cards in this ⟪LIVE⟫?",
                    answer: "No. You cannot choose a Member who didn't join the ⟪LIVE⟫ at all."
                }, {
                    key: "tie",
                    question: "If there are multiple Members who meet the \"Member with the lowest number of cards in this ⟪LIVE⟫\" requirement, can I pick and ⟪ENTER⟫ cards for each of them?",
                    answer: "No. You must choose one of the tied Members. You cannot ⟪ENTER⟫ cards of the other Members."
                }
            ]
        }, {
            subjects: ["LL06-059"],
            qa: [
                {
                    key: "two",
                    question: "In a two-player game, can the second player use this Skill?",
                    answer: "Yes. No matter how many people are playing in the match, the requirement is met for whoever is the last to take their turn."
                }, {
                    key: "move",
                    question: "There are three players in the match, and the third player in the turn order won. Can the second player now use this Skill?",
                    answer: "No. Only the order as it was decided during setup counts, so the player who is last in the turn order doesn't change."
                }
            ]
        }, {
            subjects: ["LL06-061"],
            seeAlso: [
                "/faq/general#no_shuffle_facedown_song",
                "/faq/general#join_success_order"
            ]
        }, {
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
        }, {
            subjects: ["LL07-046"],
            qa: [
                {
                    question: "What happens if I ⟪ENTER⟫ this card with less than three cards in my Deck?",
                    answer: "Even if you have less than three cards in your Deck, you can add one Member without Stars to your Hand and return the rest to the bottom of your Deck. However, even if all of them have no Stars, you cannot take another turn, as the requirement for that effect calls for \"three cards without Stars\" to be shown."
                }
            ]
        }, {
            subjects: ["LL07-047"],
            qa: [
                {
                    question: "If I only have one face-up Song card in my Set List, can I flip one face-down Song card face-up?",
                    answer: "Yes. The \"all your face-up Song cards have the same Attribute\" requirement is met in this case, so you can flip one face-down Song card face-up."
                }
            ]
        }, {
            subjects: ["LL07-048"],
            qa: [
                {
                    key: "same",
                    question: "What does \"Member with the same Pieces\" mean?",
                    answer: "It means a Member who has the exact same number including Piece attributes as another Member. The order of Pieces does not matter, so if you ⟪ENTER⟫ed a Member with [SMILE][PURE], you can ⟪ENTER⟫ another Member with [PURE][SMILE]."
                }, {
                    key: "bday",
                    question: "If I ⟪ENTER⟫ {{link:LL06-008}} with the Birthday Bonus active using this card's Skill, can I ⟪ENTER⟫ {{link:LL07-051}} from my Hand?",
                    answer: "Yes. When the Birthday Bonus is active, the bonus Pieces are added to that card, so in this example, you can ⟪ENTER⟫ {{link:LL07-051}}."
                }
            ]
        }, {
            subjects: ["LL07-049"],
            qa: [
                {
                    question: "Can I choose not to draw a card if the designated player decides to let everyone draw cards?",
                    answer: "No. If they decided to have everyone draw cards, all players must draw a card."
                }
            ]
        }, {
            subjects: ["LL07-050"],
            qa: [
                {
                    question: "When I ⟪ENTER⟫ed this card, my Deck was empty. Can I use this Skill to ⟪ENTER⟫ the card I returned?",
                    answer: "Yes. Since it's the only card you can look at from your Deck, you will only be to ⟪ENTER⟫ the card your returned to your Deck."
                }
            ]
        }, {
            subjects: ["LL07-052"],
            seeAlso: ["/faq/general#more_less", "/faq/general#join_success_order"],
            qa: [
                {
                    question: "In a two-player match, both players have the same amount of cards in their Hand. What happens in case there are two or more of this Member participating in a ⟪LIVE⟫?",
                    answer: "The first {{red:\"Hanamaru\"}} 's Skill will result in the player drawing a card. After that, when the Skills of the other {{red:\"Hanamaru\"}} cards are resolved, the player will have more cards in their Hand than the other player, so the cards will gain +[ALL]."
                }
            ]
        }, {
            subjects: ["LL07-053"],
            qa: [
                {
                    key: "hand",
                    question: "If a Member doesn't have [ALL], but has a Skill such as [Live Join] that allows them to gain [ALL], can I use this card's Skill to ⟪ENTER⟫ them?",
                    answer: "No. Skills such as [Live Join] will only be resolved at that time, so when the card is still in your Hand, it does not have [ALL]."
                }, {
                    key: "idolize",
                    question: "The Member I ⟪ENTER⟫ed using this card's Skill has a [Special Practice] Skill, and after being Idolized, they have three or more [ALL]. Can I draw three cards in this case?",
                    answer: "Yes. This [Entry] Skill counts the number of Pieces after the Member was ⟪ENTER⟫ed. If a Member is Idolized through a [Special Practice] Skill, [Idolized (Piece Bonus)] will be active when the card appears on the Stage, so including those, the Member has three or more [ALL] and the requirement is met."
                }
            ]
        }, {
            subjects: ["LL07-055"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#flip_before_skills"],
            qa: [
                {
                    key: "end",
                    question: "With this ⟪LIVE⟫, I've reached the Live Points target. If the Skill Requirement is met, can I still perform another ⟪LIVE⟫?",
                    answer: "No. When they reach the Live Points target, the winner is removed from the rest of the match, so they cannot perform a ⟪LIVE⟫."
                }, {
                    key: "other",
                    question: "What happens if non-{{red:\"CYaRon!\"}} Members are participating in this ⟪LIVE⟫?",
                    answer: "As long as {{red:\"Chika\"}}, {{red:\"You\"}} and {{red:\"Ruby\"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating."
                }
            ]
        }, {
            subjects: ["LL07-056"],
            qa: [
                {
                    key: "noall",
                    question: "{{link:LL05-053}} is joining a ⟪LIVE⟫ with this Song card while this card's Skill requirement is met. There are also members with [SMILE], [PURE] and [COOL]. Will the {{red:\"Mari\"}} card gain +[ALL] from it's [Live Join] Skill?",
                    answer: "No. The Skill of this Song card changes all [SMILE][PURE][COOL] of the Members joining this ⟪LIVE⟫ into [ALL] before [Live Join] Skills are resolved. That means that in this case, {{red:\"Mari\"}} does not gain +[ALL]."
                }, {
                    key: "later",
                    question: "A member who joined a ⟪LIVE⟫ with this Song card gained +[SMILE] through a [Live Join] Skill. If the requirement for this card's Skill is met, does that Piece also become [ALL] ?",
                    answer: "Yes. Pieces gained through Skills become [ALL], too."
                }, {
                    key: "other",
                    question: "What happens if non-{{red:\"AZALEA\"}} Members are participating in this ⟪LIVE⟫?",
                    answer: "As long as {{red:\"Kanan\"}}, {{red:\"Dia\"}} and {{red:\"Hanamaru\"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating."
                }
            ]
        }, {
            subjects: ["LL07-057"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"],
            qa: [
                {
                    key: "each",
                    question: "What does \"⟪ENTER⟫ one Member of each Member of {{red:\"Guilty Kiss\"}} \" mean?",
                    answer: "It means that you may ⟪ENTER⟫ up to one {{red:\"Riko\"}}, one {{red:\"Yoshiko\"}}, and one {{red:\"Mari\"}}. That means you can for example ⟪ENTER⟫ three Members, one of each, or ⟪ENTER⟫ only a {{red:\"Riko\"}} and a {{red:\"Yoshiko\"}} card."
                }, {
                    key: "other",
                    question: "What happens if non-{{red:\"Guilty Kiss\"}} Members are participating in this ⟪LIVE⟫?",
                    answer: "As long as {{red:\"Riko\"}}, {{red:\"Yoshiko\"}} and {{red:\"Mari\"}} have joined this ⟪LIVE⟫, the Skill can be used no matter what other Members are participating."
                }
            ]
        }, {
            subjects: ["LL07-058"],
            seeAlso: ["/faq/general#members_on_stage"]
        }, {
            subjects: ["LL07-059"],
            qa: [
                {
                    key: "each",
                    question: "If multiple Lives use this Song card, is the Live Points goal increased for each one?",
                    answer: "Yes. One point is added for each card used."
                }, {
                    key: "increase_first",
                    question: "I performed a ⟪LIVE⟫ with this Song when the Live Points goal was 9, and hit 9 Live Points. Do I win?",
                    answer: "No. The Live Points goal was increased by one, so you need another point."
                }, {
                    key: "win",
                    question: "If playing with three or more players, what happens if a Live using this Song card is performed when one of the players already won with 9 Live Points?",
                    answer: "The players who have already won will remain winners. The Live Points goal increases for the remaining players."
                }, {
                    key: "out",
                    question: "The player who used this Song card for a Live has won. Is the [While Live] Skill still active after that?",
                    answer: "Yes. [While Live] Skills will be active until the end of the game."
                }
            ]
        }, {
            subjects: ["LL07-062"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting"]
        }, {
            subjects: ["LL07-063"],
            seeAlso: ["/faq/general#member_counting"]
        }, {
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
        }, {
            subjects: ["LL08-047"],
            qa: [
                {
                    question: `What does "For each different Attribute of the face-up Song cards in your Set List" mean?`,
                    answer: `The Attribute of a Song card refers to the background color of the card. There are four colors: Red (Smile), Green (Pure), Blue (Cool) and Yellow (Neutral).<br>For example, if you have {{link:LL08-055}} and {{link:LL08-058}} face-up in your Set List, there's one Neutral and one Smile Song card, so you draw two cards.`
                }
            ]
        }, {
            subjects: ["LL08-048"],
            seeAlso: ["/faq/general#member_counting", "/faq/general#join_success_order", "/faq/general#flip_before_skills"]
        }, {
            subjects: ["LL08-049"],
            qa: [
                {
                    question: `How exactly should this Skill be resolved?`,
                    answer: `Starting from the next player in turn order, every player may choose whether to call Dia "Dia-chan". The player after them can make their choice after hearing what the previous player decided on. Once everyone chose, you can resolve the Skill, choosing the effect based on whether everyone called Dia "Dia-chan".`
                }
            ]
        }, {
            subjects: ["LL08-050"],
            seeAlso: ["/faq/general#join_success_order"]
        }, {
            subjects: ["LL08-051"],
            qa: [
                {
                    key: "win",
                    question: `What does "treat the loss as a win" mean?`,
                    answer: `You can change the result of the rock-paper-scissors match to a win for you. That means you can take another turn, because you now meet the "if you win" requirement.`
                }, {
                    key: "less",
                    question: `If I don't have three cards in my hand, can I still treat the loss as a win if I return all the cards in my Hand to the bottom of my Deck?`,
                    answer: `No. If you can't return three cards from your Hand to your Deck, you can't meet the requirement to change the loss to a win. (You must either return three cards to your Deck or none at all.)`
                }
            ]
        }, {
            subjects: ["LL08-052"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `If I have both no cards in my Hand and no Song cards used in Lives, does this cards still gain +[SMILE]?`,
                    answer: `Yes. If either requirement is met, this card gains +[SMILE], so meeting both requirements is fine. However, even if both requirements are met, the card will not gain +[SMILE][SMILE].`
                }
            ]
        }, {
            subjects: ["LL08-053"],
            seeAlso: ["/faq/general#more_faceup_songs", "/faq/general#no_shuffle_facedown_song"],
            qa: [
                {
                    question: `If I turn a face-up Song card face-down, I will have zero face-up Song cards in my Set List. Can I still perform ⟪LIVE⟫s like that?`,
                    answer: `No. If there are no face-up Song cards in your Set List, you cannot perform ⟪LIVE⟫s. As such, unless you have a Skill that allows you to turn a face-down Song card face-up again, you should avoid flipping your last Song card face-down.`
                }
            ]
        }, {
            subjects: ["LL08-054"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What does "if the Members on your Stage have three or more different Live Costumes" mean?`,
                    answer: `Count the number of different Live Costumes, shown in the bottom left of the Member cards. For example, if you have five cards with the Live Costumes {{red:"Aozora Jumping Heart"}}, {{red:"Aozora Jumping Heart"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} and {{red:"Koi ni Naritai AQUARIUM"}}, you have three different Live Costumes.`
                }
            ]
        }, {
            subjects: ["LL08-056"],
            qa: [
                {
                    question: `Using {{link:LL05-047}}'s [RUSH], I entered a Member with [LIVE]. ({{red:"Riko"}} cannot join a ⟪LIVE⟫ this turn.) If I perform a ⟪LIVE⟫ with {{red:"Yuuki wa Doko ni? Kimi no Mune ni!"}} in this situation and have every Member on my Stage except for {{red:"Riko"}} join, can I still meet this Skill's requirement?`,
                    answer: `No. Regardless of whether Members are blocked from joining ⟪LIVE⟫ or not, if there are Members on Stage who are not joining the ⟪LIVE⟫, the Skill does not activate.`
                }
            ]
        }, {
            subjects: ["LL08-057"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `What does "exactly three Members, {{red:"Riko"}}, {{red:"Hanamaru"}} and {{red:"Mari"}}" mean?`,
                    answer: `If one {{red:"Riko"}} card, one {{red:"Hanamaru"}} card and one {{red:"Mari"}} card join this ⟪LIVE⟫, the requirement is met. If a Member with a name other than those three joins, or one of those three does not join, or two or more cards with the same name join, the Skill will not activate.`
                }
            ]
        }, {
            subjects: ["LL08-058"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Dia"}} card with [SMILE] and a {{red:"Ruby"}} card with [SMILE] joining, the Any Piece requirement is reduced by three, regardless of what other Members join.`
                }
            ]
        }, {
            subjects: ["LL08-059"],
            qa: [
                {
                    question: `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"You"}} card with a Live Costume and a {{red:"Yoshiko"}} with a Live Costume joining, the Any Piece requirement is reduced by three, regardless of what other Members join.`
                }
            ]
        }, {
            subjects: ["LL08-060"],
            qa: [
                {
                    question: `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `As long as there is a "Chika" card with [RUSH] or [LIVE] and a "Kanan" card with [RUSH] or [LIVE] joining, the Any Piece requirement is reduced by three, regardless of what other Members join.`
                }
            ]
        }, {
            subjects: [{from: "LL08-064", to: "LL08-081"}],
            qa: [
                {
                    question: "If multiple players have starting Members with [Starter] Skills, in what order should the Skills be used?",
                    answer: "Skills are used in the turn order decided at the start of the match. Once everyone's [Starter] Skills have been resolved, the first player in the turn order can begin."
                }
            ]
        }
    ],
    "EX10": [
        {
            subjects: ["EX10-001"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `If there are Members without Live Costumes on Stage, can I meet the "all Members on your Stage have the {{red:"MIRAI TICKET"}} Live Costume" requirement?`,
                    answer: `No. All Members on Stage must have a Live Costume and it must be the {{red:"MIRAI TICKET"}} Live Costume.`
                }
            ]
        }, {
            subjects: ["EX10-002"],
            seeAlso: ["/faq/general#skill_order_multiple_skills", "/faq/general#more_faceup_songs"],
            qa: [
                {
                    key: "setlist",
                    question: `I don't have {{red:"MIRAI TICKET"}} in my Set List, but there is an active ⟪LIVE⟫ with {{red:"MIRAI TICKET"}}. If I ⟪ENTER⟫ this card in this situation, can I ⟪ENTER⟫ the top card of my Deck?`,
                    answer: `No. The face-up {{red:"MIRAI TICKET"}} is not in your Set List, so the requirement is not met.`
                }, {
                    key: "order",
                    question: `There are two [Entry] Skills, can I use the second Skill first?`,
                    answer: `No. You must resolve the Skills from top to bottom.`
                }
            ]
        }, {
            subjects: ["EX10-003"],
            qa: [
                {
                    key: "return",
                    question: `I showed everyone the top card of my Deck, and it was not a Member who has the {{red:"MIRAI TICKET"}} Live Costume. Can I return it to the bottom of my Deck?`,
                    answer: `No. You must return it to the top of your Deck. If you show the bottom card of your Deck, you must return the card to the bottom.`
                }, {
                    key: "other",
                    question: `I showed everyone the top card of my Deck, and it was not a Member who has the {{red:"MIRAI TICKET"}} Live Costume. Can I show the bottom card of my Deck now?`,
                    answer: `No. Choose either only the top or only the bottom card of your Deck. If the shown Member does not have the {{red:"MIRAI TICKET"}} Live Costume, return the card, and the Skill is resolved.`
                }
            ]
        }, {
            subjects: ["EX10-004"],
            seeAlso: ["/faq/general#skill_impossible"]
        }, {
            subjects: ["EX10-005"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `If there are Members without Live Costumes joining the ⟪LIVE⟫, can I meet the "all Members joining this ⟪LIVE⟫ have the "MIRAI TICKET" Live Costume" requirement?`,
                    answer: `No. All Members joining the ⟪LIVE⟫ must have a Live Costume and it must be the {{red:"MIRAI TICKET"}} Live Costume.`
                }
            ]
        }, {
            subjects: ["EX10-006"],
            qa: [
                {
                    question: `What does "pick up to two differently named Members" mean?`,
                    answer: `From the three cards shown, pick up to two Members to add to your Hand that don't share the same name with each other. You can also pick up only one or no cards.`
                }
            ]
        }, {
            subjects: ["EX10-007"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"],
            qa: [
                {
                    question: `If there are Members without Live Costumes on Stage, can I meet the "all Members on your Stage have the {{red:"MIRAI TICKET"}} Live Costume" requirement?`,
                    answer: `No. All Members on Stage must have a Live Costume and it must be the {{red:"MIRAI TICKET"}} Live Costume.`
                }
            ]
        }
    ],
    "LL09": [
        {
            subjects: [{from: "LL09-037", to: "LL09-045"}],
            qa: [
                {
                    question: `I'm the first player in turn order, and at the start of the match, I used {{link:LL07-064}}'s [Starter] Skill to ⟪ENTER⟫ a card. If I ⟪ENTER⟫ {{link:LL09-037}} on my first turn, can I draw two cards using the [Entry] Skill?`,
                    answer: `No. [Starter] Skills are counted as part of match preparation, before any turns are played, so once your first turn starts, there have been no Members who ⟪ENTER⟫ed that turn.`
                }
            ]
        }, {
            subjects: ["LL09-046"],
            seeAlso: ["/faq/general#stand_by"]
        }, {
            subjects: ["LL09-047"],
            qa: [
                {
                    question: `When this Member joined the ⟪LIVE⟫, there were four face-down Song cards in the Set List. Does this Member still get +[COOL] from the [Live Join] Skill?`,
                    answer: `Yes. After the ⟪LIVE⟫, one face-down card will be turned face-up, but at the time [Live Join] Skills are resolved, there are four face-down cards, so the card gets +[COOL].`
                }
            ]
        }, {
            subjects: ["LL09-048"],
            seeAlso: ["/faq/general#collection"],
            qa: [
                {
                    key: "stars",
                    question: `Does "Member with one Star" include Members with two or more Stars?`,
                    answer: `No. The Member must have exactly one Star.`
                }, {
                    key: "entry",
                    question: `Can I use the [RUSH], [LIVE] or [Entry] Skill of the Member I ⟪ENTER⟫ from my Collection?`,
                    answer: `Yes. You can use it.`
                }
            ]
        }, {
            subjects: ["LL09-049"],
            qa: [
                {
                    question: `Does "Member with one Star" include Members with two or more Stars?`,
                    answer: `No. The Member must have exactly one Star.`
                }
            ]
        }, {
            subjects: ["LL09-050"],
            qa: [
                {
                    key: "samename",
                    question: `There is a face-up {{link:LL04-055}} and {{link:EX03-028}} in my Set List. If I ⟪ENTER⟫ a Member who has the {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} Live Costume using this card's Skill, what happens with the ⟪LIVE⟫ I could perform?`,
                    answer: `If there are multiple Song cards with the same name, you can pick any of them to use for the ⟪LIVE⟫.`
                }, {
                    key: "multiple",
                    question: `If there is a face-up Song card with multiple names in my Set List, for example {{link:LL01-067}}, can I ⟪ENTER⟫ a Member who has the {{red:"Sore wa Bokutachi no Kiseki"}} Live Costume? If so, can I perform a ⟪LIVE⟫ using that Song card?`,
                    answer: `Yes. If a face-up Song card has multiple names, the requirement is met if the Live Costume has the same name as either song name. In the given example, both ⟪ENTER⟫ing and performing the ⟪LIVE⟫ are possible.`
                }
            ]
        }, {
            subjects: ["LL09-051"],
            seeAlso: ["/faq/general#skill_impossible", "/faq/general#top_deck_card_faceup"],
            qa: [
                {
                    key: "types",
                    question: `How do I count types of Attributes?`,
                    answer: `There are four types of Attributes: [SMILE], [PURE], [COOL] and [ALL]. For example, {{link:LL09-064}} has [SMILE][ALL][ALL] in the upper left corner, so this Member has two types of Attributes. (You cannot use [ALL] as a wildcard for another Attribute.)`
                }, {
                    key: "livejoin",
                    question: `If the flipped Member card has a [Live Join] Skill that allows it to gain Pieces, can those Pieces be counted?`,
                    answer: `No. Pieces gained through [Live Join] Skills cannot be counted.`
                }, {
                    key: "bonus",
                    question: `Can I count Birthday Bonus Pieces?`,
                    answer: `If the requirement for the Birthday Bonus is met, the Pieces can be counted. For example, {{link:LL09-001}} has two types of Attribute if the Birthday Bonus is active, and one type of Attribute otherwise.`
                }, {
                    key: "order",
                    question: `How exactly should I resolve the Skill if the flipped Member card has three or more types of Attributes?`,
                    answer: `Do what the Skill says to do in the case of one types and the case of two types, in that order. So, add the Member card to your Hand, draw two cards, and after that you may ⟪ENTER⟫ one Member from your Hand.`
                }
            ]
        }, {
            subjects: ["LL09-052"],
            qa: [
                {
                    key: "self",
                    question: `I used a {{red:"take another turn"}} Skill. Is it possible to perform a ⟪LIVE⟫ using this Skill on my second turn?`,
                    answer: `No. Taking another turn means the previous turn was yours. That means that even if you performed a ⟪LIVE⟫ in the previous turn, it's not possible to meet the "another player" requirement.`
                }, {
                    key: "skip",
                    question: `If a {{red:"skip a turn"}} Skill was activated, what counts as the "previous turn"?`,
                    answer: `In that case, the "previous turn" is the turn taken by the player before the one who had to skip theirs.<br><ul><li>If the match is a one-on-one, that means the "previous turn" is your turn. (Meeting the requirement is impossible, as mentioned above.)</li><li>If you are playing with three or more players, that means the "previous turn" is the turn of the last player who wasn't skipped. (The requirement can be met.)</li></ul>`
                }, {
                    key: "won",
                    question: `In the previous turn, another player performed a ⟪LIVE⟫ and hit the Live Points Goal. Can I still perform a ⟪LIVE⟫ using this Skill?`,
                    answer: `Yes. The requirement is met even if the player who performed a ⟪LIVE⟫ in the previous turn won and went out.`
                }
            ]
        }, {
            subjects: ["LL09-053"],
            qa: [
                {
                    key: "donotuse",
                    question: `What exactly does "Do not use their [RUSH], [LIVE] or [Entry] Skill" mean?`,
                    answer: `Even if the Member card you ⟪ENTER⟫ed using this card's Skill has [RUSH], you cannot ⟪ENTER⟫ a card from your Hand. Similarly, even if the card has ⟪LIVE⟫ you cannot perform a ⟪LIVE⟫, and the card's [Entry] Skills have no effect.`
                }, {
                    key: "return",
                    question: `A Member card I ⟪ENTER⟫ed using this card's Skill returned to my Hand with another Skill. If that Member card is ⟪ENTER⟫ed again, can I use their [RUSH], [LIVE] or [Entry] Skill now?`,
                    answer: `Yes. Even if a Member card was ⟪ENTER⟫ed using this Skill before, they can use their Abilities or [Entry] Skills if the get ⟪ENTER⟫ed through other means later after returning to your Hand or Deck.`
                }, {
                    key: "sp",
                    question: `The Member card I ⟪ENTER⟫ed using this card's Skill has a [Special Practice] Skill. Since they are used when ⟪ENTER⟫ing, is that Skill also blocked by the "Do not use their [Entry] Skill" effect?`,
                    answer: `No. Only Skills with the [Entry] icon are blocked. [Special Practice] Skills have a different icon, so you can use it and perform [Special Practice] with that Member.`
                }, {
                    key: "instantsp",
                    question: `Using this card's Skill, I'm ⟪ENTER⟫ing {{link:LL15-035}} and a {{red:"Mari"}} with Stars. Can I immediately use {{red:"Mari"}}'s [Special Practice] by stacking onto the other {{red:"Mari"}}?`,
                    answer: `No. [Special Practice] Skills don't allow placing the Member card on a card that is ⟪ENTER⟫ing at the same time. You can only stack onto Members who are already on Stand-By on your Stage at the time the card ⟪ENTER⟫s.`
                }
            ]
        }, {
            subjects: ["LL09-054"],
            qa: [
                {
                    question: `If the next player does not have five or more cards in their Hand, can I still pick the "If the next player in turn order has five or more cards in their Hand, draw four cards" option?`,
                    answer: `Yes. You can choose it, and the Skill will resolve without any effect.<br>Similarly, even if you have no Members without Stars on your Hand, you can still pick the "⟪ENTER⟫ one Member without Stars from your Hand" option.`
                }
            ]
        }, {
            subjects: ["LL09-056"],
            qa: [
                {
                    question: `If all the Members with Live Costumes have the same Live Costume, will the Skill's requirement be met even if Members without Live Costumes participate?`,
                    answer: `No. All Members joining the ⟪LIVE⟫ must have a Live Costume and they must have the same Live Costume.`
                }
            ]
        }, {
            subjects: ["LL09-057"],
            seeAlso: ["/faq/general#members_on_stage"]
        }, {
            subjects: ["LL09-058"],
            qa: [
                {
                    key: "ongoing",
                    question: `I already performed a ⟪LIVE⟫ with {{red:"Kimi no Hitomi o Meguru Bouken"}}, and am now performing another ⟪LIVE⟫ a Song card without a Skill. Will this increase the Live Points gained through this Skill by one?`,
                    answer: `Yes. As long as the requirement is met, you can earn additional Live Points even after the ⟪LIVE⟫ with {{red:"Kimi no Hitomi o Meguru Bouken"}} was successfully performed.`
                }, {
                    key: "lose_first",
                    question: `I'm playing a match with the Live Points Goal at 9. I performed ⟪LIVE⟫s with this card and {{link:EX03-031}}, which does not have any Skills, so my Live Points are currently at 6. I'm now performing a ⟪LIVE⟫ with {{link:LL08-055}}. Will I win the match?`,
                    answer: `No. The moment you successfully perform a ⟪LIVE⟫ with {{link:LL08-055}}, the requirement for the Skill of {{red:"Kimi no Hitomi o Meguru Bouken"}} is no longer met. That means your Live Points are at 8 after performing the ⟪LIVE⟫, and you have not won yet.`
                }
            ]
        }, {
            subjects: ["LL09-061"],
            qa: [
                {
                    key: "gained",
                    question: `A Member card who did not originally have [ALL] joined this ⟪LIVE⟫, but gained [ALL] from a [Live Join] Skill. Can I still take another turn?`,
                    answer: `No. Even if the [ALL] was gained from a Skill or another Piece turning into [ALL], it will block the Skill.`
                }, {
                    key: "not_optional",
                    question: `I want to activate this card's Skill, can I choose to not activate a Member's [Live Join] Skill if a card would gain [ALL] from it?`,
                    answer: `No. If the requirements for a Skill are met, it will be activated and [ALL] will be gained. (You can only choose to skip and effect if the Skill says "you may".)`
                }
            ]
        }, {
            subjects: ["LL09-063"],
            qa: [
                {
                    question: `What does "for each different Live Costume the "Aqours" Members joining this ⟪LIVE⟫ have" mean?`,
                    answer: `The types of Live Costumes in the lower left of your {{red:"Aqours"}} Member cards are counted.<br>For example, if you have Member cards with the Live Costumes {{red:"Aozora Jumping Heart"}}, {{red:"Aozora Jumping Heart"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} and {{red:"Koi ni Naritai AQUARIUM"}}, you have three different Live Costumes, so the Any Piece requirement will be reduced by 3.`
                }
            ]
        }
    ],
    "EX05": [
        {
            subjects: ["EX05-028"],
            qa: [
                {
                    key: "explain",
                    question: `What exactly does this Skill do?`,
                    answer: `If the Song card involves counting Members who have the {{red:"Mogyutto “love” de Sekkin chuu!"}} Live Costume, you can count every card participating in the ⟪LIVE⟫, including this card. For example, if this card joins a ⟪LIVE⟫ with {{link:LL01-065}}, every Member will count for the Song card's Skill, and you can reduce the Any Piece requirement accordingly.`
                }, {
                    key: "original",
                    question: `If Members who already have Live Costumes join the same ⟪LIVE⟫, what happens to their original Live Costumes?`,
                    answer: `Treat their Live Costumes as {{red:"Mogyutto “love” de Sekkin chuu!"}}. Their original Live Costume does not count for any Skills anymore.`
                }, {
                    key: "after",
                    question: `After I successfully perform the ⟪LIVE⟫, will the Members who joined still be treated as having the {{red:"Mogyutto “love” de Sekkin chuu!"}} Live Costume?`,
                    answer: `Yes. For the rest of the match, treat all the Members as having the {{red:"Mogyutto “love” de Sekkin chuu!"}} instead of having no/another Live Costume.`
                }
            ]
        }, {
            subjects: ["EX05-029"],
            qa: [
                {
                    question: `If two or more of this card join a ⟪LIVE⟫ with {{link:LL02-068}}, does the Skill become "If you used five or more Song cards for Lives, gain ♪Live Points +4♪" instead?`,
                    answer: `No. This card's Skill does not increase the Live Points gained from the Song card's Skill, but replaces the Skill. Hence, even if two or more of this card join the ⟪LIVE⟫, the resulting Skill does not change.`
                }
            ]
        }, {
            subjects: ["EX05-030"],
            seeAlso: ["/faq/general#join_success_order"]
        }, {
            subjects: ["EX05-031", "EX05-032", "EX05-034"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    question: `When this card joins a ⟪LIVE⟫ with a Song card other than the one listed in the [Live Join] Skill, does the [Live Success] Skill still activate?`,
                    answer: `Yes. The [Live Join] and [Live Success] Skills are not related to each other, so you can draw a card using the [Live Success] Skill even if joining a ⟪LIVE⟫ with a different Song card.`
                }
            ]
        }, {
            subjects: ["EX05-035"],
            qa: [
                {
                    question: `If two or more of this card join a ⟪LIVE⟫ with {{link:LL02-066}}, can I draw three cards for each?`,
                    answer: `Yes. For example, if two {{red:"Hanayo"}}s are joining the ⟪LIVE⟫, you can draw eight cards in total (including the Skill of the Song card).`
                }
            ]
        }, {
            subjects: ["EX05-036"],
            qa: [
                {
                    key: "each",
                    question: `If two or more of this card join a ⟪LIVE⟫ with {{link:LL01-064}}, do I gain ♪Live Points +1♪ for each?`,
                    answer: `Yes. For each {{red:"Nico"}}, you will gain ♪Live Points +1♪.`
                }, {
                    key: "zero",
                    question: `If the Song card used for the ⟪LIVE⟫ would give me zero Live Points by itself (less than three Members who have the {{red:"Natsuiro Egao de 1,2,Jump!"}} Live Costume), do I still gain ♪Live Points +1♪ if this card joined the ⟪LIVE⟫?`,
                    answer: `Yes. Regardless of the Bonus Live Points of {{link:LL01-064}}, you will gain ♪Live Points +1♪.`
                }
            ]
        }, {
            subjects: ["EX05-037"],
            qa: [
                {
                    key: "explain",
                    question: `What does "For each differently named {{red:"µ's"}} Member in them, pick one of their cards to add to your Hand" mean?`,
                    answer: `From the three cards shown, pick Members to add to your Hand that don't share the same name. If there are multiple cards with the same name, you can only pick one of them.`
                }, {
                    key: "same",
                    question: `If all of the flipped cards are the same {{red:"µ's"}} Member, can I still add a card to my Hand?`,
                    answer: `Yes. For example, even if all three flipped cards are {{red:"Honoka"}} cards, you can still pick one of them to add to your Hand.`
                }
            ]
        }, {
            subjects: ["EX05-038"],
            qa: [
                {
                    key: "livejoin",
                    question: `If one of the flipped Member cards has a [Live Join] Skill that allows it to gain Pieces, can those Pieces be counted?`,
                    answer: `No. Pieces gained through [Live Join] Skills cannot be counted.`
                }, {
                    key: "bonus",
                    question: `If I ⟪ENTER⟫ed {{link:LL04-067}} with the Birthday Bonus active using this card's Skill, can I take another turn?`,
                    answer: `Yes. If the requirement for the Birthday Bonus is met, the Pieces can be counted, so in this example, you are allowed to take another turn.`
                }
            ]
        }, {
            subjects: ["EX05-039"],
            qa: [
                {
                    key: "original",
                    question: `If Members who already have Live Costumes join the same ⟪LIVE⟫, what happens to their original Live Costumes?`,
                    answer: `Treat their Live Costumes as the one matching the Song card used for the ⟪LIVE⟫. Their original Live Costume does not count for any Skills anymore.`
                }, {
                    key: "multiple",
                    question: `If this Member joins a ⟪LIVE⟫ with a Song card with multiple names, for example {{link:LL02-069}}, what happens to the Live Costumes of the joining Members?`,
                    answer: `You can choose one of the names on the Song card, and every Member joining the ⟪LIVE⟫ will have that Live Costume. Pick which song name you'd like to use when resolving the Skill.`
                }, {
                    key: "nonsong",
                    question: `If this Member joins a ⟪LIVE⟫ with a Song card like {{link:LL01-075}} or {{link:PR-012}}, will my cards have a Live Costume with that name?`,
                    answer: `Yes. These two Song cards are not actually songs, but the Members joining these ⟪LIVE⟫s will still be treated as having a Live Costume with the same name as the Song card used. (They will not keep their original Live Costume.)`
                }, {
                    key: "after",
                    question: `After I successfully perform the ⟪LIVE⟫, will the Members who joined still be treated as having a Live Costume with the same name as the Song card?`,
                    answer: `Yes. For the rest of the match, treat all the Members as having the Live Costume with the same name as the Song card instead of having no/another Live Costume.`
                }
            ]
        }, {
            subjects: ["EX05-040"],
            seeAlso: ["/faq/general#no_shuffle_facedown_song"]
        }, {
            subjects: ["EX05-041"],
            seeAlso: ["/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    key: "all",
                    question: `I have three Members with [RUSH] on my Stage who can join a ⟪LIVE⟫ with this card's [Entry] Skill. If they have enough Pieces between them, am I allowed to only use two of them to perform the ⟪LIVE⟫?`,
                    answer: `No. All Members with [RUSH] must join the ⟪LIVE⟫.`
                }, {
                    key: "blocked",
                    question: `There are two Members with [RUSH] on my Stage, with one of them being {{link:LL05-047}} who was ⟪ENTER⟫ed last turn (which means she cannot join ⟪LIVE⟫s this turn). If I use this card's [Entry] Skill now, can I perform a ⟪LIVE⟫ with just this card and the [RUSH] card that is not {{red:"Riko"}}?`,
                    answer: `No. All Members with [RUSH] must join the ⟪LIVE⟫. In this example, it is impossible to perform a ⟪LIVE⟫.`
                }
            ]
        }, {
            subjects: ["EX05-042"],
            seeAlso: ["/faq/general#muse_and_aqours_song_cards"],
            qa: [
                {
                    key: "all",
                    question: `I have three Members with [RUSH] on my Stage who can join a ⟪LIVE⟫ with this card's [Entry] Skill. If they have enough Pieces between them, am I allowed to only use two of them to perform the ⟪LIVE⟫?`,
                    answer: `No. All Members with [RUSH] must join the ⟪LIVE⟫.`
                }, {
                    key: "blocked",
                    question: `There are two Members with [RUSH] on my Stage, with one of them being {{link:LL05-047}} who was ⟪ENTER⟫ed last turn (which means she cannot join ⟪LIVE⟫s this turn). If I use this card's [Entry] Skill now, can I perform a ⟪LIVE⟫ with just this card and the [RUSH] card that is not {{red:"Riko"}}?`,
                    answer: `No. All Members with [RUSH] must join the ⟪LIVE⟫. In this example, it is impossible to perform a ⟪LIVE⟫.`
                }
            ]
        }, {
            subjects: ["EX05-043"],
            qa: [
                {
                    question: `Is it allowed to only reveal some of the cards in my Hand when using this Skill?`,
                    answer: `No. You must either show your entire Hand or not show it at all.`
                }
            ]
        }, {
            subjects: ["EX05-045"],
            seeAlso: ["/faq/general#skill_order_same_skill"],
            qa: [
                {
                    key: "neutral",
                    question: `If there's a face-up Song card with the Neutral Attribute, does that mean I can use all the effects for all three Attributes?`,
                    answer: `No. Unlike [ALL], Neutral is not a wildcard. It is it's own unique Attribute.`
                }, {
                    key: "may",
                    question: `Even if I have face-up Song cards with the Smile, Pure and Cool Attributes, can I choose to not ⟪ENTER⟫ a card or perform a ⟪LIVE⟫?`,
                    answer: `Yes. These effects say "you may", so you can choose to not use these effects.`
                }
            ]
        },
    ],
    "EX11": [
        {
            subjects: ["EX11-001"],
            seeAlso: ["/faq/general#flip_before_skills"]
        }, {
            subjects: ["EX11-002"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    key: "base",
                    question: `What are "Base Live Points"?`,
                    answer: "It refers to the large number in the top right of the Song card. If there are Bonus Live Points on a card, like {{link:LL03-075}}, it only refers to the number on the left. (That means that {{link:LL03-075}} does not meet the requirement.)"
                }, {
                    key: "none",
                    question: `When I ⟪ENTER⟫ed this card, there weren't any Song cards in my Set List with 4 or more Base Live Points. Can I still draw the additional card?`,
                    answer: `Yes. In that case, you can still draw a card.`
                }
            ]
        }, {
            subjects: ["EX11-003"],
            seeAlso: ["/faq/general#flip_before_skills", "/faq/general#muse_and_aqours_song_cards"],
            qa: [
                {
                    key: "twice",
                    question: `If I used this card's Skill when I ⟪ENTER⟫ed it, can I also use it after performing a ⟪LIVE⟫ with this card?`,
                    answer: "Yes. You can use it both times, after ⟪ENTER⟫ing and after performing a ⟪LIVE⟫."
                }, {
                    key: "multiple",
                    question: `If there is a face-up Song card with multiple names in my Set List, for example {{link:LL01-067}}, can I ⟪ENTER⟫ a Member who has the {{red:"Sore wa Bokutachi no Kiseki"}} Live Costume?`,
                    answer: `Yes. If a face-up Song card has multiple names, the requirement is met if the Live Costume has the same name as either song name.`
                }, {
                    key: "same",
                    question: `After performing a ⟪LIVE⟫, can I ⟪ENTER⟫ a Member who has a Live Costume with the same name as the Song card used for that ⟪LIVE⟫?`,
                    answer: `No. When a ⟪LIVE⟫ is performed, the Song card is placed on the Stage and is not part of the Set List anymore, but the Skill requires the Song card to be in your Set List.<br>(If you have a second Song card with the same name as the one used for the ⟪LIVE⟫, and it's face-up in your Set List, you can still ⟪ENTER⟫ a Member who has a Live Costume with that name.)`
                }
            ]
        }, {
            subjects: ["EX11-004"],
            qa: [
                {
                    key: "other",
                    question: `If I used {{link:LL01-058}}'s Skill to ⟪ENTER⟫ this card after it was revealed to everyone, can I use this card's [Entry] Skill?`,
                    answer: "Yes. The requirement is met. Even if the card is revealed, it is still in your Hand."
                }, {
                    key: "rush",
                    question: `Does [RUSH] count as an [Entry] Skill?`,
                    answer: `No. It is not a Skill. Only lines with the [Entry] icon are [Entry] Skills.`
                }
            ]
        }, {
            subjects: ["EX11-005"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What does "If there are exactly three differently named Members on your Stage" mean?`,
                    answer: `Count how many different names the Member cards on your Stage have.<br>For example, if you have Member cards named {{red:"Rin Hoshizora"}}, {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}} on your Stage, you have three differently named Members on your Stage - {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}}. Since that's three different names, the Skill's requirement is met.`
                }
            ]
        }, {
            subjects: ["EX11-006"],
            seeAlso: ["/faq/general#more_faceup_songs"]
        }, {
            subjects: ["EX11-007"],
            qa: [
                {
                    question: `Is this Skill's requirement met if this card joins a ⟪LIVE⟫ with a Song card with {{red:"µ's"}} in its name, such as {{link:LL01-075}}?`,
                    answer: `No. {{red:"µ's"}} must be included in the card's Skill text (the text at the bottom of the card), so the requirement is not met.`
                }
            ]
        }, {
            subjects: ["EX11-008"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What does "If there are exactly three differently named Members joining this ⟪LIVE⟫" mean?`,
                    answer: `Count how many different names the Member cards joining this ⟪LIVE⟫ have.<br>For example, if you have Member cards joining this ⟪LIVE⟫ named {{red:"Rin Hoshizora"}}, {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}}, you have three differently named Members joining this ⟪LIVE⟫ - {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}}. Since that's three different names, the Skill's requirement is met.`
                }
            ]
        }, {
            subjects: ["EX11-009"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What does "If there are exactly three differently named Members on your Stage" mean?`,
                    answer: `Count how many different names the Member cards on your Stage have.<br>For example, if you have Member cards named {{red:"Rin Hoshizora"}}, {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}} on your Stage, you have three differently named Members on your Stage - {{red:"Rin Hoshizora"}}, {{red:"Hanayo Koizumi"}} and {{red:"Nico Yazawa"}}. Since that's three different names, the Skill's requirement is met.`
                }
            ]
        }, {
            subjects: [{from: "EX11-010", to: "EX11-018"}],
            qa: [
                {
                    question: `I'm the first player in turn order, and at the start of the match, I used {{link:LL07-064}}'s [Starter] Skill to ⟪ENTER⟫ a card. If I ⟪ENTER⟫ {{link:EX11-010}} on my first turn, can I draw two cards using the [Entry] Skill?`,
                    answer: `No. [Starter] Skills are counted as part of match preparation, before any turns are played, so once your first turn starts, there have been no Members who ⟪ENTER⟫ed that turn.`
                }
            ]
        }, {
            subjects: [{from: "EX11-019", to: "EX11-027"}],
            seeAlso: ["/faq/general#members_on_stage"]
        }, {
            subjects: ["EX11-028"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    key: "livejoin",
                    question: `If the flipped Member card has a [Live Join] Skill that allows it to gain [SMILE], can that Piece be counted?`,
                    answer: `No. Pieces gained through [Live Join] Skills cannot be counted. If the card has a normal [SMILE] shown in the top left, the card will be ⟪ENTER⟫ed, otherwise, it will be added to your Hand.`
                }, {
                    key: "bonus",
                    question: `If the flipped Member card has an active Birthday Bonus and it's [SMILE], can that Piece be counted?`,
                    answer: `Yes. If the requirement for the Birthday Bonus is met, the Pieces can be counted and if the Bonus Piece is [SMILE], the card will be ⟪ENTER⟫ed.`
                }
            ]
        }, {
            subjects: ["EX11-029"],
            qa: [
                {
                    question: `This Member has [COOL][COOL], and I have used three Song cards for Lives. What Pieces will the Member have in this case?`,
                    answer: `The Member will have [ALL][ALL]. (Even if you have more Song cards than [COOL], only [COOL] can become [ALL].)`
                }
            ]
        }, {
            subjects: ["EX11-030"],
            qa: [
                {
                    question: `A player used this Member's Skill. If they have no cards in their Hand, can I still grant the "⟪ENTER⟫ one Member from your Hand" request?`,
                    answer: `Yes. No matter how many cards the player has on their Hand, you can choose either request. (For the same reason, you can also grant the "draw three cards" request if they have less than three cards in their Deck.)`
                }
            ]
        }, {
            subjects: ["EX11-031"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    key: "attribute",
                    question: `How are Song cards with Attribute requirements counted for "highest requirement"?`,
                    answer: `Sum up the number of all Pieces required to perform a ⟪LIVE⟫. For example, {{link:EX11-047}} (4x [SMILE], 3x [PURE], 3x [COOL]) will be counted as <span class="whitespace-nowrap">4 + 3 + 3 = 10</span>.`
                }, {
                    key: "tied",
                    question: `If there are multiple cards with the same highest amount of Pieces needed, does performing a ⟪LIVE⟫ with any of them meet this Skill's requirement?`,
                    answer: `Yes. If no other Song card has a higher amount of Pieces needed to perform a ⟪LIVE⟫, the Skill's requirement is met.`
                }
            ]
        }, {
            subjects: ["EX11-032"],
            seeAlso: ["/faq/general#stand_by"],
            qa: [
                {
                    question: `If I return a Member with Stars to my Hand, can I ⟪ENTER⟫ a Member without Stars?`,
                    answer: `Yes. Members with Stars and Members without Stars count as having a different amount of Stars. Similarly, you can ⟪ENTER⟫ a Member with Stars after returning a Member without Stars to your Hand.`
                }
            ]
        }, {
            subjects: ["EX11-033"],
            qa: [
                {
                    question: `If the face-up Song cards in my Set List have four different Attributes, do I draw two cards?`,
                    answer: `Yes. If there are four Attributes, you both draw two cards and take another turn.`
                }
            ]
        }, {
            subjects: ["EX11-035"],
            seeAlso: ["/faq/general#stand_by"]
        }, {
            subjects: ["EX11-036"],
            seeAlso: ["/faq/general#skill_impossible"]
        }, {
            subjects: ["EX11-037"],
            seeAlso: ["/faq/general#more_faceup_songs"]
        }, {
            subjects: ["EX11-038"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than {{red:"Honoka"}} and {{red:"Rin"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Honoka"}} card and a {{red:"Rin"}} card joining, the Skill's requirement is met, regardless of what other Members join.`
                }, {
                    key: "skip",
                    question: `If the Skill's requirement is met and I perform a ⟪LIVE⟫, can I choose not to ⟪SCOUT⟫?`,
                    answer: `No. If the requirement of the Skill is met, you must always ⟪SCOUT⟫.`
                }
            ]
        }, {
            subjects: ["EX11-039"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than {{red:"Nozomi"}} and {{red:"Nico"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Nozomi"}} card and a {{red:"Nico"}} card joining, the Skill's requirement is met, regardless of what other Members join.`
                }, {
                    key: "skip",
                    question: `If the Skill's requirement is met and I perform a ⟪LIVE⟫, can I choose not to add the bottom card of my Deck to my Hand?`,
                    answer: `No. If the requirement of the Skill is met, you must always add the bottom card of your Deck to your Hand.`
                }
            ]
        }, {
            subjects: ["EX11-040"],
            qa: [
                {
                    question: `What if Members other than {{red:"Kotori"}} and {{red:"Hanayo"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Kotori"}} card and a {{red:"Hanayo"}} card joining, the Skill's requirement is met, regardless of what other Members join.`
                }
            ]
        }, {
            subjects: ["EX11-041"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than {{red:"Eli"}}, {{red:"Umi"}} and {{red:"Maki"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Eli"}} card, a {{red:"Umi"}} card and a {{red:"Maki"}} card joining, the Skill's requirement is met, regardless of what other Members join.`
                }, {
                    key: "flipping",
                    question: `What exactly does the [While Live] Skill of this card do?`,
                    answer: `After this ⟪LIVE⟫ is performed, for every Song card in your Set List that is flipped face-up because of performing a ⟪LIVE⟫ or as the result of a Skill, flip an additional Song card face-up.<br>(This includes the Song card you flip face-up after performing the ⟪LIVE⟫ with this card.)`
                }, {
                    key: "multiple",
                    question: `What happens if I use a Skill that allows me to flip multiple Song cards face-up at once, such as the [Live Success] Skill of {{link:LL03-066}}, while {{red:"soldier game"}} is live its the Skill's requirement is met?`,
                    answer: `If you flip multiple Song cards face-up at the same time, you still flip one additional Song card face-up for each flipped card. (For example, if you flip three Song cards face-up at once, you flip three more Song cards face-up.)`
                }
            ]
        }, {
            subjects: ["EX11-042"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than {{red:"Nico"}}, {{red:"Rin"}} and {{red:"Hanayo"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Nico"}} card, a {{red:"Rin"}} card and a {{red:"Hanayo"}} card joining, the Skill's requirement is met, regardless of what other Members join.`
                }, {
                    key: "all",
                    question: `If the {{red:"Nico"}} cards, {{red:"Rin"}} cards and {{red:"Hanayo"}} cards joining this ⟪LIVE⟫ don't have Live Costumes, is the Skill's requirement met even if there are other Members with Live Costumes joining this ⟪LIVE⟫?`,
                    answer: `No. No Members joining the ⟪LIVE⟫ may have Live Costumes. If any Member joining has a Live Costume, the Skill's requirement is not met.`
                }
            ]
        }, {
            subjects: ["EX11-043"],
            qa: [
                {
                    key: "later",
                    question: `After performing a ⟪LIVE⟫ with {{red:"Binetsu kara Mystery"}} with the Skill's requirement met, I performed another ⟪LIVE⟫ with all three Members of {{red:"lily white"}}. Do I gain another Live Point?`,
                    answer: `Yes. If the Skill's requirement is met, you will gain Live Points even from ⟪LIVE⟫s performed after {{red:"Binetsu kara Mystery"}} was.`
                }, {
                    key: "others",
                    question: `What if Members other than those of {{red:"lily white"}} join the ⟪LIVE⟫? And if another Member joins a ⟪LIVE⟫ along with {{red:"Umi"}}, {{red:"Rin"}} and {{red:"Nozomi"}} cards, will I gain Live Points?`,
                    answer: `As long as there is a {{red:"Umi"}} card, a {{red:"Rin"}} card and a {{red:"Nozomi"}} card joining, the Skill's requirement is met, regardless of what other Members join. Similarly, as longs as there is at least a {{red:"Umi"}} card, a {{red:"Rin"}} card and a {{red:"Nozomi"}} card joining a ⟪LIVE⟫ with another Song card, you will gain a Live Point.`
                }
            ]
        }, {
            subjects: ["EX11-044"],
            seeAlso: ["/faq/general#collection", "/faq/general#flip_before_skills"],
            qa: [
                {
                    question: `What if Members other than those of {{red:"BiBi"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Eli"}} card, a {{red:"Maki"}} card and a {{red:"Nico"}} card joining, the Skill's requirement is met, regardless of what other Members join.`
                }
            ]
        }, {
            subjects: ["EX11-045"],
            qa: [
                {
                    key: "others",
                    question: `What if Members other than those of {{red:"Printemps"}} join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Hanayo"}} card, a {{red:"Kotori"}} card and a {{red:"Hanayo"}} card joining, the Skill's requirement is met, regardless of what other Members join.`
                }, {
                    key: "skills",
                    question: `While this Song card is live and its Skill's requirement is met, {{link:LL08-050}} joined a ⟪LIVE⟫ with a Member of {{red:"Printemps"}} who did not originally have [PURE]. In this situation, can the {{red:"Printemps"}} Member gain +[PURE] through the Skill of the {{red:"You"}} card?`,
                    answer: `Yes. The Member will gain +[PURE] from this card's Skill before the [Live Join] Skill is resolved. Thus, you can gain +[PURE] again by using the Skill of the {{red:"You"}} card.`
                }
            ]
        }, {
            subjects: ["EX11-046"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `I used a "Take another turn" Skill. If I perform a ⟪LIVE⟫ with this Song card on my second turn, will {{red:"µ's"}} Members I ⟪ENTER⟫ed on my first turn count for the "have been on your Stage before this turn" requirement?`,
                    answer: `Yes. Since you have taken another turn, any Members who ⟪ENTER⟫ed before the extra turn meet this Skill's requirement.`
                }
            ]
        }, {
            subjects: ["EX11-047"],
            qa: [
                {
                    question: `Do [ALL] gained through [Live Join] Skills count for this card's [Live Success] Skill?`,
                    answer: `Yes. [ALL] gained through Skills or by treating other Pieces as [ALL] count.`
                }
            ]
        }, {
            subjects: ["EX11-048"],
            seeAlso: ["/faq/general#member_counting"]
        }, {
            subjects: ["EX11-049"],
            seeAlso: ["/faq/general#members_on_stage"]
        }, {
            subjects: ["EX11-050"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `The Members joining this ⟪LIVE⟫ have 3x [SMILE] and 1x [ALL] in total. Will the Any Piece requirement be reduced?`,
                    answer: `No. The Skill of this Song card requires one Attribute, [SMILE] [PURE] [COOL] or [ALL], to have four or more Pieces. You cannot use [ALL] as a wildcard for another Attribute.`
                }
            ]
        }, {
            subjects: ["EX11-051"],
            seeAlso: ["/faq/general#member_counting"]
        }, {
            subjects: [{from: "EX11-052", to: "EX11-069"}],
            seeAlso: ["/faq/general#skill_impossible"],
            qa: [
                {
                    question: `I'm using this Member's Skill while having no cards in my Hand. Can I still draw four cards?`,
                    answer: `Yes. You can draw four cards even if you have no cards in your Hand.`
                }
            ]
        }
    ],
    "EX12": [
        {
            subjects: ["EX12-019"],
            seeAlso: ["/faq/LL05#LL05-046"]
        }, {
            subjects: ["EX12-020"],
            seeAlso: ["/faq/LL05#LL05-047"]
        }, {
            subjects: ["EX12-021"],
            seeAlso: ["/faq/LL05#LL05-048"]
        }, {
            subjects: ["EX12-022"],
            seeAlso: ["/faq/LL05#LL05-049"]
        }, {
            subjects: ["EX12-023"],
            seeAlso: ["/faq/LL05#LL05-050"]
        }, {
            subjects: ["EX12-024"],
            seeAlso: ["/faq/LL05#LL05-051"]
        }, {
            subjects: ["EX12-025"],
            seeAlso: ["/faq/LL05#LL05-052"]
        }, {
            subjects: ["EX12-026"],
            seeAlso: ["/faq/LL05#LL05-053"]
        }, {
            subjects: ["EX12-027"],
            seeAlso: ["/faq/LL05#LL05-054"]
        }, {
            subjects: ["EX12-028"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    key: `emptyscout`,
                    question: `I ⟪SCOUT⟫ed in my previous turn, but already had four or more cards on my Hand, so I didn't draw any cards. Will the "if you ⟪SCOUT⟫ed in your previous turn" requirement still be met?`,
                    answer: `Yes. Whether you draw cards or not, the Skill's requirement is met if you ⟪SCOUT⟫ed in the previous turn.`
                }, {
                    key: `idolization`,
                    question: `Using the [Entry] Skill, I ⟪ENTER⟫ed a {{red:"Chika"}} without Stars, and because I ⟪SCOUT⟫ed in the previous turn, I'm also ⟪ENTER⟫ing {{link:LL15-048}}. Can I flip the {{red:"Chika"}} without Stars face-down and place the second card on top of it?`,
                    answer: `Yes. By the time {{link:LL15-048}} is ⟪ENTER⟫ed, the {{red:"Chika"}} without Stars is already on Stand-By, so you can flip it face-down and place the card on top of it.`
                }
            ]
        }, {
            subjects: ["EX12-029"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `My opponent had to pass due to a "skip a turn" Skill, so it's my turn again. If I ⟪ENTER⟫ this Member in this turn, is the "if the previous turn was yours" requirement met?`,
                    answer: `Yes. If the opponent skipping a turn causes you to take two turns in a row, you can have the previous turn be yours, and the Skill's requirement can be met.`
                }
            ]
        }, {
            subjects: ["EX12-030"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#member_counting", "/faq/general#skill_order_multiple_skills"]
        }, {
            subjects: ["EX12-031"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"]
        }, {
            subjects: ["EX12-032"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#skill_order_multiple_skills"],
            qa: [
                {
                    question: `My opponent had to pass due to a "skip a turn" Skill, so it's my turn again. If I ⟪ENTER⟫ this Member in this turn, is the "if the previous turn was yours" requirement met?`,
                    answer: `Count how many different Live Costumes the {{red:"You"}} cards on your Stage have (in the lower left).<br>For example, if you have {{red:"You"}} cards with the Live Costumes {{red:\"Aozora Jumping Heart\"}}, {{red:\"Aozora Jumping Heart\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}}, {{red:\"Kimi no Kokoro wa Kagayaiteru kai?\"}} and {{red:\"Koi ni Naritai AQUARIUM\"}}, you have three different Live Costumes, and you draw cards until you have three cards in your Hand. (If you already have three or more cards in your Hand, you don't draw any cards.)`
                }
            ]
        }, {
            subjects: ["EX12-033"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#skill_order_same_skill"],
            qa: [
                {
                    key: `explain`,
                    question: `What exactly does the Skill of this card do?`,
                    answer: `If all Members on your Stage are {{red:"Yoshiko"}} cards, resolve the three following effects. If you meet the requirement for all of them, you can get all three effects.`
                }, {
                    key: `others`,
                    question: `I was not allowed to draw cards because I did not have six or more Members on my Stage, but I still have six or more cards in my Hand. Am I allowed to ⟪ENTER⟫ a Member without Stars?`,
                    answer: `Yes. You can ⟪ENTER⟫ a Member without Stars from your Hand. When resolving an effect, it does not matter whether the requirements of the other two effects are met.<br>Similarly, even if you are unable to draw cards because your Deck is empty, or if you choose not to ⟪ENTER⟫ a Member, the requirements of the other effects are unaffected.`
                }, {
                    key: `combo`,
                    question: `I used this card's Skill when I had six Members on my Stage and four cards in my Hand. I draw two cards from the first effect and now have six cards in my Hand - can I ⟪ENTER⟫ a Member without Stars now?`,
                    answer: `Yes. You can ⟪ENTER⟫ a Member without Stars from your Hand. The requirements for the effects are checked in order when you resolve that effect, not all at once when the Skill starts to be resolved.`
                }
            ]
        }, {
            subjects: ["EX12-034"],
            seeAlso: ["/faq/general#stand_by", "/faq/general#members_on_stage"]
        }, {
            subjects: ["EX12-035"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#collection"],
            qa: [
                {
                    key: `skill`,
                    question: `Can I pick a Member like {{link:LL06-053}}, who has only [ALL] in the upper left, but might gain Pieces other than [ALL] from a [Live Join] Skill, from my Collection?`,
                    answer: `Yes. Pieces that can be gained from [Live Join] Skills are not considered for this Skill.`
                }, {
                    key: `bonus`,
                    question: `Can I pick a {{red:"Mari"}} card that has only [ALL] in the upper left, but has a Pieces that is not [ALL] as its Birthday Bonus, from my Collection?`,
                    answer: `If the Birthday Bonus is active, you must consider the Piece for this Skill. If a {{red:"Mari"}} card has a Birthday Bonus Piece that is not [ALL] and its Birthday Bonus is active, you cannot pick it from your Collection.`
                }
            ]
        }, {
            subjects: ["EX12-036"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    key: `one`,
                    question: `When I ⟪ENTER⟫ed this Member, I only had one card on my Hand. Can I return that one card to my Deck and then ⟪ENTER⟫ the top card of my Deck?`,
                    answer: `No. You must return two cards to your Deck, one to the top and one to the bottom, or you cannot ⟪ENTER⟫ the top card of your Deck.`
                }, {
                    key: `empty`,
                    question: `If my Deck is empty when this Member is ⟪ENTER⟫ed, can I still ⟪ENTER⟫ a card from the Deck?`,
                    answer: `Yes. As usual, the card you have placed on the top of the Deck will be ⟪ENTER⟫ed.`
                }
            ]
        }
    ],
    "LL10": [
        {
            subjects: ["LL10-046"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#more_faceup_songs"],
            qa: [
                {
                    question: `If I have no face-down cards in my Set List, can I still choose the "flip one face-down Song card in your Set List face-up" effect?`,
                    answer: `Yes. In that case, the Skill would be resolved without anything happening.<br>Similarly, you can choose to draw two cards even if you have no cards or only one card in your Deck, or choose to ⟪ENTER⟫ a Member without Stars and with a Live Costume from your Hand even if you have no matching Member on your Hand.`
                }
            ]
        }, {
            subjects: ["LL10-047"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#collection", "/faq/general#muse_and_aqours_song_cards", "/faq/general#more_faceup_songs"],
            qa: [
                {
                    question: `Can I pick a Song card with the same name as a Song card in my Set List or a Song card used for a ⟪LIVE⟫ from my Collection?`,
                    answer: `Yes. You can pick Song cards with the same name, no matter whether their ID matches with one of the Song cards in play or not.`
                }
            ]
        }, {
            subjects: ["LL10-048"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    key: `cards`,
                    question: `Which cards have Skills that require "counting {{red:"Members currently in your Lives"}}"?`,
                    answer: `You can use <a href="http://localhost:5173/search/skill:Members%20currently%20in%20your%20Lives">the search function on this site</a> to find all cards affected by this Skill.`
                },
                {
                    key: `samelive`,
                    question: `I'm performing a ⟪LIVE⟫ with this card and {{link:LL08-048}}. When counting {{red:"Members currently in your Lives"}} while resolving {{link:LL08-048}}'s [Live Success] Skill, does this card's Skill double the amount?`,
                    answer: `Yes. The [While Live] Skill is already active when resolving the [Live Success] Skill, so the amount is doubled.`
                },
                {
                    key: `stack`,
                    question: `If there are two or more of this card in Lives, do you double the counted amounts of {{red:"Members currently in your Lives"}} for each card?`,
                    answer: `Yes. If there are two {{link:LL10-048}} currently in Lives, the amount will be quadrupled, and if there are three {{link:LL10-048}} currently in Lives, it will be multiplied by eight.`
                }
            ]
        }, {
            subjects: ["LL10-049"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `Does this card's Skill count the card itself as a "3rd Year" card with Stars?`,
                    answer: `Yes. If three or more "3rd Year" cards with Stars, including {{link:LL10-049}} itself, join this ⟪LIVE⟫, it will gain +[ALL].`
                }
            ]
        }, {
            subjects: ["LL10-050"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `What exactly does the [Entry] Skill do?`,
                    answer: `You may ⟪ENTER⟫ a Member with a Live Costume and without Stars from your Hand if there is at least one card with the same Live Costume on your Stage.<br>For example, if you have cards with the Live Costumes {{red:"Aozora Jumping Heart"}}, {{red:"Aozora Jumping Heart"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}}, {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} and {{red:"Koi ni Naritai AQUARIUM"}} on your Stage, you may ⟪ENTER⟫ up to one Member with the {{red:"Aozora Jumping Heart"}} Live Costume and without Stars, one Member with the {{red:"Kimi no Kokoro wa Kagayaiteru kai?"}} Live Costume and without Stars, and one Member with the {{red:"Koi ni Naritai AQUARIUM"}} Live Costume and without Stars from your Hand.`
                }
            ]
        }, {
            subjects: ["LL10-051"],
            seeAlso: ["/faq/general#member_counting", "/faq/general#stand_by"]
        }, {
            subjects: ["LL10-052"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills", "/faq/general#live_non_exact"],
            qa: [
                {
                    question: `If the requirement of the Song card used in this ⟪LIVE⟫ was reduced by a Skill, does this Skill count the original or the reduced requirement? Additionally, if Members joining this ⟪LIVE⟫ gained Pieces from Skills, does this Skill count or ignore these additional Pieces?`,
                    answer: `If the ⟪LIVE⟫ is performed with a Song card with a reduced requirement, that changed requirement is counted. Similarly, any Pieces the joining Members gained from Skills are also counted in the total number of Pieces.`
                }
            ]
        }, {
            subjects: ["LL10-053"],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"],
            qa: [
                {
                    question: `This Member performs a ⟪LIVE⟫ with a Member without [ALL]. If the other Member gains +[ALL] from a Skill, does that additional Piece fulfil the "If there is another Member with [ALL] who joined this ⟪LIVE⟫" requirement?`,
                    answer: `Yes. If another Member gains +[ALL] from a Skill, or a Skill allows you to treat another Piece as [ALL], the Skill's requirement is met.`
                }
            ]
        }, {
            subjects: ["LL10-054"],
            qa: [
                {
                    key: `same`,
                    question: `Can I pick two {{red:"1st Year"}} Members with the same name to add to my Hand?`,
                    answer: `Yes. As long as both cards are {{red:"1st Year"}} Members, you can add any card, no matter what their names are.`
                },
                {
                    key: `optional`,
                    question: `If the cards shown from the Deck contain two or more {{red:"1st Year"}} Members, do I have to pick two cards to add to my Hand?`,
                    answer: `No. You can pick up to two cards, so you can add two Members, just one Member or no Members at all to your Hand.`
                }
            ]
        }, {
            subjects: ["LL10-059", "LL10-060"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `When exactly is the "If everyone of "Saint Aqours Snow" is on your Stage" requirement met?`,
                    answer: `You must have at least one card of each of these Members on your Stage: {{red:"Chika"}}, {{red:"Riko"}}, {{red:"Kanan"}}, {{red:"Dia"}}, {{red:"You"}}, {{red:"Yoshiko"}}, {{red:"Hanamaru"}}, {{red:"Mari"}}, {{red:"Ruby"}}, {{red:"Sarah"}} and {{red:"Leah"}}.`
                }
            ]
        }, {
            subjects: ["LL10-061"],
            seeAlso: ["/faq/general#member_counting"]
        }, {
            subjects: ["LL10-062"],
            seeAlso: ["/faq/general#join_success_order"],
            qa: [
                {
                    question: `What if Members other than the ones mentioned in the Skill join the ⟪LIVE⟫?`,
                    answer: `As long as there is a {{red:"Sarah"}} card with [COOL] and a {{red:"Leah"}} card with [COOL] joining, the Any Piece requirement is reduced by two, regardless of what other Members join.`
                }
            ]
        }, {
            subjects: ["LL10-063"],
            seeAlso: ["/faq/general#member_counting"],
            qa: [
                {
                    question: `I performed a ⟪LIVE⟫ with this Song card with two Members joining, who originally had three Pieces in total, but gained a fourth Piece from a [Live Join] Skill. Does this meet the "they must have four or more Pieces in total" requirement?`,
                    answer: `Yes. The Pieces gained from [Live Join] Skills remain for the rest of the match, so the Pieces will still be counted in the [While Live] Skill of this card and you will not lose a Live Point.`
                }
            ]
        }, {
            subjects: ["LL10-064"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"]
        }, {
            subjects: ["LL10-065"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"]
        }, {
            subjects: ["LL10-066"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"]
        }, {
            subjects: ["LL10-067"],
            seeAlso: ["/faq/general#members_on_stage"],
            qa: [
                {
                    question: `When performing a ⟪LIVE⟫ with this Song card, is it included when counting face-up Song cards in your Set List?`,
                    answer: `Yes. This card is counted, too.`
                }
            ]
        }, {
            subjects: ["LL10-068"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order", "/faq/general#member_counting"]
        }, {
            subjects: ["LL10-069"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"]
        }, {
            subjects: ["LL10-070"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order", "/faq/general#member_counting"]
        }, {
            subjects: ["LL10-071"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"]
        }, {
            subjects: ["LL10-072"],
            seeAlso: ["/faq/general#members_on_stage", "/faq/general#join_success_order"]
        }, {
            subjects: [{"from": "LL10-073", "to": "LL10-090"}],
            seeAlso: ["/faq/general#join_success_order", "/faq/general#flip_before_skills"]
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