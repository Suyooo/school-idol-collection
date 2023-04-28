#!/usr/bin/python

# Script to create a JSON skeleton out of the original FAQ text
# Copypaste everything from the official site into the faq variable
# You can then use the JSON skeleton in the FAQ +page.server.ts and translate things there

faq = """●LL15-028 SR 「高海 千歌」～LL15-036 SR 「黒澤 ルビィ」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●LL15-037 SR 「高海 千歌」～LL15-045 SR 「黒澤 ルビィ」

●「ステージにいるメンバー」って誰のこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL15-046 SR 「鹿角 聖良」
●LL15-047 SR 「鹿角 理亞」

●「ステージにいるメンバー」って誰のこと？
●ペアってどういうこと？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL15-048 HR 「高海 千歌」
●LL15-077 SEC 「高海 千歌」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●LL15-049 HR 「桜内 梨子」
●LL15-078 SEC 「桜内 梨子」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●セットリストにある表向きの楽曲カードが増えていたら？
●LL15-050 HR 「松浦 果南」
●LL15-079 SEC 「松浦 果南」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●LL15-051 HR 「黒澤 ダイヤ」
●LL15-080 SEC 「黒澤 ダイヤ」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●スキルに①、②と書かれていたら？
●LL15-052 HR 「渡辺 曜」
●LL15-081 SEC 「渡辺 曜」

●コレクションってなに？
●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●スキルに①、②と書かれていたら？
●LL15-053 HR 「津島 善子」
●LL15-082 SEC 「津島 善子」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL15-054 HR 「国木田 花丸」
●LL15-083 SEC 「国木田 花丸」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●LL15-055 HR 「小原 鞠莉」
●LL15-084 SEC 「小原 鞠莉」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL15-056 HR 「黒澤 ルビィ」
●LL15-085 SEC 「黒澤 ルビィ」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●LL15-057 M 「SELF CONTROL!!」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL15-059 M 「Hop? Stop? Nonstop!」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL15-060 M 「Brightest Melody」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．『ピースを１種類だけ持つ』とはどういうことですか？
A．例えば、【スマイル】×２を持つメンバーや、【オール】×１を持つメンバーは、それぞれ【スマイル】のピース、【オール】のピースを１種類だけ持つので『ピースを１種類だけ持つ』メンバーです。
一方、【スマイル】×１と【オール】×１を持つメンバーは、【スマイル】と【オール】の２種類のピースを持つため『ピースを１種類だけ持つ』メンバーではありません。（【オール】を好きなピースの１つとして扱うことはできません。）
●LL15-061 M　「Over The Next Rainbow」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●メンバーの数え方はどうすればいいの？
●LL15-062 M 「Jump up HIGH!!」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●メンバーの数え方はどうすればいいの？
Q．「CYaRon！」のメンバーと「AZALEA」のメンバーがそれぞれ３人全員そろって参加しました。この場合、２つのユニットが参加しているので【ライブ成功時】スキルで引けるカードは６枚になりますか？
A．いいえ。２つ以上のユニットのメンバーがそれぞれ３人全員そろって参加した場合でも、この【ライブ成功時】スキルではカードを３枚だけ引きます。
●LL15-063 M 「未体験HORIZON」

●カード（メンバー）が２つ以上のスキルを持っていたら？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●【ライブ参加時】に増えたり変わったりしたピースはその後どうなる？
●LL15-064 M 「Deep Resonance」

●覚醒ってどういうこと？
●LL15-065 M 「Dance with Minotaurus」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
●LL15-066 SP 「高海 千歌」 ～ LL15-076 SP 「鹿角 理亞」

Q．『【スタート時】/【登場時】』とは、どういうことですか？
A．このメンバーをスタートメンバーにしてゲームを始めたときと、このメンバーが《登場》したときの両方でこのスキルを使用できます。

Q．複数のプレイヤーが【スタート時】スキルを持つスタートメンバーを表向きにした場合、どのような順番でスキルを行えばいいですか？
A．ターンを進める順番でスキルを行います。全員がスキルを使い終わったら、最初のターンを行うプレイヤーからターンを始めてください。
●LL15-088 GR 「元気全開DAY! DAY! DAY!」
●LL15-089 GR 「トリコリコPLEASE!!」
●LL15-090 GR 「Strawberry Trapper」
●LL15-091 GR 「SELF CONTROL!!」

Q．この楽曲カードは何色ですか？
A．以下の通り、レアリティがMで同じIDのカードとそれぞれ同じ色になります。
・LL15-088 GR 「元気全開DAY! DAY! DAY!」
⇒LL06-055 M 「元気全開DAY! DAY! DAY!」
・LL15-089 GR 「トリコリコPLEASE!!」
⇒LL06-056 M 「トリコリコPLEASE!!」
・LL15-090 GR 「Strawberry Trapper」
⇒LL06-057 M 「Strawberry Trapper」
・LL15-091 GR 「SELF CONTROL!!」
⇒LL15-057 M 「SELF CONTROL!!」"""

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
