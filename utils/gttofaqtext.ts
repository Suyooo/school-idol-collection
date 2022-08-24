import fs from "fs";
import Card from "../models/card/card";
import DB from "../models/db";

const faqname = "LL07";

if (fs.existsSync("server/frontend/views/faq/" + faqname.toLowerCase() + ".ejs")) {
    console.log("File already exists - not overwriting");
    process.exit(0);
}

let tlresult = `- LL07-037 SR [Chika Takami] ~ LL07-045 SR [Ruby Kurosawa]

● What is the status of "Waiting"?
- LL07-046 HR [Chika Takami]

Q. What happens if I Enter when I have 2 or less cards in my deck?
A. Even if there are 2 or less cards in the deck, add 1 member with [☆] from among them to your hand, and place the remaining cards on the bottom of the deck. If all the members you showed were members without a [☆], you cannot take another turn because you did not meet the condition of "showing three members without a [☆]".
●LL07-047 HR [Riko Sakurauchi]

Q. If there is only one face-up song card in the setlist, can a skill turn one face-down card face-up?
A. yes. Since it satisfies the condition that "(the face-up music cards in the setlist are all the same color)", you can turn one face-down card face-up.
●LL07-048 HR [Kanan Matsuura]

Q. What exactly do you mean by "having exactly the same piece"?
A. It means that "each member has the same type and number of pieces". The order of the pieces in the card does not matter, so you can "appear" members with [Smile] and [pure] skills, and [appear] members with [pure] and [smile] skills.

Q. If I 《Enter》 LL06-008 “Mari Ohara” who has a birthday bonus with this card’s skill, can I 《Enter》 LL07-053 “Yoshiko Tsushima” from my hand?
A. yes. When the birthday bonus is applied, the bonus pieces are always added, so in the example, LL07-053 "Yoshiko Tsushima" with the [Cool] and [All] pieces appears. I can do it.
-LL07-049 HR [Dia Kurosawa]

Q. Can I choose not to draw a card even if "Everyone draws a card" is chosen?
A. No. If "Everyone draws a card" is chosen, you and everyone will always draw a card.
- LL07-050 HR [You Watanabe]

Q. If I 《Enter》 when I have 0 cards in my deck, will the card I put on the bottom of my deck be 《Enter》 as it is?
A. yes. Look at the card placed at the bottom of the deck and "appear" one of the members, so the card you put will always "appear".
-LL07-052 HR [Hanamaru Kunikida]

●Is it OK if the condition is the same as "If more than"?
● [When participating in the live] [When the live is successful] What is the order of skills?
Q. Two people are playing a game and both have the same number of cards in their hand. In this situation, what happens if two or more of these cards participate in the same 《Live》?
A. The skill of the first player, Hanamaru, draws a card. The second and subsequent "Hanamaru" meet the condition "You have more cards in your hand than any other" at the time of skill, so + [all].
●LL07-053 HR [Mari Ohara]

Q. Can a member who does not have [All], but has a skill that + [All] such as [When participating in a live], use this card's skill to [Appear]?
A. No. Skills such as [When participating in a live] can only be used at the appropriate timing, so when you are in your hand, you are not a member with [All].

Q. [When Appearing] A member who has [Special Practice] with the skill is [appeared], and by becoming awakened, the number of [All] pieces has increased to 3 or more. In this case, can you draw 3 cards?
A. yes. This [When entering] skill counts the number of pieces after members appear on the stage. [Special Practice] If you are awakened by a skill, the awakening icon piece will be active when you appear on the stage, so the member will have 3 [All] pieces, including the awakening icon piece. If you have more than that, you meet the conditions.
-LL07-055 M [near future happy ending]

● What is the status of "Waiting"?
●Which comes first, opening the song or the [Successful Live] skill?
Q. At the time of "live" this song, I achieved the goal live P. If the conditions for the skill are met, can I continue to 《Live》?
A. No. Once the target live P is achieved, the winner will be eliminated, so "live" is not possible.

Q. What would happen if members other than "CYaRon!" participated in the "live" of this song?
A. If "Chika", "You", and "Ruby" are participating, the skill will be effective regardless of the other members.
-LL07-056M [GALAXY HidE and SeeK]

Q. LL05-053 "Mari Ohara" is playing this song while meeting the skill conditions and performing live, with members with [Smile], members with [Pure], and members with [Cool]. "I participated in. In this case, will the skill be +【All】?
A. No. The skill of this song changes all the [Smile], [Pure], and [Cool] pieces of the participating members to [All] before the [When participating in a live] skill. Therefore, in this case, +[all] is not performed.

Q. The member who participated in the "live" was given a + [smile] by the skill "When participating in the live" while the song was being played live with the skill conditions met. Does this piece also become [All] by skill?
A. yes. A piece becomes [all] when it is added.

Q. What will happen if members other than "AZALEA" participate in the "live" of this song?
A. As long as "Kanan", "Dia" and "Hanamaru" are participating, the skill will be effective regardless of the other members.
- LL07-057 M [Kowareyasuki]

● [When participating in the live] [When the live is successful] What is the order of skills?
●Which comes first, opening the song or the [Successful Live] skill?
Q. What exactly do you mean when you say "each person may appear"?
A. It means that "up to one "Riko", one "Yoshiko", and one "Mari" may appear". It is possible to 《Appear》 three people one by one, or to 《Appear》 one by one “Riko” and “Yoshiko”.

Q. What will happen if members other than "Guilty Kiss" participate in the "live" of this song?
A. If "Riko", "Yoshiko", and "Mari" are participating, the skill will be effective regardless of the other members.
●LL07-058M “Landing action Yeah!!”

●Who are the “members on stage”?
- LL07-059 M [Cinderella on the G line]

Q. If there are multiple pieces of this song in the live, will the target live P be added for each piece?
A. yes. It will be +1 for each song of this live.

Q. When the target live P was 9 points, this song was "live" and the live P became 9 points. Will this be a winner?
A. No. Since the target live P was +1, we need 1 more point.

Q. In a situation where there are 3 or more people playing and there is a player who has already won with 9 points, what will happen if this song is played "live"?
A. Players who have already won will remain victorious. The target live P of the remaining players is +1.

Q. The player who played this song "live" won. [During Live] Will the skill continue after that?
A. yes. The [During Live] skill continues until the end of this game.
- LL07-062 M [Thoughts become one]

●Who are the “members on stage”?
●How should I count the number of members?
●LL07-063M "HAPPY PARTY TRAIN"

●How should I count the number of members?
- LL07-064 SP [Chika Takami] ~ LL07-081 SEC [Ruby Kurosawa]

Q. [At the start] If multiple players have the starting members with skills face up, in what order should the skills be used?
A. Skills are used in order to advance the turn. Once everyone has used their skills, the player taking the first turn starts their turn.`;

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

    fs.writeFileSync("server/frontend/views/faq/" + faqname.toLowerCase() + ".ejs", faqresult);
})();