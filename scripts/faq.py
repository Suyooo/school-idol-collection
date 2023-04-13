#!/usr/bin/python

# Script to create a JSON skeleton out of the original FAQ text
# Copypaste everything from the official site into the faq variable
# You can then use the JSON skeleton in the FAQ +page.server.ts and translate things there

faq = """●LL10-046 HR 「高海 千歌」

●「ステージにいるメンバー」って誰のこと？
●セットリストにある表向きの楽曲カードが増えていたら？

Q．セットリストに裏向きのカードが１枚もない場合、このメンバーのスキルで『あなたのセットリストにある裏向きのカード１枚を表向きにする。』を選べますか？
A．はい。その場合は何も起こらずにスキルが終了します。
同様に、デッキの枚数が２枚より少ない場合に『カードを２枚引く。』を、手札にライブ衣装で【☆】を持たないメンバーがいない場合に『手札からライブ衣装で【☆】を持たないメンバー１人を《登場》してよい。』を選ぶことができます。
●LL10-047 HR 「桜内　梨子」

●「ステージにいるメンバー」って誰のこと？
●コレクションってなに？
●「μ’s」の楽曲カードと「Aqours」の楽曲カードはどれのこと？
●セットリストにある表向きの楽曲カードが増えていたら？

Q．セットリストにある楽曲カードや、すでにライブ中の楽曲カードと同名の楽曲カードをセットリストに置くことはできますか？
Ａ．はい。まったく同じ楽曲カードでも、同名でIDの異なる楽曲カードでもセットリストに置くことができます。
●LL10-048 HR 「松浦　果南」

●メンバーの数え方はどうすればいいの？

Q．『あなたのライブ中のメンバー』と書かれているスキルを持つカードはどれですか？
Ａ．2019年3月現在、以下のカードが該当します。
・LL08-048「松浦 果南」
・LL12-046「高海 千歌」

Q．このメンバーとLL08-048「松浦 果南」が同じ《ライブ》に参加しました。LL08-048「松浦 果南」の【ライブ成功時】スキルで『あなたのライブ中のメンバー』を数えるとき、このメンバーのスキルで２倍数えますか？
Ａ．はい。【ライブ中】スキルは【ライブ成功時】スキルの時点ですでに有効なので、２倍数えます。

Q．ライブ中のLL10-048「松浦 果南」が２人以上いる場合、１人ごとに『あなたのライブ中のメンバー』を２倍数えますか？
Ａ．はい。ライブ中のLL10-048「松浦 果南」が２人いれば４倍、３人いれば８倍と数えます。
●LL10-049 HR 「黒澤　ダイヤ」

●メンバーの数え方はどうすればいいの？

Q．【☆】を持つ『３年生』は、LL10-049「黒澤 ダイヤ」自身も数えますか？
Ａ．はい。LL10-049「黒澤 ダイヤ」を含めて、【☆】を持つ『３年生』が３人以上参加していれば＋【オール】します。
●LL10-050 HR 「渡辺 曜」

●「ステージにいるメンバー」って誰のこと？

Q．【登場時】スキルは、具体的にどうすればいいですか？
A．あなたのステージにいるメンバーと同じライブ衣装で【☆】を持たないメンバーを手札から《登場》できます。
例として、ライブ衣装がそれぞれ「青空Jumping Heart」「青空Jumping Heart」「君のこころは輝いてるかい？」「君のこころは輝いてるかい？」「恋になりたいAQUARIUM」のメンバーがステージにいる場合、ライブ衣装が「青空Jumping Heart」で【☆】を持たないメンバー１人までと、ライブ衣装が「君のこころは輝いてるかい？」で【☆】を持たないメンバー１人までと、ライブ衣装が「恋になりたいAQUARIUM」で【☆】を持たないメンバー１人までを手札から《登場》できます。
●LL10-051 HR 「津島 善子」

●メンバーの数え方はどうすればいいの？
●「待機中」ってどういう状態？
●LL10-052 HR 「国木田 花丸」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●楽曲を開くのと【ライブ成功時】スキルはどちらが先？
●スコアよりも多いピースで《ライブ》してもいい？

Q．《ライブ》している楽曲カードのスコアがスキルによって変更されていた場合、このメンバーのスキルではどのスコアを見ますか？ また、この《ライブ》に参加しているメンバーのピースがスキルによって増えていた場合、どのように数えますか？
Ａ．《ライブ》している楽曲カードのスコアが変更されていた場合、変更された後のスコアを見ます。同様に、参加しているメンバーのピースがスキルで増えていた場合、それらのピースも合計に数えます。

Q．『《ライブ》している楽曲カード』は、この《ライブ》より前からライブ中だったほかの楽曲カードも含まれますか？
Ａ．いいえ。このメンバーが参加して《ライブ》している楽曲カードのスコアと、この《ライブ》に参加しているメンバー全員が持つピースの合計を比べます。
●LL10-053 HR 「小原　鞠莉」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●楽曲を開くのと【ライブ成功時】スキルはどちらが先？

Q．このメンバーと、【オール】を持たないメンバーが《ライブ》に参加します。【オール】を持たないメンバーが【ライブ参加時】スキルで＋【オール】された場合、その追加されたピースで『【オール】を持つほかのメンバーが参加しているなら、』の条件を満たしますか？
Ａ．はい。【ライブ参加時】スキル等で＋【オール】されたり、他のピースが【オール】になっていた場合、このスキルの条件を満たします。
●LL10-054 HR 「黒澤 ルビィ」

Q．同じ名前の『1年生』のメンバー２人を手札に加えることはできますか？
Ａ．はい。名前に関わらず『１年生』であれば２人まで手札に加えることができます。

Q．『１年生』のメンバーが２人以上公開された場合、必ず２枚手札に加えなければなりませんか？
Ａ．いいえ。２枚手札に加えることも、１枚も手札に加えないことも選ぶことができます。
●LL10-059 SSR 「鹿角　聖良」
●LL10-060 SSR 「鹿角　理亞」

●【ライブ参加時】【ライブ成功時】スキルの順番は？

Q．『あなたのステージに「Saint Aqours Snow」のメンバー全員がそろっているなら』は、具体的にどうなれば満たしますか？
Ａ．あなたのステージに「千歌」「梨子」「果南」「ダイヤ」「曜」「善子」「花丸」「鞠莉」「ルビィ」「聖良」「理亞」全員がそろっていれば満たします。
●LL10-061 M 「Awaken the power」

●メンバーの数え方はどうすればいいの？
●LL10-062 M 「CRASH MIND」

●【ライブ参加時】【ライブ成功時】スキルの順番は？

Q．この楽曲の《ライブ》に、スキルに指定された以外のメンバーが参加する場合、どうなりますか？
A．【クール】を持つ「聖良」と、【クール】を持つ「理亞」の２人が参加していれば、他のメンバーに関わらず、共通スコアが２減ります。
●LL10-063 M 「DROPOUT!?」

●メンバーの数え方はどうすればいいの？

Q．この《ライブ》に名前が異なるメンバーが２人参加し、その時点でピースは合計３個でしたが、【ライブ参加時】スキルで４個以上に増えました。この場合、『ピースを合計４個以上持っている』の条件を満たしますか？
Ａ．【ライブ参加時】スキルで増えたピースはこのゲームの間増えたままなので、この場合は『ピースを合計４個以上持っている』の条件を満たしており、♪ライブP－１♪されません。
●LL10-064 M 「One More Sunshine Story」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL10-065 M 「おやすみなさん！」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL10-066 M 「in this unstable world」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL10-067 M 「Pianoforte Monologue」

●「ステージにいるメンバー」って誰のこと？

Q．この楽曲カードを《ライブ》するとき、この楽曲カード自身は『あなたのセットリストにある表向きの楽曲カード』に含まれますか？
Ａ．はい。含まれます。
●LL10-068 M 「Beginner’s Sailing」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●メンバーの数え方はどうすればいいの？
●LL10-069 M 「RED GEM WINK」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL10-070 M 「WHITE FIRST LOVE」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●メンバーの数え方はどうすればいいの？
●LL10-071 M 「New winding road」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL10-072 M 「さかなかなんだか？」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL10-073 SP 「高海 千歌」 ～ LL10-090 SEC 「黒澤 ルビィ」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●楽曲を開くのと【ライブ成功時】スキルはどちらが先？"""

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
