import type { SvelteComponent } from "svelte";
import type Skill from "$models/skill/skill.js";
import AnnotationEnum from "$lib/enums/annotation.js";
import AttributeEnum from "$lib/enums/attribute.js";
import CardType from "$lib/enums/cardType.js";
import Language from "$lib/enums/language.js";
import TriggerEnum from "$lib/enums/trigger.js";
import { toNumWithFullwidth } from "$lib/utils/string.js";
import Ability from "$lib/format/Ability.svelte";
import AnnotationComponent from "$lib/format/AnnotationComponent.svelte";
import Idolized from "$lib/format/Idolized.svelte";
import Piece from "$lib/format/Piece.svelte";
import PieceCount from "$lib/format/PieceCount.svelte";
import Star from "$lib/format/Star.svelte";
import TriggerComponent from "$lib/format/TriggerComponent.svelte";

export interface TextNode {
	text: string;
}

export interface ComponentNode {
	componentName: string;
	props: { [key: string | number | symbol]: any };
}

export interface ComponentNodeRenderable {
	component: new (...args: any) => SvelteComponent<any>;
	props: { [key: string | number | symbol]: any };
}

export interface ElementMarkerNode {
	secret: symbol;
	element: string;
	class?: string;
}

export interface ElementMarkerEndNode {
	secret: symbol;
}

export interface ElementNode {
	nodes: ParseNode[];
	element: string;
	class?: string;
}

export type ParseNode =
	| TextNode
	| ComponentNode
	| ComponentNodeRenderable
	| ElementMarkerNode
	| ElementMarkerEndNode
	| ElementNode;
export type ParseNodePrepared = TextNode | ComponentNode | ElementNode;
export type ParseNodeRenderable = TextNode | ComponentNodeRenderable | ElementNode;

export function isTextNode(node: ParseNode): node is TextNode {
	return node.hasOwnProperty("text");
}

export function isComponentNode(node: ParseNode): node is ComponentNode {
	return node.hasOwnProperty("componentName");
}

export function isElementMarkerNode(node: ParseNode): node is ElementMarkerNode {
	return node.hasOwnProperty("secret") && node.hasOwnProperty("element");
}

export function isElementMarkerEndNode(node: ParseNode): node is ElementMarkerEndNode {
	return node.hasOwnProperty("secret") && !node.hasOwnProperty("element");
}

export function isElementNode(node: ParseNode): node is ElementNode {
	return node.hasOwnProperty("nodes");
}

