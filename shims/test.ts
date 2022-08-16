import DB from "../models/db";

DB.awaitSync.then(() => {
    DB.Card.create({
        cardNo: "EX01-001",
        id: 1,
        type: 0,
        name: "高坂 穂乃果",
        skill: "（【RUSH】を持つメンバーが《登場》したとき、１ターンにつき１回まで、あなたは手札からメンバー１人を《登場》してよい。）",
        copyright: "©2015 プロジェクトラブライブ！ムービー ©bushiroad All Rights Reserved.",
        member: {
            rarity: 6,
            cost: 1,
            birthDay: 3,
            birthMonth: 8,
            year: 2,
            piecesAll: 0,
            piecesSmile: 1,
            piecesPure: 0,
            piecesCool: 0,
            abilityRush: true,
            abilityLive: false,
            idolizeType: 0
        }
    }, {include: [DB.CardMemberExtraInfo]})
});