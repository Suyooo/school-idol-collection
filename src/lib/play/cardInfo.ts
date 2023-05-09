import type Card from "$models/card/card.js";
import type CardPageExtraInfo from "$lib/types/cardPageExtraInfo.js";
import { retryPromise } from "$lib/utils/promise.js";
import { cardIsMember } from "$lib/card/types.js";
import { CardMemberRarity } from "$lib/enums/cardRarity.js";

export async function loadCardInfo(cardNo: string): Promise<Card & { imageDataUrl: string; }> {
    return await retryPromise(fetch(`/json/card/${cardNo}/sameid/preparse`))
        .then((res) => res.json())
        .then(
            async (card: Card & CardPageExtraInfo & { imageDataUrl: string; }) => {
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
            }
        );
}