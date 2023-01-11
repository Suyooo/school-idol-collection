import Ability from "$lib/format/Ability.svelte";
import Idolized from "$lib/format/Idolized.svelte";
import Piece from "$lib/format/Piece.svelte";
import PieceCount from "$lib/format/PieceCount.svelte";
import Star from "$lib/format/Star.svelte";
import TriggerComponent from "$lib/format/Trigger.svelte";
import TriggerType from "$lib/translation/trigger.js";
import Attribute from "$lib/types/attribute.js";
import Language from "$lib/types/language.js";
import type {SvelteComponentTyped} from "svelte";

export interface TextNode {
    text: string;
}

export interface ComponentNode {
    componentName: string;
    props: { [key: string | number | symbol]: any };
}

export interface ComponentNodeRenderable {
    component: new (...args: any) => SvelteComponentTyped<any>;
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

export type ParseNode = TextNode | ComponentNode | ElementMarkerNode | ElementMarkerEndNode | ElementNode;
export type ParseNodePrepared = TextNode | ComponentNode | ElementNode;
export type ParseNodeRenderable =
    TextNode
    | ComponentNodeRenderable
    | ElementMarkerNode
    | ElementMarkerEndNode
    | ElementNode;

export function isTextNode(node: ParseNode): node is TextNode {
    return node.hasOwnProperty("text");
}

export function isComponentNode(node: ParseNode): node is ComponentNode {
    return node.hasOwnProperty("component");
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

export function parseSkillToNodes(skill: string | null, lang: Language = Language.ENG, parseAsHelpText: boolean = false): ParseNodePrepared[] {
    if (skill === null) return <ParseNodePrepared[]>[{text: "—"}];
    const nodes: ParseNode[] = [{text: skill}];

    if (lang === Language.ENG) {
        if (!parseAsHelpText && skill.charAt(0) === "[") {
            // Only call these applys if this string starts with a trigger (so, it's not flavour or help text)
            apply(nodes, new RegExp("\\[(" + TriggerType.all.map(t => t.nameEng).join("|") + ")]/?([^(]*?)(?= \\(|$)"), triggerWithClose);
            apply(nodes, /"([^"]*?)"/, highlightRed.bind(undefined, "\"", "\""));
            apply(nodes, /♪(Live Points \+[^♪]*?)♪/, highlightRedNoWrap.bind(undefined, "♪", "♪"));
            apply(nodes, /♪(Live Points -[^♪]*?)♪/, highlightBlueNoWrap.bind(undefined, "♪", "♪"));
        }
        apply(nodes, /⟪([^⟪⟫]*?)⟫/, bold.bind(undefined, "⟪", "⟫"));
        apply(nodes, new RegExp("\\+(\\[(?:" + Attribute.all
            .filter(t => t.pieceAttributeNameEng !== undefined)
            .map(t => t.pieceAttributeNameEng).join("|") + ")])+"), bold.bind(undefined, "+", ""));
        apply(nodes, /\[Idolized \(Piece Bonus\)]/, idolized);
        apply(nodes, /\[(\d)(\d)(\d)]/, attrRequirement);
        apply(nodes, /\[RUSH\/LIVE]/, abilityBoth);
        apply(nodes, /\[(RUSH|LIVE)]/, abilityOne);
        apply(nodes, new RegExp("\\[(" + TriggerType.all.map(t => t.nameEng).join("|") + ")]/?"), trigger);
        apply(nodes, new RegExp("(?:\\[(?:" + Attribute.all
            .filter(t => t.pieceAttributeNameEng !== undefined)
            .map(t => t.pieceAttributeNameEng).join("|") + ")])+"), pieces.bind(undefined, "]["));
        apply(nodes, /(1|2|3|one|two|three|has|each|more|no|with|without) (Stars?)/, cost);
    } else if (lang === Language.JPN) {
        if (!parseAsHelpText && skill.charAt(0) === "【") {
            // Only call these applys if this string starts with a trigger (so, it's not flavour or help text)
            apply(nodes, new RegExp("【(" + TriggerType.all.map(t => t.nameJpn).join("|") + ")】/?([^（]*?)(?=（|$)"), triggerWithClose);
            apply(nodes, /「([^"]*?)」/, highlightRed.bind(undefined, "「", "」"));
            apply(nodes, /♪(Live Points \+[^♪]*?)♪/, highlightRedNoWrap.bind(undefined, "♪", "♪"));
            apply(nodes, /♪(Live Points -[^♪]*?)♪/, highlightBlueNoWrap.bind(undefined, "♪", "♪"));
        }
        apply(nodes, /《([^《》]*?)》/, bold.bind(undefined, "《", "》"));
        apply(nodes, new RegExp("\\+(【(?:" + Attribute.all
            .filter(t => t.pieceAttributeNameJpn !== undefined)
            .map(t => t.pieceAttributeNameJpn).join("|") + ")】)+"), bold.bind(undefined, "+", ""));
        apply(nodes, /【覚醒\(仮\)】/, idolized);
        apply(nodes, /【(\d)(\d)(\d)】/, attrRequirement);
        apply(nodes, /【RUSH\/LIVE】/, abilityBoth);
        apply(nodes, /【(RUSH|LIVE)】/, abilityOne);
        apply(nodes, new RegExp("【(" + TriggerType.all.map(t => t.nameJpn).join("|") + ")】/?"), trigger);
        apply(nodes, new RegExp("(?:【(?:" + Attribute.all
            .filter(t => t.pieceAttributeNameJpn !== undefined)
            .map(t => t.pieceAttributeNameJpn).join("|") + ")】)+"), pieces.bind(undefined, "】【"));
        apply(nodes, /【☆】/, cost);
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

        nodes.splice(i, 1,
            {...node, text: node.text.substring(0, match.index)},
            ...replaceFunc(match),
            {...node, text: node.text.substring(match.index + match[0].length)}
        );
        i += 2;
    }
}

function triggerWithClose(match: RegExpExecArray): ParseNode[] {
    const trigger = TriggerType.get(match[1]);
    if (trigger.id === TriggerType.ID_SP) {
        return [
            {componentName: "Trigger", props: {trigger}},
            {text: match[2]},
            {componentName: "Trigger", props: {trigger, closing: true}}
        ];
    } else {
        return [
            {componentName: "Trigger", props: {trigger}},
            {text: match[2]}
        ];
    }
}

function trigger(match: RegExpExecArray): ParseNode[] {
    const trigger = TriggerType.get(match[1]);
    return [{componentName: "Trigger", props: {trigger}}];
}

function bold(pre: string, post: string, match: RegExpExecArray): ParseNode[] {
    const secret = Symbol();
    return [
        {secret, element: "span", class: "font-bold inline-block"},
        ...(pre ? [{text: pre}] : []),
        {text: match[1]},
        ...(post ? [{text: post}] : []),
        {secret}
    ];
}

function highlightRed(pre: string, post: string, match: RegExpExecArray): ParseNode[] {
    const secret = Symbol();
    return [
        {secret, element: "span", class: "text-highlight-red"},
        ...(pre ? [{text: pre}] : []),
        {text: match[1]},
        ...(post ? [{text: post}] : []),
        {secret}
    ];
}

function highlightRedNoWrap(pre: string, post: string, match: RegExpExecArray): ParseNode[] {
    const secret = Symbol();
    return [
        {secret, element: "span", class: "text-highlight-red inline-block"},
        ...(pre ? [{text: pre}] : []),
        {text: match[1]},
        ...(post ? [{text: post}] : []),
        {secret}
    ];
}

function highlightBlueNoWrap(pre: string, post: string, match: RegExpExecArray): ParseNode[] {
    const secret = Symbol();
    return [
        {secret, element: "span", class: "text-highlight-blue inline-block"},
        ...(pre ? [{text: pre}] : []),
        {text: match[1]},
        ...(post ? [{text: post}] : []),
        {secret}
    ];
}

function idolized(match: RegExpExecArray): ParseNode[] {
    return [{componentName: "Idolized", props: {repl: match[0]}}];
}

function attrRequirement(match: RegExpExecArray): ParseNode[] {
    return [{
        componentName: "PieceCount", props: {
            pieces: {
                piecesSmile: parseInt(match[1]),
                piecesPure: parseInt(match[2]),
                piecesCool: parseInt(match[3])
            },
            showZero: true,
            reducedGap: true
        }
    }];
}

function abilityBoth(_match: RegExpExecArray): ParseNode[] {
    return [{componentName: "Ability", props: {rush: true, live: true}}];
}

function abilityOne(match: RegExpExecArray): ParseNode[] {
    const rush = match[1] === "RUSH";
    return [{componentName: "Ability", props: {rush, live: !rush}}];
}

function pieces(splitter: string, match: RegExpExecArray): ParseNode[] {
    const secret = Symbol();
    const pieces = match[0].substring(1, match[0].length - 1).split(splitter);
    return [
        {secret, element: "span", class: "inline-block"},
        ...pieces.map(p => {
            const attr = Attribute.get(p);
            return {componentName: "Piece", props: {attr}};
        }),
        {secret}
    ];
}

function cost(match: RegExpExecArray): ParseNode[] {
    const secret = Symbol();
    if (match.length > 1) {
        // count/word match
        return [
            {secret, element: "span", class: "inline-block"},
            {text: match[1] + " "},
            {componentName: "Star", props: {repl: match[2]}},
            {secret}
        ];
    } else {
        // symbol only
        return [{componentName: "Star", props: {repl: match[0]}}];
    }
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
                            class: start.class
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

const componentDict: { [key: string]: new (...args: any) => SvelteComponentTyped<any> }
    = {Ability, Idolized, Piece, PieceCount, Star, Trigger: TriggerComponent};

export function makeNodesRenderable(nodes: ParseNodePrepared[]): ParseNodeRenderable[] {
    return nodes.map(n => {
        if (isComponentNode(n)) {
            return {component: componentDict[n.componentName], props: n.props};
        } else {
            return <TextNode | ElementNode>n;
        }
    })
}