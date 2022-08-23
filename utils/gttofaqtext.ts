import fs from "fs";
import Card from "../models/card/card";
import DB from "../models/db";

const faqname = "LL06";
let tlresult = `- LL06-028 SR [Chika Takami] ~ LL06-036 SR [Ruby Kurosawa]

●Who are the “members on stage”?
-LL06-046 HR [Chika Takami]

Q. When this card was 《Enter》, I only had one card in my hand. I want to have 0 cards in my hand, so is it possible to put only 1 card on the bottom of the deck?
A. No. You cannot put only one card on the bottom of your deck.

Q. This card 《Enter》 in a situation where there is no card in the deck. Can this skill be used to 《Enter》 a card placed in the deck?
A. yes. Of the two cards placed in the deck from the hand, the upper card will be "appeared" as it is.
●LL06-047 HR [Riko Sakurauchi]

●Who are the “members on stage”?

Q. What does "There are two or more face-up music cards" mean?
A. Count the types of music card colors (red, green, blue, yellow) in your set list, and if there are two or more colors, the condition is met.
For example, if there are EX03-028 "Is your heart shining?", LL04-064 "Aozora Jumping Heart", and LL06-058 "Jingle bells don't stop", the breakdown of colors is "green, yellow, yellow". , there are two colors.
●LL06-048 HR [Kanan Matsuura]

Q. What happens if I Enter when I have 2 or less cards in my deck?
A. If you have 2 cards in your deck, show 2 cards, add one to your hand, and place the other on the bottom of your deck.
If you put "Kanan" on the bottom, you can 《Enter》 "Kanan" with 【LIVE】 from your hand.
If there is only one card in your deck, you can show it and add it to your hand, but since you can't put a card on the bottom of your deck, "Kanan" with [LIVE] can't 《Appear》 from your hand. (You cannot choose not to add one card to your hand.)
If the deck is 0 cards, nothing happens.
-LL06-049 HR [Dia Kurosawa]

Q. Does "Appear from hand" include "Appear" by [RUSH] and "Appear" by skills such as LL04-048 "Kanan Matsuura"?
A. yes. This includes not only "Appearance" as an action performed on the turn, but also "RUSH" and various skills.
- LL06-050 HR [Watanabe You]

● What is the status of "Waiting"?

●Is there an order to do things within the same skill?

Q. What do you mean by "If there are 3 or more costumes for the waiting 'You'?"
A. Count the types of "live costumes" on the bottom left of the member card.
If there are members of "Aozora Jumping Heart", "Aozora Jumping Heart", "Kimi no Kokoro wa Kagayaiterukai?", "Kimi no Kokoro wa Kagayaterukai?" There are different kinds.

Q. When performing a Live with this card's skill, do I have to participate in the live costume "Week" that I referred to?
A. No. Participation is not required.

Q. Not all of the waiting members are "Week", but there are 3 or more types of live costumes for "Week".
In this case, can I 《Live》 with this skill?
A. No. If the first condition is not satisfied, nothing will be done after "further ~".
●LL06-051 HR [Yoshiko Tsushima]

● What if a member has more than one skill?

●How should I count the number of members?

Q. What do you mean by "If you weren't resting your turn in this game" or "If you weren't resting your turn"?
A. Mainly by card skills (example: LL01-071 "No brand girls" / "START: DASH!!", LL04-051 "Yoshiko Tsushima")
"Rest one (or more) of your turns. ] more than once,
It will be "I was resting my turn in this game". Conversely, if you didn't go, it means you didn't rest your turn.

Q. Can I 'rest my turn' by intentionally not performing an action on my turn?
A. No. Please do either "appearance", "invitation" or "live".
-LL06-052 HR [Hanamaru Kunikida]

● [When participating in the live] [When the live is successful] What is the order of skills?

Q. If 2 or more of this card participate in the same 《Live》, will all of those pieces become 【All】?
A. yes. Each makes the 【Smile】 of the other "Hanamaru" into 【All】, so in the end all the "Hanamaru" pieces become 【All】.
●LL06-053 HR [Mari Ohara]

● What if a member has more than one skill?

● What if the top card of the deck is turned face up?

● [When participating in the live] [When the live is successful] What is the order of skills?
-LL06-054 HR [Ruby Kurosawa]

Q. Does "Appear from the deck" include "Appear" by skills such as LL04-054 "Ruby Kurosawa"?
A. yes. This includes not only "Appearance" as an action performed on the turn, but also by skill.

Q. If I use Ruby's skill to 《Enter》 from my deck, can I still 《Enter》 the card I drew first?
A. yes. You can 《appear》.
-LL06-058 M [Jingle Bells Can't Stop]

●Which comes first, opening the song or the [Successful Live] skill?

Q. What does "Member with the fewest member cards participating in this [Live]" mean?
A. Count the number of participating member cards for each member with a different name participating in this "live".
For example, if "Chika" has 3 cards, "You" has 2 cards, and "Riko" has 1 card, "Riko" will be the member with the fewest participating member cards.

Q. Can I choose 0 members for "Member with the fewest participating member cards"?
A. No. You cannot choose a member who has not participated in even one card.

Q. If there are multiple "members with the fewest participating member cards", can multiple members with different names be selected and "appeared"?
A. No. Please choose one member from among the fewest members. Other members cannot 《Appear》.
-LL06-059 M [Holy Day Prayer]

Q. In a two-player game, can the second player use skills?
A. yes. Regardless of how many people are participating in the game, the condition is satisfied if the order to take the turn is the last.

Q. The game was played by 3 people, and the 3rd player won. After that, can the 2nd player use the skill?
A. No. We only look at the order decided in the game preparation, so the last player will not be moved up by winning.
● LL06-061 M “Because the sky and heart will be clear”

● What if you use a skill to turn face-up cards in the set list face-down?

● [When participating in the live] [When the live is successful] What is the order of skills?
● LL06-062 M "Waku-Waku-Week!"

● [When participating in the live] [When the live is successful] What is the order of skills?`;

