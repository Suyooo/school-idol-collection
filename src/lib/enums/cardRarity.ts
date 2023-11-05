/* These enums are not const so the rarity names can be looked up at runtime */

enum CardMemberRarity {
	R = 0,
	SR = 1,
	HR = 2,
	Special = 3,
	Secret = 4,
	PR = 5,
	N = 6,
	SSR = 7,
}

enum CardSongRarity {
	M = 0,
	GR = 1,
}

export { CardMemberRarity, CardSongRarity };
