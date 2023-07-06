import type Card from "$models/card/card.js";
import { cardIsMember } from "$lib/card/types.js";
import { CardMemberRarity } from "$lib/enums/cardRarity.js";
import type CardPageExtraInfo from "$lib/types/cardPageExtraInfo.js";
import { retryPromise } from "$lib/utils/promise.js";

export type CardWithImageData = Card & { imageDataUrl: string };
const cardInfoCache = new Map<string, Promise<CardWithImageData>>();

export function loadCardInfo(cardNo: string): Promise<CardWithImageData> {
    let promise = cardInfoCache.get(cardNo);

    if (promise === undefined) {
        promise = retryPromise(fetch(`/json/card/${cardNo}/sameid/preparse`))
            .then((res) => res.json())
            .then(async (card: CardWithImageData & CardPageExtraInfo<true, false>) => {
                let usedCardNo = cardNo;
                if (cardIsMember(card) && card.member.rarity === CardMemberRarity.Secret) {
                    usedCardNo = card.sameId![0].cardNo;
                }

                card.imageDataUrl = await fetch(`/images/cards/${usedCardNo.split("-")[0]}/${usedCardNo}-front.jpg`)
                    .then((response) => response.blob())
                    .then(
                        (blob) =>
                            new Promise<string>((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    resolve(<string>reader.result);
                                };
                                reader.onerror = reject;
                                reader.readAsDataURL(blob);
                            })
                    );
                return card;
            });
        cardInfoCache.set(cardNo, promise);
    }

    return promise;
}
