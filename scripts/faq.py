#!/usr/bin/python

# Script to create a JSON skeleton out of the original FAQ text
# Copypaste everything from the official site into the faq variable
# You can then use the JSON skeleton in the FAQ +page.server.ts and translate things there

faq = """●LL17-046 HR 「高海 千歌」/●LL17-076 SEC 「高海 千歌」

Q．このメンバーの【登場時】スキルで《勧誘》したとき、手札が４枚以上あってカードを引けなかった場合でも、デッキの１番上のカードを《登場》できますか？
A．はい。引いたカードの枚数が２枚以下という条件を満たすため、デッキの１番上のカードを《登場》できます。
●LL17-047 HR 「桜内 梨子」/●LL17-077 SEC 「桜内 梨子」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●コレクションってなに？
Q．このスキルで自分のセットリストにある裏向きの楽曲カードをコレクションに移動した場合、その楽曲カードを見てもいいですか？
A．はい。自分のコレクションにあるカードはいつでも見ることができます。あいてに見せる必要はありません。

Q．このスキルで自分のセットリストにある楽曲カードをコレクションに移動した結果、セットリストにある表向きの楽曲カードが０枚になりました。その後に《ライブ》を行うことはできますか？
A．いいえ。セットリストに表向きの楽曲カードが無い場合、《ライブ》を行うことはできません。また、このスキルで表向きの楽曲カードをコレクションに移動しても、セットリストにある裏向きの楽曲カードを表向きにすることはできません。そのため、裏向きの楽曲カードを表向きにしたり、コレクションから楽曲カードをセットリストに置くスキルを持つメンバーがいないときは、楽曲カードをコレクションに移動しない方が良いでしょう。
●LL17-048 HR 「松浦 果南」/●LL17-078 SEC 「松浦 果南」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．このメンバーのスキル『【ライブ参加時】このターンにこのメンバーが《登場》していたなら、【＋】【オール】する。』はどうしたら使用することができますか？
A．このメンバーの【RUSH】で、【LIVE】を持つメンバーやEX14-030「松浦 果南」のように《ライブ》をできるスキルを持つメンバーを《登場》し、《ライブ》に参加することで、このスキルを使用することができます。
●LL17-049 HR 「黒澤 ダイヤ」/●LL17-079 SEC 「黒澤 ダイヤ」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL17-050 HR 「渡辺 曜」/●LL17-080 SEC 「渡辺 曜」

●「待機中」ってどういう状態？
Q．このメンバーの【登場時】スキルは具体的にどういうことですか？
A．『あなたのほかの待機中のメンバー１人を裏向きでデッキの１番下に置く』条件を満たすと、あなたは手札から１枚かデッキの上から１枚を《登場》できます。またこの方法でステージに出たメンバーがライブ衣装を持つならカードを２枚引けます。
●LL17-051 HR 「津島 善子」/●LL17-081 SEC 「津島 善子」

Q．LL15-015「津島　善子」のように、ピース１個とボーナスを持つ場合、『ピースをちょうど１個持つ』の条件を満たしますか？
A．ボーナスが有効になっていない場合は条件を満たします。ボーナスが有効になっている場合、ピースを２個持つメンバーとなり、条件を満たしません。

Q．LL16-051「津島 善子」のように、ピース１個と覚醒アイコンのピースを持つ場合、『ピースをちょうど１個持つ』の条件を満たしますか？
A．はい。手札のメンバーは覚醒しておらず覚醒アイコンのピースは有効ではないため、条件を満たします。
●LL17-052 HR 「国木田 花丸」/●LL17-082 SEC 「国木田 花丸」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL17-053 HR 「小原 鞠莉」/●LL17-083 SEC 「小原 鞠莉」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL17-054 HR 「黒澤 ルビィ」/●LL17-084 SEC 「黒澤 ルビィ」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．『【登場時】/【ライブ成功時】』とは、どういうことですか？
A．このメンバーが《登場》したときと、このメンバーが参加した《ライブ》が成功したときの両方でこのスキルを使用できます。
●LL17-055 M 「Fantastic Departure!」/●LL17-085～087 GR 「Fantastic Departure!」

Q．この楽曲カードの《ライブ》に、《登場》した時に【RUSH】を選んだLL16-064「高海　千歌」が参加する場合、この楽曲カードのスキル『【RUSH】を持つメンバーが参加するなら』と『【LIVE】を持つメンバーが参加するなら』の両方の条件を満たせますか？
A．はい。１人のメンバーが【RUSH】と【LIVE】の両方のアイコンを持っている場合、２つのスキルの条件をそれぞれ満たし、共通スコアは合計で４減ります。そのメンバーが《登場》した時に【RUSH】と【LIVE】のどちらを選んでいても問題ありません。
●LL17-057 M 「Dazzling White Townl」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．『「Saint Snow」のメンバーをそれぞれ１人まで《登場》してよい』とは具体的にどういうことですか？
A．「聖良」を１人まで、「理亞」を１人までそれぞれ《登場》できます。２人を１枚ずつ《登場》することも、「聖良」か「理亞」のどちらか１人を《登場》することも可能です。
●LL17-058 M 「JIMO-AI Dash!」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL17-059 M 「Future flight」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●楽曲を開くのと【ライブ成功時】スキルはどちらが先？
●「μ’s」の楽曲カードと「Aqours」の楽曲カードはどれのこと？
Q．このカードのスキルより前に、LL12-048 「松浦 果南」のスキル等によって裏向きにしていた楽曲カード（ほかの裏向きの楽曲カードとは区別されているもの）も、ほかの裏向きの楽曲カードと一緒に混ぜなければいけませんか？
A．はい。ほかのスキル等で裏向きにしたカードも含めて、すべての裏向きの楽曲カードを混ぜます。
●LL17-060 M 「キモチもユメも一緒だね！」

Q．この楽曲カードの《ライブ》に、【☆】の数が同じ「花丸」と「ルビィ」の２人以外に下記のメンバーが参加する場合、スキルの条件を満たしますか？
①「花丸」「ルビィ」以外のメンバーも参加する場合
②【☆】の数が同じ「花丸」「ルビィ」とは【☆】の数が異なる「花丸」や「ルビィ」も参加する場合
A．はい。①、②どちらの場合も、【☆】の数が同じ「花丸」と「ルビィ」の２人が参加していれば、他のメンバーに関わらず、共通スコアが３減ります。
●LL17-061 M 「涙が雪になる前に」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．この楽曲の《ライブ》に、スキルに指定された以外のメンバーが参加する場合、スキルの条件を満たしますか？
A．はい。【クール】を持つ「果南」と、【クール】を持つ「鞠莉」の２人が参加していれば、他のメンバーに関わらず、共通スコアが３減ります。
●LL17-062 M 「Misty Frosty Love」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．この楽曲カードの【ライブ参加時】スキルの条件は具体的にどういうことですか？
A．この《ライブ》に参加する「梨子」と「曜」が持つピースの種類が重複していなければ、条件を満たします。
例えば、「梨子」が【スマイル】【クール】、「曜」が【ピュア】【オール】を持っている場合は条件を満たします。
一方、「梨子」が【クール】【オール】、「曜」が【ピュア】【オール】を持っている場合、２人が同じ種類のピース（【オール】）を持つため条件を満たしません。【オール】を好きなピースの１つとして別々のピースのように扱うことはできません。

Q．この楽曲カードの《ライブ》に参加する「梨子」や「曜」がボーナスや覚醒アイコンのピースを持つ場合、どうなりますか？
A．ボーナスや覚醒アイコンのピースが有効である場合は、それらのピースを含めてお互いの持つピースを比べます。
●LL17-063 M 「Party! Party! PaPaPaParty!」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●楽曲を開くのと【ライブ成功時】スキルはどちらが先？
Q．【ライブ成功時】スキルでLL12-056「未熟DREAMER」が表向きになりました。『手札から【☆】を持たないメンバー１人を《登場》してよい。』を行う前に、LL12-056「未熟DREAMER」の【オート】スキルを行えますか？
A．いいえ。１つのスキルが終わるまで、他のスキルは行えません。
●LL17-064 M 「smile smile ship Start!」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●【ライブ参加時】に増えたり変わったりしたピースはその後どうなる？
●LL17-065 M 「心の羽よ君へ飛んでけ！」

●メンバーの数え方はどうすればいいの？
Q．この楽曲の《ライブ》に、スキルに指定された以外のメンバーが参加する場合、スキルの条件を満たしますか？
A．はい。この《ライブ》に「Aqours」のメンバーが２人以上参加するなら、他に「μ’s」や「Saint Snow」のメンバーが参加する場合も共通スコアが２減ります。
●LL17-066 M 「DREAMY COLOR」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．この楽曲カードの《ライブ》に参加したメンバーが、【スマイル】×６、【オール】×１のピースを持っていました。この場合、共通スコアは５減りますか？
A．いいえ。この楽曲カードのスキルでは、【スマイル】、【ピュア】、【クール】、【オール】のいずれかのピースのみを持っているかを判定します。【オール】を好きなピースの１つとして扱うことはできません。
●LL17-067 SP 「高海 千歌」 ～ LL17-075 SP 「黒澤 ルビィ」　

●コレクションってなに？
Q．『【スタート時】/【登場時】』とは、どういうことですか？
A．このメンバーをスタートメンバーにしてゲームを始めたときと、このメンバーが《登場》したときの両方でこのスキルを使用できます。"""

