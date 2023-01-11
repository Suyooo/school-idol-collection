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
    nodes: RenderNode[];
    element: string;
    class?: string;
}

export type RenderNode = TextNode | ComponentNode | ElementMarkerNode | ElementMarkerEndNode | ElementNode;
export type RenderNodePrepared = TextNode | ComponentNode | ElementNode;
export type RenderNodeRenderable =
    TextNode
    | ComponentNodeRenderable
    | ElementMarkerNode
    | ElementMarkerEndNode
    | ElementNode;

export function isTextNode(node: RenderNode): node is TextNode {
    return node.hasOwnProperty("text");
}

export function isComponentNode(node: RenderNode): node is ComponentNode {
    return node.hasOwnProperty("component");
}

export function isElementMarkerNode(node: RenderNode): node is ElementMarkerNode {
    return node.hasOwnProperty("secret") && node.hasOwnProperty("element");
}

export function isElementMarkerEndNode(node: RenderNode): node is ElementMarkerEndNode {
    return node.hasOwnProperty("secret") && !node.hasOwnProperty("element");
}

export function isElementNode(node: RenderNode): node is ElementNode {
    return node.hasOwnProperty("nodes");
}

export function parseSkillToRenderNodes(skill: string | null, lang: Language = Language.ENG, parseAsHelpText: boolean = false): RenderNodePrepared[] {
    if (skill === null) return <RenderNodePrepared[]>[{text: "—"}];
    const renderNodes: RenderNode[] = [{text: skill}];

    if (lang === Language.ENG) {
        if (!parseAsHelpText && skill.charAt(0) === "[") {
            // Only call these applys if this string starts with a trigger (so, it's not flavour or help text)
            apply(renderNodes, new RegExp("\\[(" + TriggerType.all.map(t => t.nameEng).join("|") + ")]/?([^(]*?)(?= \\(|$)"), triggerWithClose);
            apply(renderNodes, /"([^"]*?)"/, highlightRed.bind(undefined, "\"", "\""));
            apply(renderNodes, /♪(Live Points \+[^♪]*?)♪/, highlightRedNoWrap.bind(undefined, "♪", "♪"));
            apply(renderNodes, /♪(Live Points -[^♪]*?)♪/, highlightBlueNoWrap.bind(undefined, "♪", "♪"));
        }
        apply(renderNodes, /⟪([^⟪⟫]*?)⟫/, bold.bind(undefined, "⟪", "⟫"));
        apply(renderNodes, new RegExp("\\+(\\[(?:" + Attribute.all
            .filter(t => t.pieceAttributeNameEng !== undefined)
            .map(t => t.pieceAttributeNameEng).join("|") + ")])+"), bold.bind(undefined, "+", ""));
        apply(renderNodes, /\[Idolized \(Piece Bonus\)]/, idolized);
        apply(renderNodes, /\[(\d)(\d)(\d)]/, attrRequirement);
        apply(renderNodes, /\[RUSH\/LIVE]/, abilityBoth);
        apply(renderNodes, /\[(RUSH|LIVE)]/, abilityOne);
        apply(renderNodes, new RegExp("\\[(" + TriggerType.all.map(t => t.nameEng).join("|") + ")]/?"), trigger);
        apply(renderNodes, new RegExp("(?:\\[(?:" + Attribute.all
            .filter(t => t.pieceAttributeNameEng !== undefined)
            .map(t => t.pieceAttributeNameEng).join("|") + ")])+"), pieces.bind(undefined, "]["));
        apply(renderNodes, /(1|2|3|one|two|three|has|each|more|no|with|without) (Stars?)/, cost);
    } else if (lang === Language.JPN) {
        if (!parseAsHelpText && skill.charAt(0) === "【") {
            // Only call these applys if this string starts with a trigger (so, it's not flavour or help text)
            apply(renderNodes, new RegExp("【(" + TriggerType.all.map(t => t.nameJpn).join("|") + ")】/?([^（]*?)(?=（|$)"), triggerWithClose);
            apply(renderNodes, /「([^"]*?)」/, highlightRed.bind(undefined, "「", "」"));
            apply(renderNodes, /♪(Live Points \+[^♪]*?)♪/, highlightRedNoWrap.bind(undefined, "♪", "♪"));
            apply(renderNodes, /♪(Live Points -[^♪]*?)♪/, highlightBlueNoWrap.bind(undefined, "♪", "♪"));
        }
        apply(renderNodes, /《([^《》]*?)》/, bold.bind(undefined, "《", "》"));
        apply(renderNodes, new RegExp("\\+(【(?:" + Attribute.all
            .filter(t => t.pieceAttributeNameJpn !== undefined)
            .map(t => t.pieceAttributeNameJpn).join("|") + ")】)+"), bold.bind(undefined, "+", ""));
        apply(renderNodes, /【覚醒\(仮\)】/, idolized);
        apply(renderNodes, /【(\d)(\d)(\d)】/, attrRequirement);
        apply(renderNodes, /【RUSH\/LIVE】/, abilityBoth);
        apply(renderNodes, /【(RUSH|LIVE)】/, abilityOne);
        apply(renderNodes, new RegExp("【(" + TriggerType.all.map(t => t.nameJpn).join("|") + ")】/?"), trigger);
        apply(renderNodes, new RegExp("(?:【(?:" + Attribute.all
            .filter(t => t.pieceAttributeNameJpn !== undefined)
            .map(t => t.pieceAttributeNameJpn).join("|") + ")】)+"), pieces.bind(undefined, "】【"));
        apply(renderNodes, /【☆】/, cost);
    }

    compressTextNodes(renderNodes);
    formElementNodes(renderNodes);
    return <RenderNodePrepared[]>renderNodes;
}

function apply(renderNodes: RenderNode[], regex: RegExp, replaceFunc: (match: RegExpExecArray) => RenderNode[]) {
    let i = 0;
    while (i < renderNodes.length) {
        if (!isTextNode(renderNodes[i])) {
            i++;
            continue;
        }

        const node = <TextNode>renderNodes[i];

        if (node.text === "") {
            renderNodes.splice(i, 1);
            continue;
        }

        const match = regex.exec(node.text);
        if (!match) {
            i++;
            continue;
        }

        renderNodes.splice(i, 1,
            {...node, text: node.text.substring(0, match.index)},
            ...replaceFunc(match),
            {...node, text: node.text.substring(match.index + match[0].length)}
        );
        i += 2;
    }
}

function triggerWithClose(match: RegExpExecArray): RenderNode[] {
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

function trigger(match: RegExpExecArray): RenderNode[] {
    const trigger = TriggerType.get(match[1]);
    return [{componentName: "Trigger", props: {trigger}}];
}

function bold(pre: string, post: string, match: RegExpExecArray): RenderNode[] {
    const secret = Symbol();
    return [
        {secret, element: "span", class: "font-bold inline-block"},
        ...(pre ? [{text: pre}] : []),
        {text: match[1]},
        ...(post ? [{text: post}] : []),
        {secret}
    ];
}

function highlightRed(pre: string, post: string, match: RegExpExecArray): RenderNode[] {
    const secret = Symbol();
    return [
        {secret, element: "span", class: "text-highlight-red"},
        ...(pre ? [{text: pre}] : []),
        {text: match[1]},
        ...(post ? [{text: post}] : []),
        {secret}
    ];
}

function highlightRedNoWrap(pre: string, post: string, match: RegExpExecArray): RenderNode[] {
    const secret = Symbol();
    return [
        {secret, element: "span", class: "text-highlight-red inline-block"},
        ...(pre ? [{text: pre}] : []),
        {text: match[1]},
        ...(post ? [{text: post}] : []),
        {secret}
    ];
}

function highlightBlueNoWrap(pre: string, post: string, match: RegExpExecArray): RenderNode[] {
    const secret = Symbol();
    return [
        {secret, element: "span", class: "text-highlight-blue inline-block"},
        ...(pre ? [{text: pre}] : []),
        {text: match[1]},
        ...(post ? [{text: post}] : []),
        {secret}
    ];
}

function idolized(match: RegExpExecArray): RenderNode[] {
    return [{componentName: "Idolized", props: {repl: match[0]}}];
}

function attrRequirement(match: RegExpExecArray): RenderNode[] {
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

function abilityBoth(_match: RegExpExecArray): RenderNode[] {
    return [{componentName: "Ability", props: {rush: true, live: true}}];
}

function abilityOne(match: RegExpExecArray): RenderNode[] {
    const rush = match[1] === "RUSH";
    return [{componentName: "Ability", props: {rush, live: !rush}}];
}

function pieces(splitter: string, match: RegExpExecArray): RenderNode[] {
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

function cost(match: RegExpExecArray): RenderNode[] {
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

function compressTextNodes(renderNodes: RenderNode[]) {
    for (let i = 0; i < renderNodes.length; i++) {
        if (isTextNode(renderNodes[i])) {
            const node = <TextNode>renderNodes[i];
            while (i + 1 < renderNodes.length && isTextNode(renderNodes[i + 1])) {
                const other = <TextNode>renderNodes[i + 1];
                node.text += other.text;
                renderNodes.splice(i + 1, 1);
            }
        }
    }
}

function formElementNodes(renderNodes: RenderNode[]) {
    for (let i = 0; i < renderNodes.length; i++) {
        if (isElementMarkerNode(renderNodes[i])) {
            const start = <ElementMarkerNode>renderNodes[i];
            for (let len = 1; len < renderNodes.length - i; len++) {
                if (isElementMarkerEndNode(renderNodes[i + len])) {
                    const end = <ElementMarkerEndNode>renderNodes[i + len];
                    if (start.secret === end.secret) {
                        const group: ElementNode = {
                            nodes: renderNodes.slice(i + 1, i + len),
                            element: start.element,
                            class: start.class
                        };
                        formElementNodes(group.nodes);
                        renderNodes.splice(i, len + 1, group);
                        break;
                    }
                }
            }
        }
    }
}

const componentDict: { [key: string]: new (...args: any) => SvelteComponentTyped<any> }
    = {Ability, Idolized, Piece, PieceCount, Star, Trigger: TriggerComponent};

export function makeRenderable(renderNodes: RenderNodePrepared[]): RenderNodeRenderable[] {
    return renderNodes.map(n => {
        if (isComponentNode(n)) {
            return {component: componentDict[n.componentName], props: n.props};
        } else {
            return <TextNode | ElementNode>n;
        }
    })
}