export function parseSkillToNodes(
	skill: string | Skill | null,
	lang: Language = Language.ENG,
	parseAsHelpText: boolean = false,
	cardType?: CardType
): ParseNodePrepared[] {
	const isSkillObj = skill !== null && typeof skill !== "string";
	const skillString: string | null =
		isSkillObj ?
			lang === Language.ENG ?
				skill.eng
			:	skill.jpn
		:	skill;

	if (skillString === null) {
		const secret = Symbol();
		const nodes = <ParseNode[]>[{ secret, element: "i" }, { text: "(no translation yet)" }, { secret }];
		formElementNodes(nodes);
		return <ParseNodePrepared[]>nodes;
	}

	const nodes: ParseNode[] = [{ text: skillString }];

	if (lang === Language.ENG) {
		if (!parseAsHelpText && skillString.charAt(0) === "[") {
			// Only call these applys if this string starts with a trigger (so, it's not flavour or help text)
			apply(
				nodes,
				new RegExp("\\[(" + TriggerEnum.all.map((t) => t.toName(Language.ENG)).join("|") + ")]/?([^(]*?)(?= \\(|$)"),
				triggerWithClose
			);
			apply(nodes, /"([^"]*?)"/, highlightRed.bind(undefined, '"', '"'));
		} else if (!parseAsHelpText && (skillString.charAt(0) !== "(" || cardType === CardType.SONG)) {
			// Help text has brackets - if there are none, this is flavour text. Song cards also don't have help text
			const secret = Symbol();
			nodes.unshift({ secret, element: "i" });
			nodes.push({ secret });
		}
		apply(
			nodes,
			new RegExp(
				"\\[(" + AttributeEnum.allForPieces.map((t) => t.toPieceAttributeName(Language.ENG)).join("|") + ")] x (\\d+)"
			),
			piecesMultiple
		);
		apply(nodes, /♪(Live Points \+[^♪]*?)♪/, highlightRedNoWrap.bind(undefined, "♪", "♪"));
		apply(nodes, /♪(Live Points -[^♪]*?)♪/, highlightBlueNoWrap.bind(undefined, "♪", "♪"));
		apply(nodes, /⟪([^⟪⟫]*?)⟫/, bold.bind(undefined, "⟪", "⟫"));
		apply(
			nodes,
			new RegExp(
				"\\+((?:\\[(?:" +
					AttributeEnum.allForPieces.map((t) => t.toPieceAttributeName(Language.ENG)).join("|") +
					")])+)"
			),
			bold.bind(undefined, "+", "")
		);
		apply(nodes, /\[Idolized] Pieces/, idolized);
		apply(nodes, /(\[)(\d)(\d)(\d)(])/, attrRequirement);
		apply(nodes, /\[RUSH\/LIVE]/, abilityBoth);
		apply(nodes, /\[(RUSH|LIVE)]/, abilityOne);
		apply(nodes, new RegExp("\\[(" + TriggerEnum.all.map((t) => t.toName(Language.ENG)).join("|") + ")]/?"), trigger);
		apply(
			nodes,
			new RegExp(
				"(?:\\[(?:" + AttributeEnum.allForPieces.map((t) => t.toPieceAttributeName(Language.ENG)).join("|") + ")])+"
			),
			pieces.bind(undefined, "][")
		);
		apply(nodes, /(?:((?:\d+|one|two|three|has|each|more|no|with|without)(?: or (?:more|less))?) )?(Stars?)\b/, cost);
	} else if (lang === Language.JPN) {
		if (!parseAsHelpText && skillString.charAt(0) === "【") {
			// Only call these applys if this string starts with a trigger (so, it's not flavour or help text)
			apply(
				nodes,
				new RegExp(
					"【(" +
						TriggerEnum.all
							.map((t) => t.toName(Language.JPN))
							.concat(TriggerEnum.allWithMemoryAlts.map((t) => t.toName(Language.JPN, true)))
							.join("|") +
						")】/?([^（]*?)(?=（|$)"
				),
				triggerWithClose
			);
			apply(nodes, /「([^"]*?)」/, highlightRed.bind(undefined, "「", "」"));
			apply(nodes, /『([^"]*?)』/, highlightRed.bind(undefined, "『", "』"));
		} else if (!parseAsHelpText && (skillString.charAt(0) !== "（" || cardType === CardType.SONG)) {
			// Help text has brackets - if there are none, this is flavour text. Song cards also don't have help text
			const secret = Symbol();
			nodes.unshift({ secret, element: "i" });
			nodes.push({ secret });
		}
		apply(nodes, /♪(ライブP＋[^♪]*?)♪/, highlightRedNoWrap.bind(undefined, "♪", "♪"));
		apply(nodes, /♪(ライブP－[^♪]*?)♪/, highlightBlueNoWrap.bind(undefined, "♪", "♪"));
		apply(nodes, /《([^《》]*?)》/, bold.bind(undefined, "《", "》"));
		apply(
			nodes,
			new RegExp(
				"\\+((?:【(?:" +
					AttributeEnum.allForPieces.map((t) => t.toPieceAttributeName(Language.JPN)).join("|") +
					")】)+)"
			),
			bold.bind(undefined, "+", "")
		);
		apply(nodes, /【覚醒\(仮\)】/, idolized);
		apply(nodes, /(【)([０-９])([０-９])([０-９])(】)/, attrRequirement);
		apply(nodes, /【RUSH\/LIVE】/, abilityBoth);
		apply(nodes, /【(RUSH|LIVE)】/, abilityOne);
		apply(
			nodes,
			new RegExp(
				"【(" +
					TriggerEnum.all
						.map((t) => t.toName(Language.JPN))
						.concat(TriggerEnum.allWithMemoryAlts.map((t) => t.toName(Language.JPN, true)))
						.join("|") +
					")】/?"
			),
			trigger
		);
		apply(
			nodes,
			new RegExp(
				"(?:【(?:" + AttributeEnum.allForPieces.map((t) => t.toPieceAttributeName(Language.JPN)).join("|") + ")】)+"
			),
			pieces.bind(undefined, "】【")
		);
		apply(nodes, /【☆】/, cost);
	}

	if (isSkillObj) {
		const annotationNodes: { [annotationKey: string]: ComponentNode } = {};
		for (const ann of skill.annotations) {
			if (ann.isEng !== (lang === Language.ENG)) continue;
			const annotationKey = AnnotationEnum.getAnnotationString(ann);
			if (annotationNodes.hasOwnProperty(annotationKey)) continue;
			annotationNodes[annotationKey] = {
				componentName: "Annotation",
				props: {
					typeId: ann.type,
					parameter: ann.parameter,
					cards: ann.links,
				},
			};
		}
		apply(nodes, /\{\{(.*?)}}/, annotation.bind(undefined, annotationNodes));
	}

	compressTextNodes(nodes);
	formElementNodes(nodes);
	return <ParseNodePrepared[]>nodes;
}

function apply(nodes: ParseNode[], regex: RegExp, replaceFunc: (match: RegExpExecArray) => ParseNode[]) {
	let i = 0;
	while (i < nodes.length) {
		if (!isTextNode(nodes[i])) {
			i++;
			continue;
		}

		const node = <TextNode>nodes[i];

		if (node.text === "") {
			nodes.splice(i, 1);
			continue;
		}

		const match = regex.exec(node.text);
		if (!match) {
			i++;
			continue;
		}

		const replArr = replaceFunc(match);
		const firstReplNode = replArr[0];
		let start = match.index;
		let end = match.index + match[0].length;
		let needsInlineBlock = false;

		// Make sure punctuation on either side of the match is never line wrapped away
		if (start > 0 && node.text.substring(start - 1, start).match(/["().!?,;]/)) {
			replArr.unshift({ text: node.text.substring(start - 1, start) });
			start--;
			needsInlineBlock = true;
		}
		if (end < node.text.length && node.text.substring(end, end + 1).match(/["().!?,;]/)) {
			replArr.push({ text: node.text.substring(end, end + 1) });
			end++;
			needsInlineBlock = true;
		}
		if (needsInlineBlock) {
			const secret = Symbol();
			replArr.unshift({ secret, element: "span", class: "inline-block" });
			replArr.push({ secret });
			if (isElementMarkerNode(firstReplNode) && firstReplNode.class?.includes("inline-block")) {
				firstReplNode.class = firstReplNode.class.replace("inline-block", "");
			}
		}

		nodes.splice(
			i,
			1,
			{
				...node,
				text: node.text.substring(0, start),
			},
			...replArr,
			{
				...node,
				text: node.text.substring(end),
			}
		);
		i += 2;
	}
}

function triggerWithClose(match: RegExpExecArray): ParseNode[] {
	const trigger = TriggerEnum.fromName(match[1]);
	if (trigger === TriggerEnum.SP) {
		return [
			{ componentName: "Trigger", props: { triggerId: trigger.id } },
			{ text: match[2] },
			{ componentName: "Trigger", props: { triggerId: trigger.id, closing: true } },
		];
	} else {
		return [{ componentName: "Trigger", props: { triggerId: trigger.id } }, { text: match[2] }];
	}
}

function trigger(match: RegExpExecArray): ParseNode[] {
	const trigger = TriggerEnum.fromName(match[1]);
	return [{ componentName: "Trigger", props: { triggerId: trigger.id } }];
}

function bold(pre: string, post: string, match: RegExpExecArray): ParseNode[] {
	const secret = Symbol();
	return [
		{ secret, element: "span", class: "font-bold" },
		...(pre ? [{ text: pre }] : []),
		{ text: match[1] },
		...(post ? [{ text: post }] : []),
		{ secret },
	];
}

function highlightRed(pre: string, post: string, match: RegExpExecArray): ParseNode[] {
	const secret = Symbol();
	return [
		{ secret, element: "span", class: "text-highlight-red" },
		...(pre ? [{ text: pre }] : []),
		{ text: match[1] },
		...(post ? [{ text: post }] : []),
		{ secret },
	];
}

function highlightRedNoWrap(pre: string, post: string, match: RegExpExecArray): ParseNode[] {
	const secret = Symbol();
	return [
		{ secret, element: "span", class: "text-highlight-red inline-block" },
		...(pre ? [{ text: pre }] : []),
		{ text: match[1] },
		...(post ? [{ text: post }] : []),
		{ secret },
	];
}

function highlightBlueNoWrap(pre: string, post: string, match: RegExpExecArray): ParseNode[] {
	const secret = Symbol();
	return [
		{ secret, element: "span", class: "text-highlight-blue inline-block" },
		...(pre ? [{ text: pre }] : []),
		{ text: match[1] },
		...(post ? [{ text: post }] : []),
		{ secret },
	];
}

function idolized(match: RegExpExecArray): ParseNode[] {
	return [{ componentName: "Idolized", props: { repl: match[0] } }];
}

function attrRequirement(match: RegExpExecArray): ParseNode[] {
	return [
		{ text: match[1] },
		{
			componentName: "PieceCount",
			props: {
				pieces: {
					piecesSmile: toNumWithFullwidth(match[2]),
					piecesPure: toNumWithFullwidth(match[3]),
					piecesCool: toNumWithFullwidth(match[4]),
				},
				showZero: true,
				isSongReq: true,
			},
		},
		{ text: match[5] },
	];
}

function abilityBoth(_match: RegExpExecArray): ParseNode[] {
	return [{ componentName: "Ability", props: { rush: true, live: true } }];
}

function abilityOne(match: RegExpExecArray): ParseNode[] {
	const rush = match[1] === "RUSH";
	return [{ componentName: "Ability", props: { rush, live: !rush } }];
}

function piecesMultiple(match: RegExpExecArray): ParseNode[] {
	const secret = Symbol();
	return [
		{ secret, element: "span", class: `inline-block text-attribute-${match[1].toLowerCase()}` },
		{
			componentName: "Piece",
			props: {
				attrId: AttributeEnum.fromPieceAttributeName(match[1]).id,
			},
		},
		{ text: ` x ${match[2]}` },
		{ secret },
	];
}

function pieces(splitter: string, match: RegExpExecArray): ParseNode[] {
	const secret = Symbol();
	const pieces = match[0].substring(1, match[0].length - 1).split(splitter);
	return [
		{ secret, element: "span", class: "inline-block" },
		...pieces.map((p) => {
			const attr = AttributeEnum.fromPieceAttributeName(p);
			return { componentName: "Piece", props: { attrId: attr.id } };
		}),
		{ secret },
	];
}

function cost(match: RegExpExecArray): ParseNode[] {
	const secret = Symbol();
	if (match[1] !== undefined) {
		// count/word match
		return [
			{ secret, element: "span", class: "inline-block" },
			{ text: match[1] + "&nbsp;" },
			{ componentName: "Star", props: { repl: match[2] } },
			{ secret },
		];
	} else {
		// symbol only
		return [{ componentName: "Star", props: { repl: match[2] } }];
	}
}

function annotation(annotationNodes: { [annotationKey: string]: ComponentNode }, match: RegExpExecArray): ParseNode[] {
	return [annotationNodes[match[0]]];
}

function compressTextNodes(nodes: ParseNode[]) {
	for (let i = 0; i < nodes.length; i++) {
		if (isTextNode(nodes[i])) {
			const node = <TextNode>nodes[i];
			while (i + 1 < nodes.length && isTextNode(nodes[i + 1])) {
				const other = <TextNode>nodes[i + 1];
				node.text += other.text;
				nodes.splice(i + 1, 1);
			}
		}
	}
}

function formElementNodes(nodes: ParseNode[]) {
	for (let i = 0; i < nodes.length; i++) {
		if (isElementMarkerNode(nodes[i])) {
			const start = <ElementMarkerNode>nodes[i];
			for (let len = 1; len < nodes.length - i; len++) {
				if (isElementMarkerEndNode(nodes[i + len])) {
					const end = <ElementMarkerEndNode>nodes[i + len];
					if (start.secret === end.secret) {
						const group: ElementNode = {
							nodes: nodes.slice(i + 1, i + len),
							element: start.element,
							class: start.class,
						};
						formElementNodes(group.nodes);
						nodes.splice(i, len + 1, group);
						break;
					}
				}
			}
		}
	}
}

const componentDict: { [key: string]: new (...args: any) => SvelteComponent<any> } = {
	Annotation: AnnotationComponent,
	Ability,
	Idolized,
	Piece,
	PieceCount,
	Star,
	Trigger: TriggerComponent,
};

export function makeNodesRenderable(nodes: ParseNodePrepared[]): ParseNodeRenderable[] {
	return nodes.map((n) => {
		if (isComponentNode(n)) {
			return { component: componentDict[n.componentName], props: { ...n.props } };
		} else if (isElementNode(n)) {
			return { ...n, nodes: makeNodesRenderable(<ParseNodePrepared[]>n.nodes) };
		} else {
			return n;
		}
	});
}
