import {Request, Response} from "express";

const setList = {
    main: [
        {set: "LL01", name: "Volume 1"},
        {set: "LL02", name: "Volume 2"},
        {set: "LL03", name: "Volume 3"},
        {set: "LL04", name: "Volume 4"},
        {set: "LL05", name: "Volume 5 (Sunshine TV Anime Edition)"},
        {set: "LL06", name: "Volume 6"},
        {set: "EX05", name: "SIF Fes 2017 µ's Special Pack"},
        {set: "LL07", name: "Volume 7"},
        {set: "LL08", name: "Volume 8"},
        {set: "EX11", name: "SIF Fes 2018 µ's Special Pack"},
        {set: "LL09", name: "Volume 9"},
        {set: "LL10", name: "Volume 10"},
        {set: "LL11", name: "Volume 11"},
        {set: "LL12", name: "Volume 12"},
        {set: "LL13", name: "Volume 13"},
        {set: "LL14", name: "Volume 14"},
        {set: "LL15", name: "Volume 15"},
        {set: "LL16", name: "Volume 16"},
        {set: "LL17", name: "Volume 17"}
    ],
    trial: [
        {set: "EX01", name: "µ's Trial Set"},
        {set: "EX03", name: "Aqours Trial Set"},
        {set: "EX09", name: "Aqours Trial Set 2"}
    ],
    pr: [
        {set: "PR", name: "Promo Cards"}
    ],
    other: [
        {set: "EX02", name: "Fancy Changing Cards Set"},
        {set: "EX06", name: "Fancy Changing Cards Set 2017 µ's"},
        {set: "EX07", name: "Fancy Changing Cards Set 2017 Aqours"},
        {set: "EX10", name: "Acrylic Keyholder Set"},
        {set: "EX04", name: "Sparkly Cards & Clear Holder Set Part 1"},
        {set: "EX08", name: "Sparkly Cards & Clear Holder Set Part 2"},
        {set: "EX12", name: "SIF Honor Student Scouting Box"},
        {set: "EX13", name: "Stand-Up Pop Collection"},
        {set: "EX14", name: "SP Guaranteed! Starter Scouting Box"},
        {set: "EX15", name: "µ's SIF Special Student Scouting Box"},
    ]
};

const IndexHandler = (req: Request<any, any, any, any, any>, res: Response<any, any>) => {
    res.render("index", setList);
}
export default IndexHandler;