#!/usr/bin/python

# Script to create a JSON skeleton out of the original FAQ text
# Copypaste everything from the official site into the faq variable
# You can then use the JSON skeleton in the FAQ +page.server.ts and translate things there

faq = """●EX04-001 SR「高海 千歌」～EX04-009 SR「黒澤 ルビィ」

●「ステージにいるメンバー」って誰のこと？
●PR-011「星空 凛」

●メンバーの数え方はどうすればいいの？
●PR-016「園田 海未」
●PR-020「小泉 花陽」
●PR-021「矢澤 にこ」

●「よりも～なら」という条件は、同じ場合でもＯＫ？
●PR-022「矢澤 にこ」

●「よりも～なら」という条件は、同じ場合でもＯＫ？
●PR-032「MOMENT RING」

●メンバーの数え方はどうすればいいの？
●PR-070「高坂 穂乃果」～PR-078「矢澤 にこ」

●「ステージにいるメンバー」って誰のこと？
●PR-106「高海 千歌」
●PR-111「津島 善子」
●PR-114「黒澤 ルビィ」

●メンバーの数え方はどうすればいいの？"""

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
        elif faq[i] == "●「よりも～なら」という条件は、同じ場合でもＯＫ？": curSec["seeAlso"].append("/faq/general#more_less")
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
