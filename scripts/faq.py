#!/usr/bin/python

# Script to create a JSON skeleton out of the original FAQ text
# Copypaste everything from the official site into the faq variable
# You can then use the JSON skeleton in the FAQ +page.server.ts and translate things there

faq = """●LL16-046 HR 「高海 千歌」/●LL16-073 SEC 「高海 千歌」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●スキルに①、②と書かれていたら？
Q．【登場時】スキルで、このメンバーが覚醒済みで①と②のどちらも行う場合、《ライブ》をしなくてもカードを引けますか？
A．はい。どちらも行う場合、まず①でカードを引き、その後②で《ライブ》するかどうかを選びます

Q．私が１番手のプレイヤーで、ゲームの開始時にLL07-064「高海 千歌」の【スタート時】スキルで「千歌」を《登場》しました。続く最初のターンでこのメンバーを《登場》する場合、『このターンに《登場》した「千歌」』の条件を満たしますか？
A．いいえ。【スタート時】スキルはこのターンより前のゲームの準備で行いますので、『このターンに《登場》した』の条件は満たしません。
●LL16-047 HR 「桜内 梨子」/●LL16-074 SEC 「桜内 梨子」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
Q．LL15-011「桜内 梨子」のように、ピース１個とボーナスを持つ場合、『ピースをちょうど１個持つ「梨子」』の条件を満たせますか？
A．ボーナスが有効になっていない場合は条件を満たします。ボーナスが有効になっている場合、ピースを２個持つメンバーとなり、条件を満たしません。
●LL16-048 HR 「松浦 果南」/●LL16-075 SEC 「松浦 果南」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．【RUSH】と【LIVE】のアイコンを持つLL16-066「松浦 果南」を《登場》したとき、【RUSH】でメンバーを《登場》しました。このLL16-066「松浦 果南」は『【LIVE】を持つ「果南」』の条件を満たしますか？
A．はい。【RUSH】でメンバーを《登場》しても【LIVE】のアイコンは無くならず、【LIVE】を持ったままですので【特別練習】の条件を満たします。
●LL16-049 HR 「黒澤 ダイヤ」/●LL16-076 SEC 「黒澤 ダイヤ」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？

Q．楽曲名に「Aqours」と書かれているLL04-057「Aqours☆HEROES」がセットリストにある場合、カードを２枚引けますか？
A．いいえ。楽曲名はスキルには含まれないので、条件を満たしません。

Q．セットリストに表向きの、スキルに「Aqours」と書かれている楽曲カードがないとき、このメンバーが覚醒済みの場合、手札からメンバーを《登場》できますか？
A．いいえ。『さらに』と書かれている場合は、その前の条件も満たしている必要があります。このメンバーが覚醒済みでも、セットリストに表向きの、スキルに「Aqours」と書かれている楽曲カードがない場合はメンバーを《登場》できません。
●LL16-050 HR 「渡辺 曜」/●LL16-077 SEC 「渡辺 曜」

●「待機中」ってどういう状態？
●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
Q．セットリストにライブ衣装と同名の楽曲カードが複数ある場合、どの楽曲カードを《ライブ》できますか？
A．スキルの条件を満たす楽曲カードが複数ある場合、それらの中から好きな１枚を選んで《ライブ》できます。

Q．セットリストに、LL02-071「KiRa-KiRa Sensation!／Happy maker!」のように２つの楽曲名が入った楽曲カードがある場合、ライブ衣装が「KiRa-KiRa Sensation!」のメンバーのように、片方の楽曲名のライブ衣装のメンバーでも《ライブ》できますか？
A．はい。楽曲名が２つある楽曲カードの場合、どちらかと同名のライブ衣装であれば条件を満たします。
●LL16-051 HR 「津島 善子」/●LL16-078 SEC 「津島 善子」

●「待機中」ってどういう状態？
●メンバーの数え方はどうすればいいの？
●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
Q．待機中のメンバーの人数が偶数のときに、このメンバーを《登場》します。【特別練習】を行って《登場》した場合、このスキルで待機中のメンバーを数えるとどうなりますか？
A．【特別練習】を行って《登場》した場合、待機中のメンバーの人数は変わりません。この場合は偶数のままです。（奇数の場合も同様に、奇数のままです。）
●LL16-052 HR 「国木田 花丸」/●LL16-079 SEC 「国木田 花丸」

●コレクションってなに？
●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
Q．【登場時】スキルで、【RUSH】と【LIVE】のアイコンを持つLL16-070「国木田 花丸」を手札に加えることはできますか？
A．はい。【RUSH】アイコンを持っていれば、【LIVE】アイコンやその他のアイコンを持っていても構いません。
●LL16-053 HR 「小原 鞠莉」/●LL16-080 SEC 「小原 鞠莉」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．覚醒済みのこのメンバーを含む、持っているピースがすべて【オール】のメンバー２人のほかに、【オール】以外のピースを持つメンバーも一緒に《ライブ》に参加します。この場合、＋【オール】【オール】されますか？
A．はい。【オール】以外のピースを持つメンバーが参加しても、持っているピースがすべて【オール】のメンバーが２人以上参加するなら条件を満たします。
●LL16-054 HR 「黒澤 ルビィ」/●LL16-081 SEC 「黒澤 ルビィ」

●【特別練習】、覚醒ってどういうこと？
●裏向きになったメンバーカードはどうなるの？
Q．このメンバーが覚醒済みでないとき、【登場時】スキルでデッキの一番上のカードを《登場》する際、それがLL15-036「黒澤 ルビィ」でした。LL15-036「黒澤 ルビィ」の【特別練習】スキルで、このメンバーが手札に戻る前に重ねられますか？
A．いいえ。スキルは書かれている順番に行いますので、デッキの一番上のカードを《登場》する前にこのメンバーが手札に戻ります。したがって、LL15-045「黒澤 ルビィ」が《登場》する際にはすでにステージにいないため、このメンバーに重ねられません。

Q．ピース１個とボーナスを持つLL15-018「黒澤 ルビィ」や、ピース１個と覚醒アイコンのピースを持つLL15-056「黒澤 ルビィ」の場合、『ピースをちょうど１個持つ「ルビィ」』の条件を満たせますか？
A．いずれも、ボーナスが有効になっていない場合や覚醒済みでない場合は条件を満たします。ボーナスが有効になっている場合や覚醒済みの場合、ピースを２個以上持つメンバーとなり、条件を満たしません。

Q．私が１番手のプレイヤーで、ゲームの開始時にLL07-072「黒澤 ルビィ」の【スタート時】スキルでピースをちょうど１個持つ「ルビィ」を《登場》しました。続く最初のターンでこのメンバーを《登場》する場合、『このターンに《登場》したピースをちょうど１個持つ「ルビィ」』の条件を満たしますか？
A．いいえ。【スタート時】スキルはこのターンより前のゲームの準備で行いますので、『このターンに《登場》した』の条件は満たしません。
●LL16-055 M 「ダイスキだったらダイジョウブ！」

●メンバーの数え方はどうすればいいの？
●LL16-056 M 「ハジマリロード」

●メンバーの数え方はどうすればいいの？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．【ライブ成功時】スキルで、【☆】を持たないメンバーを手札に戻した場合、その手札に戻したカードを手札から《登場》できますか？
A．はい。スキルは書いてある順番に行いますので、先に手札に戻したカードを、手札から《登場》するメンバーに含めることができます。
●LL16-057 M 「Marine Border Parasol」

●メンバーの数え方はどうすればいいの？
●【ライブ参加時】【ライブ成功時】スキルの順番は？
●スキルでセットリストにある表向きのカードを裏向きにしたら？
Q．【ライブ成功時】スキルでLL12-056「未熟DREAMER」が表向きになりました。『手札からライブ衣装で【☆】を持たないメンバー１人を《登場》してよい。』を行う前に、LL12-056「未熟DREAMER」の【オート】スキルを行えますか？
A．いいえ。１つのスキルが終わるまで、他のスキルは行えません。
●LL16-058 M 「予測不可能Driving!」

●メンバーの数え方はどうすればいいの？
●LL16-059 M 「KOKORO Magic “A to Z”」

●【ライブ参加時】【ライブ成功時】スキルの順番は？
Q．LL07-056「GALAXY HidE and SeeK」やLL11-072「#12 光の海」の【オート】スキル『《ライブ》に参加するメンバーの【スマイル】と【ピュア】と【クール】のピースをすべて【オール】にする。』よりも先に、この楽曲カードの【ライブ参加時】スキルで＋【オール】【オール】できますか？
A．いいえ。それらの【オート】スキルは、【ライブ参加時】スキルよりも先に、参加するメンバーの【スマイル】と【ピュア】と【クール】のピースをすべて【オール】にします。
●LL16-060 M 「Wake up, Challenger!!」

●メンバーの数え方はどうすればいいの？
●LL16-061 M 「New Romantic Sailors」

Q．『「Guilty Kiss」の楽曲カード』とは、どの楽曲カードですか？
A．2020年6月現在、以下のカードが該当します。
・EX03-032、EX14-049「Strawberry Trapper」
・LL04-063「Guilty Night, Guilty Kiss!」
・LL06-057「Strawberry Trapper」
・LL07-057「コワレヤスキ」
・LL08-063「Shadow gate to love」
・LL12-059「Guilty Eyes Fever」
・LL16-61「New Romantic Sailors」
●LL16-062 M 「Braveheart Coaster」

Q．『「CYaRon！」の楽曲カード』とは、どの楽曲カードですか？
A．2020年6月現在、以下のカードが該当します。
・EX03-030「元気全開DAY!DAY!DAY!」
・LL04-061、EX09-030、EX14-047「夜空はなんでも知ってるの？」
・LL06-055「元気全開DAY!DAY!DAY!」
・LL07-055「近未来ハッピーエンド」
・LL08-061「海岸通りで待ってるよ」
・LL12-057「P.S.の向こう側」
・LL16-062「Braveheart Coaster」
●LL16-063 M 「Amazing Travel DNA」

Q．『「AZALEA」の楽曲カード』とは、どの楽曲カードですか？
A．2020年6月現在、以下のカードが該当します。
・EX03-031、EX14-048「トリコリコPLEASE!!」
・LL04-062、EX09-031「ときめき分類学」
・LL06-056「トリコリコPLEASE!!」
・LL07-056「GALAXY HidE and SeeK」
・LL08-062「INNOCENT BIRD」
・LL12-058「LONELY TUNING」
・LL16-063「Amazing Travel DNA」
●LL16-082 GR 「僕らの走ってきた道は…」
●LL16-083 GR 「Hop? Stop? Nonstop!」
●LL16-084 GR 「Brightest Melody」
●LL16-085 GR 「Next SPARKLING!!」

Q．この楽曲カードは何色ですか？
A．それぞれ対応する下記のカード（IDが同じでレアリティがMのもの）と同じ色です。
・LL16-082 GR 「僕らの走ってきた道は…」（赤）⇒LL14-061　M「僕らの走ってきた道は…」
・LL16-083 GR 「Hop? Stop? Nonstop!」（緑）⇒LL15-059 M「Hop? Stop? Nonstop!」
・LL16-084 GR 「Brightest Melody」（緑）⇒LL15-060 M「Brightest Melody」
・LL16-085 GR 「Next SPARKLING!!」（黄）⇒LL15-058 M「Next SPARKLING!!」"""

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
