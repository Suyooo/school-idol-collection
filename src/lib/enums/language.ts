export default class Language {
	readonly name: "jpn" | "eng";
	readonly leftRoundBracket: string;
	readonly rightRoundBracket: string;
	readonly leftSquareBracket: string;
	readonly rightSquareBracket: string;
	readonly times: string;

	private constructor(
		name: "jpn" | "eng",
		leftRoundBracket: string,
		rightRoundBracket: string,
		leftSquareBracket: string,
		rightSquareBracket: string,
		times: string
	) {
		this.name = name;
		this.leftRoundBracket = leftRoundBracket;
		this.rightRoundBracket = rightRoundBracket;
		this.leftSquareBracket = leftSquareBracket;
		this.rightSquareBracket = rightSquareBracket;
		this.times = times;
	}

	static readonly JPN = new Language("jpn", "（", "）", "【", "】", "×");
	static readonly ENG = new Language("eng", "(", ")", "[", "]", " x");
}
