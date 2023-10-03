import { cardIsMember } from "$l/card/types.js";
import { CardMemberRarity } from "$l/enums/cardRarity.js";
import type CardPageExtraInfo from "$l/types/cardPageExtraInfo.js";
import { retryPromise } from "$l/utils/promise.js";
import type Card from "$m/card/card.js";

export type CardImageData = { imageDataUrl: string };
export type CardWithImageData = Card & CardImageData;
const cardInfoCache = new Map<string, Promise<CardWithImageData & CardPageExtraInfo<false, false>>>();

export function loadCardInfo(cardNo: string): Promise<CardWithImageData & CardPageExtraInfo<false, false>> {
    let promise = cardInfoCache.get(cardNo);

    if (promise === undefined) {
        promise = retryPromise(fetch(`/json/card/${cardNo}`))
            .then((res) => res.json())
            .then(async (card: Card & CardPageExtraInfo<false, false>) => {
                const newCard = card as CardWithImageData & CardPageExtraInfo<false, false>;
                let usedCardNo = cardNo;
                if (cardIsMember(newCard) && newCard.member.rarity === CardMemberRarity.Secret) {
                    usedCardNo = newCard.member.baseIfSecret!;
                }

                newCard.imageDataUrl = await fetch(`/images/cards/${usedCardNo.split("-")[0]}/${usedCardNo}-front.jpg`)
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
                return newCard;
            });
        cardInfoCache.set(cardNo, promise);
    }

    return promise;
}
