#!/usr/bin/python

# Script to create a JSON skeleton out of the original FAQ text
# Copypaste everything from the official site into the faq variable
# You can then use the JSON skeleton in the FAQ +page.server.ts and translate things there

faq = """●EX15-010 SR 「高坂 穂乃果」　～　EX15-018 SR「矢澤 にこ」

●「ステージにいるメンバー」って誰のこと？
●EX15-019 HR 「高坂 穂乃果」

●「ステージにいるメンバー」って誰のこと？

Q．私が１番手のプレイヤーで、ゲームの開始時にEX15-028「高坂 穂乃果」の【スタート時】スキルでメンバーを《登場》しました。続く最初のターンでこのメンバーを《登場》したら、【登場時】スキルで《ライブ》できますか？
A．いいえ。【スタート時】スキルはこのターンより前のゲームの準備で行いますので、『このターンにほかのメンバーが《登場》していたなら』の条件は満たしません。
●EX15-020 HR 「絢瀬 絵里」

●「ステージにいるメンバー」って誰のこと？
●EX15-021 HR 「南 ことり」

●「ステージにいるメンバー」って誰のこと？
●メンバーの数え方はどうすればいいの？
●EX15-022 HR 「園田 海未」
●EX15-024 HR 「西木野 真姫」
●EX15-026 HR　「小泉 花陽」
●EX15-027 HR 「矢澤 にこ」

●「ステージにいるメンバー」って誰のこと？
●EX15-023 HR 「星空 凛」

●「ステージにいるメンバー」って誰のこと？

Q．「ボーナス」を持ち、その条件を満たしているメンバーが表向きになりました。「ボーナス」のピースも数えますか？
A．はい。ボーナスの条件を満たしている場合は、そのピースも含めて数えます。条件を満たしていない場合は数えません。
例えば、LL13-005「星空 凛」が表向きになった場合、「ボーナス」の条件を満たしていれば２個、そうでなければ１個のピースを持ちます。
●EX15-025 HR　「東條 希」

●「ステージにいるメンバー」って誰のこと？

Q．デッキが１枚のときに、【登場時】スキルは行えますか？
A. はい。デッキが１枚の場合は、その１枚を全員に見せて手札に加えます。見せたメンバーが１人でも、【☆】を３個以上持つなら手札からメンバー１人を《登場》できます。
●EX15-E10 M 「Someday of my life」
●EX15-E16 M 「純愛レンズ」

●「ステージにいるメンバー」って誰のこと？
●EX15-E11 M 「ありふれた悲しみの果て」

●「ステージにいるメンバー」って誰のこと？
Q．『基本ライブP』とはどれのことですか？
A．楽曲カードの右上にある数字を指します。 「４＋１」のように追加ライブPが書かれている場合、左側の大きい数字のみを指します。
●EX15-E12 M 「ぶる～べりぃ♥とれいん」

●「ステージにいるメンバー」って誰のこと？
●メンバーの数え方はどうすればいいの？
●EX15-E13 M 「勇気のReason」

●「ステージにいるメンバー」って誰のこと？

Q．この楽曲カードを《ライブ》するとき、この楽曲カード自身は『あなたのセットリストにある表向きの楽曲カード』に含まれますか？
Ａ．はい。楽曲カードは、その《ライブ》が成功するまでセットリストにあります。
●EX15-E14 M 「恋のシグナルRin rin rin!」

●「ステージにいるメンバー」って誰のこと？
●メンバーの数え方はどうすればいいの？
●EX15-E15 M 「Daring!!」

●「ステージにいるメンバー」って誰のこと？

Q．この楽曲カードを《ライブ》するとき、この楽曲カード自身は『あなたのセットリストにある表向きの楽曲カード』に含まれますか？
Ａ．はい。楽曲カードは、その《ライブ》が成功するまでセットリストにあります。
●EX15-E17 M 「孤独なHeaven」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？

Q．【ライブ参加時】スキルで、【オール】のピースを【ピュア】の代わりに数えることはできますか？
A．いいえ。【オール】を含めずに【ピュア】３個以上を持っている必要があります。
●EX15-E18 M 「まほうつかいはじめました！」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？

Q．【ライブ参加時】スキルで、【オール】のピースを【スマイル】や【ピュア】や【クール】の代わりに数えることはできますか？
A．いいえ。【オール】を含めずに、【スマイル】１個以上、【ピュア】１個以上、【クール】１個以上を持っている必要があります。
●EX15-037 SP 「高坂 穂乃果」 ～ EX15-054 SEC 「矢澤 にこ」

Q．『【スタート時】/【登場時】』とは、どういうことですか？
A．このメンバーをスタートメンバーにしてゲームを始めたときと、このメンバーが《登場》したときの両方でこのスキルを使用できます。

Q．複数のプレイヤーが【スタート時】スキルを持つスタートメンバーを表向きにした場合、どのような順番でスキルを行えばいいですか？
A．ターンを進める順番でスキルを行います。全員がスキルを使い終わったら、最初のターンを行うプレイヤーからターンを始めてください"""

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
