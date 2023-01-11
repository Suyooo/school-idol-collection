<script lang="ts" context="module">
    import Ability from "$lib/format/Ability.svelte";
    import Idolized from "$lib/format/Idolized.svelte";
    import Piece from "$lib/format/Piece.svelte";
    import PieceCount from "$lib/format/PieceCount.svelte";
    import Star from "$lib/format/Star.svelte";
    import TriggerComponent from "$lib/format/Trigger.svelte";
    import Trigger from "$translation/trigger.js";
    import Attribute from "$types/attribute.js";
    import Language from "$types/language.js";
    import type {SvelteComponentTyped} from "svelte";

    export interface TextNode {
        text: string;
    }

    export interface ComponentNode {
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

    export function isTextNode(node: RenderNode): node is TextNode {
        return node.hasOwnProperty("text");
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

    function makeNodes(skill: string | null, lang: Language = Language.ENG, parseAsHelpText: boolean = false) {
        if (skill === null) return [{text: "—"}];
        const renderNodes: RenderNode[] = [{text: skill}];

        if (lang === Language.ENG) {
            if (!parseAsHelpText && skill.charAt(0) === "[") {
                // Only call these applys if this string starts with a trigger (so, it's not flavour or help text)
                apply(renderNodes, new RegExp("\\[(" + Trigger.all.map(t => t.nameEng).join("|") + ")]/?([^(]*?)(?= \\(|$)"), triggerWithClose);
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
            apply(renderNodes, new RegExp("\\[(" + Trigger.all.map(t => t.nameEng).join("|") + ")]/?"), trigger);
            apply(renderNodes, new RegExp("(?:\\[(?:" + Attribute.all
                .filter(t => t.pieceAttributeNameEng !== undefined)
                .map(t => t.pieceAttributeNameEng).join("|") + ")])+"), pieces.bind(undefined, "]["));
            apply(renderNodes, /(1|2|3|one|two|three|has|each|more|no|with|without) (Stars?)/, cost);
        } else if (lang === Language.JPN) {
            if (!parseAsHelpText && skill.charAt(0) === "【") {
                // Only call these applys if this string starts with a trigger (so, it's not flavour or help text)
                apply(renderNodes, new RegExp("【(" + Trigger.all.map(t => t.nameJpn).join("|") + ")】/?([^（]*?)(?=（|$)"), triggerWithClose);
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
            apply(renderNodes, new RegExp("【(" + Trigger.all.map(t => t.nameJpn).join("|") + ")】/?"), trigger);
            apply(renderNodes, new RegExp("(?:【(?:" + Attribute.all
                .filter(t => t.pieceAttributeNameJpn !== undefined)
                .map(t => t.pieceAttributeNameJpn).join("|") + ")】)+"), pieces.bind(undefined, "】【"));
            apply(renderNodes, /【☆】/, cost);
        }

        compressTextNodes(renderNodes);
        formElementNodes(renderNodes);
        return renderNodes;
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
        const trigger = Trigger.get(match[1]);
        if (trigger.id === Trigger.ID_SP) {
            return [
                {component: TriggerComponent, props: {trigger}},
                {text: match[2]},
                {component: TriggerComponent, props: {trigger, closing: true}}
            ];
        } else {
            return [
                {component: TriggerComponent, props: {trigger}},
                {text: match[2]}
            ];
        }
    }

    function trigger(match: RegExpExecArray): RenderNode[] {
        const trigger = Trigger.get(match[1]);
        return [{component: TriggerComponent, props: {trigger}}];
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
        return [{component: Idolized, props: {repl: match[0]}}];
    }

    function attrRequirement(match: RegExpExecArray): RenderNode[] {
        return [{
            component: PieceCount, props: {
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
        return [{component: Ability, props: {rush: true, live: true}}];
    }

    function abilityOne(match: RegExpExecArray): RenderNode[] {
        const rush = match[1] === "RUSH";
        return [{component: Ability, props: {rush, live: !rush}}];
    }

    function pieces(splitter: string, match: RegExpExecArray): RenderNode[] {
        const secret = Symbol();
        const pieces = match[0].substring(1, match[0].length - 1).split(splitter);
        return [
            {secret, element: "span", class: "inline-block"},
            ...pieces.map(p => {
                const attr = Attribute.get(p);
                return {component: Piece, props: {attr}};
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
                {component: Star, props: {repl: match[2]}},
                {secret}
            ];
        } else {
            // symbol only
            return [{component: Star, props: {repl: match[0]}}];
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
</script>

<script lang="ts">
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";

    export let skill: string | null;
    export let lang: Language = Language.ENG;
    export let parseAsHelpText: boolean = false;

    let renderNodes: RenderNode[];
    $: renderNodes = makeNodes(skill, lang, parseAsHelpText);
</script>

{#key renderNodes}
    <SkillNodeRenderer {renderNodes} {lang}/>
{/key}