import json, random

faq = [x.strip() for x in faq.split("\n")] + ["●LLEND"]
i = 0
curSec = { "subjects": [] }
res = []
while i < len(faq):
    if len(faq[i]) == 0:
        i += 1
        continue
    if faq[i][:3] == "●LL" or faq[i][:3] == "●EX" or faq[i][:3] == "●PR":
        if "seeAlso" in curSec or "qa" in curSec:
            if "qa" in curSec and len(curSec["qa"]) > 1:
                curSec["qa"] = [{"key": str(random.random())[2:], "question": qa["question"], "answer": qa["answer"]} for qa in curSec["qa"]]
            res.append(curSec)
            curSec = { "subjects": [] }
        subjlen = 6 if faq[i][:3] == "●PR" else 8
        if "～" in faq[i]:
            subjs = [x.strip() for x in faq[i][1:].split("～")]
            curSec["subjects"].append({
                    "from": subjs[0][:subjlen],
                    "to": subjs[1][:subjlen]
                })
        elif "/" in faq[i]:
            subjs = [x.strip() for x in faq[i].split("/")]
            for partsubj in subjs:
                curSec["subjects"].append(partsubj[1:1+subjlen])
        else:
            curSec["subjects"].append(faq[i][1:1+subjlen])
        i += 1
    elif faq[i][0] == "●":
        if not "seeAlso" in curSec: curSec["seeAlso"] = []
        if faq[i] == "●「ステージにいるメンバー」って誰のこと？": curSec["seeAlso"].append("/faq/general#members_on_stage")
        elif faq[i] == "●コレクションってなに？": curSec["seeAlso"].append("/faq/general#collection")
        elif faq[i] == "●「μ’s」の楽曲カードと「Aqours」の楽曲カードはどれのこと？": curSec["seeAlso"].append("/faq/general#muse_and_aqours_song_cards")
        elif faq[i] == "●セットリストにある表向きの楽曲カードが増えていたら？": curSec["seeAlso"].append("/faq/general#more_faceup_songs")
        elif faq[i] == "●メンバーの数え方はどうすればいいの？": curSec["seeAlso"].append("/faq/general#member_counting")
        elif faq[i] == "●「待機中」ってどういう状態？": curSec["seeAlso"].append("/faq/general#stand_by")
        elif faq[i] == "●【ライブ参加時】【ライブ成功時】スキルの順番は？": curSec["seeAlso"].append("/faq/general#join_success_order")
        elif faq[i] == "●楽曲を開くのと【ライブ成功時】スキルはどちらが先？": curSec["seeAlso"].append("/faq/general#flip_before_skills")
        elif faq[i] == "●スコアよりも多いピースで《ライブ》してもいい？": curSec["seeAlso"].append("/faq/general#live_non_exact")
        elif faq[i] == "●メンバーが２つ以上のスキルを持っていたら？": curSec["seeAlso"].append("/faq/general#skill_order_multiple_skills")
        elif faq[i] == "●ペアってどういうこと？": curSec["seeAlso"].append("/faq/general#group")
        elif faq[i] == "●スキル欄が２つあるメンバーのスキルはなに？": curSec["seeAlso"].append("/faq/general#group_skill_field")
        elif faq[i] == "●デッキの１番上のカードを表向きにしたら？": curSec["seeAlso"].append("/faq/general#top_deck_card_faceup")
        elif faq[i] == "●スキルでセットリストにある表向きのカードを裏向きにしたら？": curSec["seeAlso"].append("/faq/general#no_shuffle_facedown_song")
        elif faq[i] == "●【ライブ参加時】に増えたり変わったりしたピースはその後どうなる？": curSec["seeAlso"].append("/faq/general#live_join_pieces")
        elif faq[i] == "●カードが２つ以上のスキルを持っていたら？": curSec["seeAlso"].append("/faq/general#skill_order_multiple_skills")
        elif faq[i] == "●カード（メンバー）が２つ以上のスキルを持っていたら？": curSec["seeAlso"].append("/faq/general#skill_order_multiple_skills")
        elif faq[i] == "●トリオってどういうこと？": curSec["seeAlso"].append("/faq/general#group")
        elif faq[i] == "●【特別練習】、覚醒ってどういうこと？": curSec["seeAlso"].append("/faq/general#idolization")
        elif faq[i] == "●覚醒ってどういうこと？": curSec["seeAlso"].append("/faq/general#idolization")
        elif faq[i] == "●裏向きになったメンバーカードはどうなるの？": curSec["seeAlso"].append("/faq/general#member_facedown")
        elif faq[i] == "●スキルに①、②と書かれていたら？": curSec["seeAlso"].append("/faq/general#do_either")
        else: raise Exception("Add link for this See Also (line " + str(i+1) + "): " + faq[i])
        i += 1
    else:
        if faq[i][0] != "Q" and faq[i][0] != "Ｑ": raise Exception("Expected question, but wasn't (line " + str(i+1) + "): " + faq[i])
        q = [faq[i][2:].strip()]
        i += 1
        while faq[i][0] != "A" and faq[i][0] != "Ａ":
            q.append(faq[i].strip())
            i += 1
        
        a = [faq[i][2:].strip()]
        i += 1
        while len(faq[i]) > 0 and faq[i][0] != "Q" and faq[i][0] != "Ｑ" and faq[i][0] != "●":
            a.append(faq[i].strip())
            i += 1
        
        if not "qa" in curSec: curSec["qa"] = []
        curSec["qa"].append({
            "question": "<br>".join(q),
            "answer": "<br>".join(a)
        })

# Not outputting straight via json.dumps - instead making sure it matches the format already used for other FAQ JSON
print(",")
print("    \"SET\": [")
print("        {")
for i in range(len(res)):
    if i > 0:
        print("        }, {")
    print("            subjects: " + json.dumps(res[i]["subjects"]) + ",")
    if "seeAlso" in res[i]:
        print("            seeAlso: " + json.dumps(res[i]["seeAlso"]) + ("," if "qa" in res[i] else ""))
    if "qa" in res[i]:
        l = ["            " + x.encode("utf-8").decode("unicode-escape").replace('"key"', 'key').replace('"question"', 'question').replace('"answer"', 'answer').replace('"', '`') for x in json.dumps(res[i]["qa"], indent=4).split("\n")]
        l[0] = "            qa: " + l[0].strip()
        for ll in l: print(ll)
print("        }")
print("    ]")
