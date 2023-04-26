#!/usr/bin/python

# Script to create a JSON skeleton out of the original FAQ text
# Copypaste everything from the official site into the faq variable
# You can then use the JSON skeleton in the FAQ +page.server.ts and translate things there

faq = """●LL13-037 SR 「高坂 穂乃果」　～　LL13-045 SR「矢澤 にこ」

         ●「待機中」ってどういう状態？
         ●LL13-046 HR 「高坂 穂乃果」

         Q．このメンバーが《登場》した時点で、手札が０枚でした。『手札から「μ’s」＠のメンバー１人を《登場》してよい。』でメンバーを《登場》しなくても、《勧誘》できますか？
         A．はい。『手札から「μ’s」＠のメンバー１人を《登場》してよい。』で《登場》したかどうかに関わらず、手札が０枚であれば《勧誘》できます。
         ●LL13-047 HR 「絢瀬 絵里」

         ●【ライブ参加時】【ライブ成功時】スキルの順番は？
         ●楽曲を開くのと【ライブ成功時】スキルはどちらが先？
         Q．LL02-075「冬がくれた予感／Trouble Busters」のように、ライブPに「３＋１」のように書いてある楽曲カードをライブ中なら、このスキルは有効ですか？
         A．はい。基本ライブＰと追加ライブＰの合計が４以上であれば有効です。ただし、追加ライブＰを獲得するための条件を満たしている必要があります。
         ●LL13-048 HR 「南 ことり」

         Q．『【RUSH】か【LIVE】かライブ衣装を持つ「μ’s」のメンバーをそれぞれ１人ずつ手札に加える。』とは、どういうことですか？
         A．【RUSH】を持つメンバー、【LIVE】を持つメンバー、ライブ衣装を持つメンバーを、それぞれ１人ずつ手札に加えます。いずれかを持つメンバーを複数選ぶことはできません。
         例えば、EX01-001「高坂 穂乃果」、LL13-053「小泉 花陽」、LL13-049「園田 海未」、LL02-012「南 ことり」をデッキの上から見せた場合、【RUSH】を持つメンバーとしてEX01-001「高坂 穂乃果」かLL13-053「小泉 花陽」のどちらか１人、【LIVE】を持つメンバーとしてLL13-049「園田 海未」、ライブ衣装を持つメンバーとしてLL02-012「南 ことり」を手札に加えます。
         ●LL13-049 HR 「園田 海未」

         ●セットリストにある表向きの楽曲カードが増えていたら？
         Q．このメンバーの【LIVE】によって《ライブ》するとき、このメンバーの【登場時】スキルで表向きになった楽曲カードを《ライブ》できますか？
         A．はい。できます。
         ●LL13-050 HR 「星空 凛」

         Q．このメンバーの【登場時】スキルは具体的にどういうことですか？
         A．【RUSH】は本来１ターンにつき１回まで手札からメンバーを《登場》できますが、このスキルを使用すると、２回目以降の【RUSH】でも、メンバーを《登場》できるようになります。
         例えば、このメンバーの【RUSH】によってLL13-032「星空 凛」を《登場》した場合、さらにLL13-032「星空 凛」の【RUSH】によって手札からメンバーを《登場》できます。逆に、ほかのメンバーの【RUSH】によってこのメンバーを《登場》した場合も、このメンバーの【RUSH】によって手札からメンバーを《登場》できます。
         ●LL13-052 HR 「東條 希」

         ●デッキの１番上のカードを表向きにしたら？
         ●LL13-053 HR 「小泉 花陽」

         ●楽曲を開くのと【ライブ成功時】スキルはどちらが先？
         Q．☆を３個以上持つライブ中のメンバーがいない状態で、このメンバーと☆を３個持つメンバーが一緒に《ライブ》に参加しました。この【ライブ成功時】スキルでカードを２枚引くことはできますか？
         A．はい。このメンバーの【ライブ成功時】スキルを使用するときには☆を３個以上持つライブ中のメンバーがいるので、条件を満たします。
         ●LL13-054 HR 「矢澤 にこ」

         ●【ライブ参加時】に増えたり変わったりしたピースはその後どうなる？
         ●【ライブ参加時】【ライブ成功時】スキルの順番は？
         ●楽曲を開くのと【ライブ成功時】スキルはどちらが先？
         Q．このメンバーの【ライブ成功時】スキルで、【オール】のピースを【スマイル】か【ピュア】か【クール】の代わりに数えることはできますか？
         A．いいえ。【オール】を含めずに、【スマイル】２個以上と【ピュア】２個以上と【クール】２個以上を持っている必要があります。
         ●LL13-055 M 「Snow halation」

         Q．この楽曲カードは何色ですか？
         A．オレンジです。
         この楽曲カードの色は赤、緑、青、黄とは異なります。例えばLL03-060「西木野 真姫」のスキルで『色が異なる表向きの楽曲カード』を数える場合、この楽曲カードは他の４色とは色が異なる１枚として数えます。（赤、緑、青、黄、オレンジの楽曲カードがある場合、色が異なる楽曲カードは５枚です。）
         ●LL13-056 M 「僕らは今のなかで」

         ●【ライブ参加時】に増えたり変わったりしたピースはその後どうなる？
         ●【ライブ参加時】【ライブ成功時】スキルの順番は？
         ●楽曲を開くのと【ライブ成功時】スキルはどちらが先？
         Q．元々【オール】を持たないメンバーがこの《ライブ》に参加し、【ライブ参加時】スキルで＋【オール】された場合、手札から【☆】を持たない「μ’s」のメンバーを《登場》できますか？
         A．いいえ。スキルで【オール】が追加されたり、別のピースが【オール】になった場合もスキルの条件を満たしません。

         Q．この楽曲カードのスキルの条件を満たしたいので、＋【オール】したり、ピースを【オール】に変更するスキルを意図的に使わないことはできますか？
         A．いいえ。そのスキルに『～してよい。』と書かれていない場合、必ず行います。
         ●LL13-057 M 「輝夜の城で踊りたい」

         ●カードが２つ以上のスキルを持っていたら？
         ●【ライブ参加時】【ライブ成功時】スキルの順番は？
         ●楽曲を開くのと【ライブ成功時】スキルはどちらが先？
         Q．楽曲カードがスキルを２つ以上持っている場合、条件を満たせば両方とも使えますか？
         A．はい。両方のスキルとも使うことができます。
         ●LL13-058 M 「Music S.T.A.R.T!!」

         ●カードが２つ以上のスキルを持っていたら？
         ●【ライブ参加時】【ライブ成功時】スキルの順番は？
         ●LL13-059 M 「小夜啼鳥恋詩」
         ●LL13-062 M 「春情ロマンティック」
         ●LL13-063 M 「PSYCHIC FIRE」

         ●「ステージにいるメンバー」って誰のこと？
         Q．「３人全員がそろって」とあるので、この楽曲カードはメンバーカードがステージにちょうど３枚でなければスキルの条件を満たしませんか？
         A．いいえ。３人ともそろっているなら、メンバーカードがステージに何枚あってもかまいません。
         ●LL13-060 M 「Super LOVE=Super LIVE!」

         ●「ステージにいるメンバー」って誰のこと？
         ●LL13-061 M 「HEART to HEART!」

         Q．スキルでLL13-055「Snow halation」の色をみる場合、どうすればいいですか？
         A．「オレンジ」として扱います。詳しくはLL13-055「Snow halation」の項目をご覧ください。
         ●LL13-064 ME 「μ’sの休日編 高坂 穂乃果」
         ●LL13-069 ME 「μ’sの休日編 西木野 真姫」
         ●LL13-070 ME 「μ’sの休日編 東條 希」

         Q．このメモリーはどのカードのスキルでステージに出せますか？
         A．以下のカードのスキルでステージに出せます。
         ・LL13-073「高坂 穂乃果」 ～　LL13-090「矢澤 にこ」

         Q．このメモリーの【オート】スキルと、《ライブ》に参加しているメンバーや楽曲カードの【ライブ成功時】スキルは、どういう順番で行えばいいですか？
         A．それらを好きな順番で使用できます。複数の【ライブ成功時】スキルがある場合は、【ライブ成功時】スキル、【オート】スキル、【ライブ成功時】スキルのような順番でも構いません。

         Q．《ライブ》している楽曲カードのスコアがスキルによって変更されていた場合、このメモリーのスキルではどのスコアを見ますか？ また、《ライブ》に参加しているメンバーのピースがスキルによって増えていた場合、どのように数えますか？
         A．《ライブ》している楽曲カードのスコアが変更されていた場合、変更された後のスコアを見ます。同様に、参加しているメンバーのピースがスキルで増えていた場合、それらのピースも合計に数えます。
         ●LL13-065 ME 「μ’sの休日編 絢瀬 絵里」
         ●LL13-066 ME 「μ’sの休日編 南 ことり」
         ●LL13-068 ME 「μ’sの休日編 星空 凛」

         Q．このメモリーはどのカードのスキルでステージに出せますか？
         A．以下のカードのスキルでステージに出せます。
         ・LL13-073「高坂 穂乃果」 ～　LL13-090「矢澤 にこ」

         Q．このメモリーの【オート】スキルと、《ライブ》に参加しているメンバーや楽曲カードの【ライブ参加時】スキルは、どういう順番で行えばいいですか？
         A．それらを好きな順番で使用できます。複数の【ライブ参加時】スキルがある場合は、【ライブ参加時】スキル、【オート】スキル、【ライブ参加時】スキルのような順番でも構いません。
         ●LL13-067 ME 「μ’sの休日編 園田 海未」
         ●LL13-071 ME 「μ’sの休日編 小泉 花陽」
         ●LL13-072 ME 「μ’sの休日編 矢澤 にこ」

         ●メンバーの数え方はどうすればいいの？
         Q．このメモリーはどのカードのスキルでステージに出せますか？
         A．以下のカードのスキルでステージに出せます。
         ・LL13-073「高坂 穂乃果」 ～　LL13-090「矢澤 にこ」

         Q．このメモリーの【オート】スキルと、《ライブ》に参加しているメンバーや楽曲カードの【ライブ成功時】スキルは、どういう順番で行えばいいですか？
         A．それらを好きな順番で使用できます。複数の【ライブ成功時】スキルがある場合は、【ライブ成功時】スキル、【オート】スキル、【ライブ成功時】スキルのような順番でも構いません。
         ●LL13-073 SP 「高坂 穂乃果」 ～　LL13-090 SEC 「矢澤 にこ」

         ●コレクションってなに？
         Q．『「μ’sの休日編」のメモリー』とは、どのカードのことを指しますか？
         A．『「μ’sの休日編」のメモリー』は、カード名のなかに「μ’sの休日編」が含まれているメモリーカードを指します。（LL13-064「μ’sの休日編 高坂 穂乃果」～LL13-072「μ’sの休日編 矢澤 にこ」が該当します。）
         なお、この【スタート時】スキルを持っているメンバーと、ステージに出すメモリーは、同じメンバーの名前を含んでいる必要はありません。例えば、LL13-073「高坂 穂乃果」の【スタート時】スキルで、LL13-066「μ’sの休日編 南 ことり」やLL13-071「μ’sの休日編 小泉 花陽」をステージに出すことができます。"""

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