tlresult = tlresult.replace(/^-/gm, "●");
tlresult = tlresult.replace(/^● /gm, "●");
tlresult = tlresult.replace(/\n\n/g, "\n");
tlresult = tlresult.replace(/^Q. /gm, "Q.");
tlresult = tlresult.replace(/^A. /gm, "A.");
tlresult = tlresult.replace(/ ~ /gm, "~");

let faqresult = `<%- include("../partials/header", {"title": "${faqname} FAQ &bull; How To Play", "styles": ["faq", "skill"]}); %>

<div class="content">
    <div class="panel">
        <div class="panel-inner">
            <h4>${faqname} Frequenty Asked Questions</h4>
`;

(async () => {
    await DB.syncPromise;
    let cursetno: string | undefined = undefined;
    while (tlresult.length > 0) {
        let nlindex = tlresult.indexOf("\n");
        const line = (nlindex !== -1) ? tlresult.substring(0, nlindex) : tlresult;

        if (line.startsWith("●LL") || line.startsWith("●EX") || line.startsWith("●PR")) {
            cursetno = undefined;
            if (line.indexOf("~") !== -1) {
                const links = [];
                for (const cardname of line.substring(1).split("~")) {
                    const cardno = cardname.split(" ")[0];
                    if (cursetno === undefined) cursetno = cardno.split("-")[1];
                    const c: Card | null = await DB.Card.findByPk(cardno);
                    if (c === null) {
                        links.push("<a href=\"/card/" + cardno + "/\">" + cardno + "\"</a>");
                    } else {
                        links.push("<a href=\"/card/" + cardno + "/\">" + c.cardNo + " \"" + c.nameEng + "\"</a>");
                    }
                }
                faqresult += "\n            <h5>"+links.join(" to ") + "</h5>\n";
            } else {
                const cardno = line.substring(1).split(" ")[0];
                cursetno = cardno.split("-")[1];
                const c: Card | null = await DB.Card.findByPk(cardno);
                if (c === null) {
                    faqresult += "\n            <h5><a href=\"/card/" + cardno + "/\">" + cardno + "\"</a></h5>\n";
                } else {
                    faqresult += "\n            <h5><a href=\"/card/" + cardno + "/\">" + c.cardNo + " \"" + c.nameEng + "\"</a></h5>\n";
                }
            }
        } else if (line.startsWith("●")) {
            faqresult += `            <div class="seealso">
                See also: <a href="/faq/general#">${line.substring(1)}</a>
            </div>
`;
        } else if (line.startsWith("Q.")) {
            const aindex = tlresult.indexOf("\nA.");
            const question = tlresult.substring(2, aindex).replace(/\n/g, "<br>\n                ");
            const nqindex = tlresult.indexOf("\nQ.", aindex + 1);
            const nbindex = tlresult.indexOf("\n●", aindex + 1);
            nlindex = (nqindex === -1) ? nbindex : ((nbindex === -1) ? nqindex : Math.min(nqindex, nbindex));
            const answer = tlresult.substring(aindex + 3, nlindex === -1 ? undefined : nlindex).replace(/\n/g, "<br>\n                ");

            faqresult += `            <div class="question" id="${cursetno}">
                ${question}
            </div>
            <div class="answer">
                ${answer}
            </div>
`;
        }

        tlresult = (nlindex !== -1) ? tlresult.substring(nlindex + 1) : "";
    }

    faqresult += `        </div>
    </div>
</div>
<%- include("../partials/footer", {"jquery": false, "scripts": []}); %>`;

    fs.writeFileSync("frontend/views/faq/" + faqname.toLowerCase() + ".ejs", faqresult);
})();